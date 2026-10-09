#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""悬赏板数据生成器 · 纯标准库（零第三方依赖，符合轻核伦理）

从 GitHub API 拉取上游 open issue / PR，机器推导状态后渲染 bounty-data/issues.js。

状态推导（不靠人工标注）：
  竞赏中 —— open issue，无任何 PR 引用
  已认领 —— 被 open PR 引用（PR 标题或正文含 #N）
  待验收 —— 仅被已合并 PR 引用（上游采纳、issue 未关单）

积分（pts）来源优先级：
  1. issue 标签 bounty/N（维护者官方定价）
  2. overrides.json 人工覆盖（{"23": {"pts": 80, "note": "..."}}）
  3. 上一版快照沿用；首见标的无定价（null），页面显示「未定价」

用法：
  python tools/gen_bounty_data.py                    # 正常模式（需可访问 api.github.com）
  python tools/gen_bounty_data.py --fixture f.json   # 离线模式（API 形状的 JSON 文件）
环境变量：GITHUB_TOKEN（可选，提升限流配额；workflow 内自动注入）
"""
import json
import os
import re
import sys
import urllib.request
from datetime import date

REPO = "FuRongJun-1999/lingshu"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = os.path.join(ROOT, "bounty-data", "issues.js")   # 注意：`data/` 被仓规 .gitignore 忽略（章程六），故用 bounty-data/
OVERRIDES = os.path.join(ROOT, "overrides.json")
API = f"https://api.github.com/repos/{REPO}"
REF = re.compile(r"#(\d+)")


def _get(url, token):
    headers = {"Accept": "application/vnd.github+json",
               "User-Agent": "lingshu-bounty-board/0.1"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read())


def fetch_all(token):
    """拉取原始数据（API 形状）。"""
    return {
        "head": _get(f"{API}/commits?per_page=1", token)[0]["sha"][:7],
        "issues": _get(f"{API}/issues?state=open&per_page=100", token),
        "pulls_open": _get(f"{API}/pulls?state=open&per_page=100", token),
        "pulls_closed": _get(
            f"{API}/pulls?state=closed&sort=updated&direction=desc&per_page=100", token),
    }


def derive_refs(data):
    """从 open / merged PR 的标题与正文提取被引用的 issue 号。"""
    claimed, delivered = set(), set()
    for pr in data.get("pulls_open", []):
        text = (pr.get("title") or "") + "\n" + (pr.get("body") or "")
        claimed |= {int(m) for m in REF.findall(text)}
    for pr in data.get("pulls_closed", []):
        if not pr.get("merged_at"):
            continue
        text = (pr.get("title") or "") + "\n" + (pr.get("body") or "")
        delivered |= {int(m) for m in REF.findall(text)}
    return claimed, delivered


def load_previous():
    """读上一版 bounty-data/issues.js（严格 JSON）→ ({issue号: 旧标的}, 旧整档)。"""
    if not os.path.exists(DATA_JS):
        return {}, {}
    src = open(DATA_JS, encoding="utf-8").read()
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)            # 兼容遗留注释头
    src = "\n".join(l for l in src.splitlines() if not l.lstrip().startswith("//"))
    payload = src[src.index("=") + 1:].strip().rstrip(";")
    doc = json.loads(payload)
    return {it["n"]: it for it in doc.get("issues", [])}, doc


def load_overrides():
    if not os.path.exists(OVERRIDES):
        return {}
    with open(OVERRIDES, encoding="utf-8") as f:
        return json.load(f)


def render(data, prev_map, prev_doc, overrides):
    claimed, delivered = derive_refs(data)
    issues = []
    for it in data["issues"]:
        if "pull_request" in it:              # API 的 issues 端点混有 PR，剔除
            continue
        n = it["number"]
        labels = [lb.get("name", "") for lb in it.get("labels", [])]
        ov = overrides.get(str(n), {})
        old = prev_map.get(n, {})

        pts = None
        for lb in labels:                      # ① 官方标签定价 bounty/N
            m = re.fullmatch(r"bounty/(\d+)", lb)
            if m:
                pts = int(m.group(1))
        if pts is None:
            pts = ov.get("pts", old.get("pts"))  # ② 人工覆盖 ③ 沿用旧值

        m = re.match(r"\[([^\]]+)\]", it["title"])
        cat = ov.get("cat") or (m.group(1) if m else old.get("cat", "建议"))
        status = ("已认领" if n in claimed
                  else "待验收" if n in delivered
                  else ov.get("status", old.get("status", "竞赏中")))

        issues.append({
            "n": n,
            "title": it["title"],
            "cat": cat,
            "diff": ov.get("diff", old.get("diff", "中")),
            "pts": pts,
            "status": status,
            "by": (it.get("user") or {}).get("login") or old.get("by", ""),
            "note": ov.get("note", old.get("note", "")),
        })

    return {
        "updated": date.today().isoformat(),
        "repo": REPO,
        "mainAt": data.get("head", ""),
        "issues": sorted(issues, key=lambda i: (-(i["pts"] or 0), i["n"])),
        "localReds": prev_doc.get("localReds", []),      # 人工策展字段，原样沿用
        "completed": prev_doc.get("completed", []),
    }


def main():
    if "--fixture" in sys.argv:
        path = sys.argv[sys.argv.index("--fixture") + 1]
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = fetch_all(os.environ.get("GITHUB_TOKEN", ""))

    prev_map, prev_doc = load_previous()
    out = render(data, prev_map, prev_doc, load_overrides())

    os.makedirs(os.path.dirname(DATA_JS), exist_ok=True)
    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write("// 灵枢悬赏板数据 · 自动生成于 " + out["updated"]
                + " · 状态由机器推导（open PR→已认领；merged PR→待验收）\n"
                + "window.BOUNTY_DATA = " + json.dumps(out, ensure_ascii=False, indent=2) + ";\n")
    print(f"[gen] {len(out['issues'])} 标的 → bounty-data/issues.js")
    return 0


if __name__ == "__main__":
    sys.exit(main())
