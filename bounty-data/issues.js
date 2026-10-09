// 灵枢悬赏板数据快照 · 2026-10-09（严格 JSON：浏览器与 Python 双通道可读）
window.BOUNTY_DATA = {
  "updated": "2026-10-09",
  "repo": "FuRongJun-1999/lingshu",
  "mainAt": "83cce59",
  "issues": [
    {
      "n": 8,
      "title": "[world] 「真 3D」在表示层不成立（零厚度平面件）",
      "cat": "world",
      "diff": "重",
      "pts": 100,
      "status": "竞赏中",
      "by": "hawkongz",
      "note": "表示层级改造，理论裁定项，不建议外部人直接动手。"
    },
    {
      "n": 23,
      "title": "[tests] 覆盖映射：53 模块中 37 个零测试引用（16356 行）",
      "cat": "tests",
      "diff": "重",
      "pts": 100,
      "status": "竞赏中",
      "by": "sixtysevenlf",
      "note": "建议「零覆盖白名单 + 新模块未测即红」最小门禁。可从已合入的 pytest 收集守卫（PR #87）自然延伸——本标的与你的既有贡献最连贯。"
    },
    {
      "n": 5,
      "title": "[复核报告] 2 项可复现缺陷 + 4 项工程问题",
      "cat": "tests",
      "diff": "中",
      "pts": 50,
      "status": "待验收",
      "by": "Windsland52",
      "note": "pytest 收集失败已由 PR #87（@myYangyunfan）返工采纳；其余分项已各自拆解。"
    },
    {
      "n": 9,
      "title": "[world] 漂移检测在 N≥4 实体时数学上永不触发",
      "cat": "world",
      "diff": "中",
      "pts": 50,
      "status": "竞赏中",
      "by": "hawkongz",
      "note": "先交分析+性质测试证明，修复方案留上游裁定。"
    },
    {
      "n": 10,
      "title": "[intake] 两份登记不一致 + sanitized 计数缺行为级校验",
      "cat": "intake",
      "diff": "中",
      "pts": 50,
      "status": "待验收",
      "by": "hawkongz",
      "note": "指纹不一致已由 cd036d5 + verify_manifest.py（PR #30）处理；行为级校验仍开放。"
    },
    {
      "n": 15,
      "title": "[nn/hex_recon] 「99% 逐像素 / 100% 复原」判据只在矩形区域成立",
      "cat": "nn",
      "diff": "中",
      "pts": 50,
      "status": "竞赏中",
      "by": "hawkongz",
      "note": ""
    },
    {
      "n": 18,
      "title": "[nn/hex_cnn] hex_conv 6 邻 stencil 有一个邻居落在 3.0",
      "cat": "nn",
      "diff": "中",
      "pts": 50,
      "status": "竞赏中",
      "by": "123WP-a",
      "note": "卷积层等距性不成立；六角几何改动需上游裁定，建议 issue-first。"
    },
    {
      "n": 19,
      "title": "[world/stable_lease] TTL 与置信衰减耦合声明不成立",
      "cat": "world",
      "diff": "中",
      "pts": 50,
      "status": "竞赏中",
      "by": "sixtysevenlf",
      "note": "实测 2408s 到期 vs 声称 3600s（差 33%）；check() 冲突判定无输入。"
    },
    {
      "n": 20,
      "title": "[core/provenance] from_legacy：human_review 永不可推断等两项",
      "cat": "core",
      "diff": "中",
      "pts": 50,
      "status": "已认领",
      "by": "sixtysevenlf",
      "note": "PR #11（hawkongz）投标在案。"
    },
    {
      "n": 22,
      "title": "[world] 「无观测=满分」系统性口径：6 文件 16 处 rate 兜底（else 1.0）",
      "cat": "world",
      "diff": "中",
      "pts": 50,
      "status": "竞赏中",
      "by": "sixtysevenlf",
      "note": "建议性质测试钉住该行为；测试件属仓内资产，无上游漂移顾虑。"
    },
    {
      "n": 1,
      "title": "verify() 未观测拓扑假设被计为外部验证命中",
      "cat": "world",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "rinDBeans",
      "note": "b5f480c 已修（actual 取观测快照），待报告人确认。"
    },
    {
      "n": 2,
      "title": "BrainStore 读条数 limit→k：21 实体场景漏 1",
      "cat": "world",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "rinDBeans",
      "note": "421deb4 已修，待报告人确认。"
    },
    {
      "n": 4,
      "title": "[建议] 依赖零版本约束 + numpy 2.3.5 下两处测试确定性失败",
      "cat": "建议",
      "diff": "轻",
      "pts": 20,
      "status": "竞赏中",
      "by": "acrot0",
      "note": "pyproject 下限钉版属打包决策，宜先提方案再动。"
    },
    {
      "n": 6,
      "title": "[nn/hex_cnn] image_to_grid 返回 HexGrid 与实际采样坐标不同套（往返 0/40）",
      "cat": "nn",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "hawkongz",
      "note": "#116 根因修复后应已收敛，待确认。"
    },
    {
      "n": 7,
      "title": "[core] activation.py 无保护 import numpy，破坏轻核承诺",
      "cat": "core",
      "diff": "轻",
      "pts": 20,
      "status": "竞赏中",
      "by": "hawkongz",
      "note": "动手前先核对 0d16a74（PR #128）是否已顺带处理。"
    },
    {
      "n": 13,
      "title": "WorldModel.build() left_of / right_of 触发条件写反",
      "cat": "world",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "shenA2024",
      "note": "fbff71d 已修，待关单。"
    },
    {
      "n": 16,
      "title": "[core] export_all 未对缺失表降级：entities 表从未被创建",
      "cat": "core",
      "diff": "轻",
      "pts": 20,
      "status": "竞赏中",
      "by": "hawkongz",
      "note": "「灾备基准」导出恒抛 OperationalError；改动小但触及 body 导出件，issue-first。"
    },
    {
      "n": 21,
      "title": "[intake] 两份 manifest 逐文件指纹无法复算（0/61）",
      "cat": "intake",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "sixtysevenlf",
      "note": "cd036d5 同步指纹（mismatch 25→0）+ LF 归一（23977dd），待复核。"
    },
    {
      "n": 24,
      "title": "[tests] test_hex_text 两项「已知红」为不可复算阈值断言",
      "cat": "tests",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "sixtysevenlf",
      "note": "根因已修（#116：image_to_grid √3 越界），判据随迁，待关单。"
    },
    {
      "n": 25,
      "title": "[world] SpacetimeConsistency 未纳入 seed 轴",
      "cat": "world",
      "diff": "轻",
      "pts": 20,
      "status": "待验收",
      "by": "sixtysevenlf",
      "note": "e18562f 已修（seed 透传），待报告人确认关单。"
    }
  ],
  "localReds": [
    {
      "t": "tests/test_hex_train.py::test_selfsup_recon_loss_drops",
      "note": "训练数值断言失败（本机 Win11 / numpy 2.5.1）"
    },
    {
      "t": "tests/test_manifest_integrity.py::test_4_tool_exits_zero_on_real_repo",
      "note": "疑似 CRLF/平台相关——23977dd 修过一轮 CI 必红"
    },
    {
      "t": "tests/test_time_core_lint.py::test_judgement_regressions_not_reported [core.py:1698]",
      "note": "lint 基线漂移"
    },
    {
      "t": "tests/test_time_core_lint.py::test_judgement_regressions_not_reported [hex_train.py:289]",
      "note": "lint 基线漂移"
    }
  ],
  "completed": [
    {
      "pr": 87,
      "by": "@myYangyunfan（本板主人）",
      "what": "pytest 一键收集守卫（返工采纳 9db9b08）"
    },
    {
      "pr": 116,
      "by": "外部贡献者",
      "what": "image_to_grid √3 越界——两项已知红的根因修复"
    },
    {
      "pr": 17,
      "by": "@hawkongz",
      "what": "selfsup_finetune 步内共用掩码（common random numbers）"
    },
    {
      "pr": 128,
      "by": "@STARDUSTLC666",
      "what": "激活引擎每轮重读认知图"
    },
    {
      "pr": 97,
      "by": "@ybyz2",
      "what": "hex 前向逐核卷积折叠为单次 GEMM（性能）"
    },
    {
      "pr": 47,
      "by": "@rinDBeans",
      "what": "跨模块业务场景可复跑测试范式"
    },
    {
      "pr": 30,
      "by": "@sixtysevenlf",
      "what": "登记指纹核验器 verify_manifest.py"
    },
    {
      "pr": 31,
      "by": "外部贡献者",
      "what": "time_core_lint E5 衰减核机械化审计器"
    }
  ]
};
