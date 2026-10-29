export type Language = 'cn' | 'en';

const cnContent = {
    "nav": {
      "home": "首页",
      "projects": "实践",
      "about": "关于",
      "blog": "博客",
      "myOpenClaw": "我的 OpenClaw",
      "backToTop": "回到顶部",
      "menu": {
        "open": "打开菜单",
        "close": "关闭菜单"
      },
      "primaryLabel": "主导航",
      "mobileLabel": "移动端主导航",
      "switchToCn": "切换到中文",
      "switchToEn": "切换到英文"
    },
    "home": {
      "hero": {
        "line1": "用 Agent，",
        "line2": "将想法变成",
        "line3": "现实。",
        "word": {
          "agent": "Agent",
          "idea": "想法",
          "reality": "现实"
        },
        "viewProjects": "查看实践",
        "readBlog": "阅读博客",
      },
      "projects": {
        "title": "我的实践",
        "page": {
          "title": "实践结果",
          "subtitle": "探索我使用 Agent 的实践。"
        },
        "viewAll": "查看全部",
        "selectedWorks": "精选作品",
      },
      "method": {
        "eyebrow": "我的 Agent 使用方式",
        "title": "让 Agent 参与，而不是代替判断"
      },
      "cta": {
        "title": "准备好构建\n大胆的作品了吗？",
        "subtitle": "让我们在下一代 Agent 打造的应用上展开合作。",
        "button": "联系我"
      }
    },
    "practice": {
      "list": {
        "search": "输入关键字",
        "sort": {
          "label": "排序",
          "latest": "最新发布",
          "oldest": "最早发布",
          "title": "标题排序",
          "featured": "精选优先"
        },
        "filter": {
          "all": "全部"
        },
        "clear": "清除筛选",
        "empty": "暂无项目。"
      },
      "practice": {
        "detail": {
          "published": "发布于",
          "readTime": "阅读时间",
          "navigation": "页面导航",
          "related": "你可能感兴趣",
          "noRelated": "暂无相关作品",
        }
      },
    },
    "blogs": {
      "blog": {
        "viewJournal": "查看详情",
        "latestInsights": "最新博客",
        "category": {
          "tutorial": "新手教程",
          "explainer": "技术科普",
          "architecture": "架构实践",
          "frontend": "前端视野",
          "ecosystem": "生态治理",
          "trends": "行业趋势"
        },
        "noArticles": "该分类下暂无文章。",
        "page": {
          "title": "博客"
        },
        "categories": {
          "tech": "技术驱动",
          "community": "社区动态",
          "latest": "最新动态"
        },
        "readMore": "阅读全文",
        "readTime": {
          "format": "{n} 分钟 阅读",
          "suffix": "阅读"
        },
        "detail": {
          "home": "首页",
          "blog": "博客",
          "archive": "往期博客",
          "techArticle": "实践详情",
          "featuredAlt": "文章封面图"
        }
      }
    },
    "about": {
      "name": "张佳琪",
      "title": "数据科学与大数据技术专业",
      "location": "江西, 中国",
      "tagline": "用 Agent 将想法落实应用。",
      "current": "关注 AI / Agent 前沿应用",
      "me": {
        "title": "关于我",
        "paragraph": "一个喜欢上手实操的大学生，偏爱实践型任务，有如快速原型设计、前端设计、UI设计等这类交互型设计，在交互中体验发现设计不足与细节优化的快乐无与伦比。另外，个人认为自己是完美主义追求者，也不明是好是坏[尬笑]，但恰匹配新的 Agent 编码模式下需要将快速原型验收，测试，细节优化，将原型升级到产品级的需求，匹配程序员在编码领域的新身份转变（编码者 → 审核优化者）。本人熟练使用 Agent 类工具，如：Claude Code、Codex、DeepSeek Harness等，也曾养过“虾”（OpenClaw）、“马”（Hermes），了解 Agent 框架的一些基本的工作原理，细致的专业知识正在学习中。我善于设计提示词，能将实际状况转述成一段LLM一目了然的提示词供 Agent 正向理解需求，以减少试错成本；善于统筹规划 Agent “施工图纸”，结合软件工程的开发思维和 Agent 自动化工作流，我只需在任务两端参与 —— 设计与审查，便可得到一个基本可用的原型（提升代码品质则需更为细致的优化）。本人明确 Agent 工具的作用与重要性，如：MCP，文件工具，RAG知识库等；也同样知道向 Agent 披露工具的各种属性的重要性（如：使用时机、方法、schema等）；拥有一套自己的完整的 Agent 协作代码开发系统（全局编码规则、自动化审查工作流等）。我对于 AI/Agent 前沿技术感到新鲜，尤其是对于像 OpenClaw 这种私人定制化的、类 AGI 的 Agent （类）的发展和未来全能个人助手的实现充满期待！AI 从只有大脑到长出四肢干实事正越来越近！"
      },
      "workflow": {
        "title": "我的 Agent 使用方式",
        "subtitle": "不让 Agent 盲目施工，而是共同协商编写开发文档，包括需求分析、设计功能模块、任务拆解、工具配置和验收标准等，走一套 “适合 Agent 的软件工程开发流程”，最终形成一版系统架构清晰、正文内容完整、细节完善的可供 Agent 开发参考又可供人工审查的双向文档。",
        "step1": {
          "title": "明确任务需求",
          "desc": "先确认目标、边界和验收标准，避免在错误方向上加速。"
        },
        "step2": {
          "title": "设计施工图",
          "desc": "把需求拆成任务、依赖和预期结果，为 Agent 提供清晰上下文。"
        },
        "step3": {
          "title": "Agent 协同执行",
          "desc": "按任务调用合适的模型、工具与子 Agent，过程中通过工作流约束校准方向。"
        },
        "step4": {
          "title": "验证并优化",
          "desc": "自动化测试与人工测试双管齐下，检查代码、功能，保留证据，再继续迭代。"
        }
      },
      "timeline": {
        "title": "我的 AI 编码轨迹",
        "e1": {
          "year": "阶段 01",
          "title": "AI 代码补全与局部辅助",
          "desc": "轨迹始于代码补全与局部生成。此时 AI 是辅助编码：补全代码，行间建议等，主体仍是编码者逐行书写与逐行审校，每一处实现是否成立，仍由人判断。",
          "takeaway": "AI 成为编码加速器"
        },
        "e2": {
          "year": "阶段 02",
          "title": "输出停留在对话框，需人工集成与调试",
          "desc": "AI 已能一次产出完整文件，但文件仍需人工落位、拼入既有结构，再启动运行、依报错逐项修正。编码效率提升，但上下文不连贯，调试与验证成本较高。",
          "takeaway": "重心由书写代码转向描述需求、集成与调试"
        },
        "e3": {
          "year": "阶段 03",
          "title": "Agent 编码：从任务到自动化测试",
          "desc": "任务整体交付 Agent：读取上下文、改写文件、启动运行、补写测试，直至通过。人在两端把守——起点定义方向与边界，终点完成审查与验收。",
          "takeaway": "角色由编码者转为方向定义者与审核者"
        },
        "e4": {
          "year": "阶段 04",
          "title": "沉淀形成工作流与开发体系",
          "desc": "不断丰富的编码规则、工具（MCP、CLI、RAG 知识库）与 Agent 记忆、协作模式，积淀成可复用、可并行的个人开发体系与工作流。",
          "takeaway": "从完成单个任务，走向可复用、可并行的个人开发体系"
        }
      },
      "exploration": {
        "title": "我的兴趣与探索",
        "item1": {
          "title": "Agent 开发团队",
          "desc": "想复现的不是单个 Agent，而是一支开发团队的运转方式：需求、设计、实现、测试与审校各有承接者，任务在阶段之间有明确交接，让多个智能体像团队一样协作推进。"
        },
        "item2": {
          "title": "Agent 创作者",
          "desc": "把创作的边界推进到画面之内：一幅有构思的图像、一段可漫游的三维场景、一条完整的创意视频。希望 Agent 承担从构思到成品的整条链路，而不只是其中一环。"
        },
        "item3": {
          "title": "AGI 探索",
          "desc": "指向的不是更强的模型，而是科幻里贾维斯式的全能助手：能理解意图，能执行任务，也能在需要时创造。理解、执行与创造集于一身，才接近“助手”一词的本意。"
        },
        "item4": {
          "title": "具身Agent",
          "desc": "让智能走出屏幕，获得感知与行动的实体：在现实环境中观察，在被需要时出手，在长期相处中学习与成长。它不止是工具，也是一种陪伴。"
        }
      },
      "practice": {
        "title": "我的实践经历",
        "viewAll": "查看全部实践"
      },
      "capabilities": {
        "title": "我的能力与方向",
        "subtitle": "从重点探索到实际产出，再到组织 Agent 完成任务的方法。",
        "direction": {
          "title": "探索发展",
          "item1": "Agent 自动化工作流",
          "item2": "快速原型产出",
          "item3": "探索 AGI"
        },
        "deliver": {
          "title": "运用掌握",
          "item1": "提示词设计",
          "item2": "快速原型产出",
          "item3": "搭建Agent工作流"
        },
        "management": {
          "title": "管理与方法",
          "item1": "目标定义 / 需求澄清 / 验收标准",
          "item2": "任务拆解 / Agent 分工 / 文档约束",
          "item3": "过程审查 / 质量验证 / 持续迭代"
        }
      }
    },
    "agents": {
      "page": {
        "title": "我的 Agents",
        "subtitle": "我个人的一些 Agent 使用经验。",
        "codex": {
          "eyebrow": "全局配置",
          "title": "我的全局编码规范",
          "files": "AGENTS.md（CLAUDE.md）",
          "desc": "编码规则参考于 Andrej Karpathy 关于 LLM 编码陷阱的总结，主要解决错误假设、隐藏困惑、缺少权衡、过度复杂等 LLM 编码问题。",
          "reference": "参考：Andrej Karpathy 的 LLM 编码陷阱总结",
          "principle": {
            "clarity": {
              "title": "先问清楚",
              "desc": "面对任务需求，先确认目标、范围和取舍，避免让 Agent 靠猜测推进。"
            },
            "verification": {
              "title": "每步可验证",
              "desc": "把修改转成测试、类型检查、构建或可观察结果，确认它真的完成了目标。"
            },
            "scope": {
              "title": "只改必要的",
              "desc": "尊重现有代码和用户改动，不把一次需求变成无关重构。"
            }
          }
        },
        "method": {
          "title": "让 Agent 参与，而不是代替判断"
        },
        "gitnexus": {
          "eyebrow": "我使用的插件工具",
          "title": "GitNexus：让 Agent 看懂代码库",
          "desc": "GitNexus 把代码库索引成知识图谱，再通过 CLI 和 MCP 把调用关系、依赖链、执行流程与变更影响交给 Agent。",
          "badge": "CLI + MCP + 知识图谱",
          "about": "它解决的不是“帮我写一段代码”，而是“这段代码和整个项目有什么关系”。在陌生代码库、调试问题和准备修改之前，我会先用它补齐上下文。",
          "repository": "查看 GitNexus 仓库",
          "cliMcp": "本地索引 · Agent 上下文",
          "stat": {
            "cli": "从命令行分析、刷新和检查索引",
            "mcp": "把代码关系提供给 Agent 查询",
            "graph": "依赖、调用链和执行流程视图",
            "map": "可视化关系图谱"
          },
          "workflow": {
            "title": "GitNexus 在代码库中的使用",
            "desc": "我通常要求 Agent 把 GitNexus 放在“理解和修改之间”：先建立索引，再查询上下文；真正准备改动时做影响分析，完成后检查变更范围。",
            "index": {
              "title": "建立索引",
              "desc": "先运行 analyze，让项目结构、符号关系和执行流程进入可查询状态。"
            },
            "understand": {
              "title": "理解代码",
              "desc": "用 exploring、query 和 context 找到相关流程、调用者与被调用者。"
            },
            "impact": {
              "title": "评估影响",
              "desc": "修改函数或模块前先看 upstream 依赖，判断直接调用者和风险范围。"
            },
            "verify": {
              "title": "检查变更",
              "desc": "完成修改后运行 detect_changes，确认影响范围没有偏离预期。"
            }
          }
        },
        "superpowers": {
          "eyebrow": "开发方法论",
          "desc": "Superpowers 是一套面向编码 Agent 的完整软件开发方法论，由一组可以组合的技能和初始指令组成。",
          "how": "它不会看到需求就直接写代码，而是先澄清目标、确认设计，再形成实施计划，并让 Agent 按计划逐项完成、测试和审查。",
          "repository": "查看 Superpowers 仓库",
          "principles": "设计原则",
          "principle": {
            "tdd": "测试先行",
            "systematic": "系统化而非临时应对",
            "process": "流程优于猜测",
            "complexity": "减少复杂度",
            "evidence": "证据优于声明"
          },
          "mechanisms": "运行机制",
          "mechanism": {
            "automatic": {
              "title": "自动衔接",
              "desc": "Agent 会根据当前任务自动选择相关技能，不需要额外切换流程。"
            },
            "disciplined": {
              "title": "流程约束",
              "desc": "关键工作流被视为必须执行的过程，而不是可忽略的建议。"
            },
            "delegated": {
              "title": "子代理执行",
              "desc": "复杂计划可以按任务交给新的执行者，再对每一步成果进行检查。"
            },
            "reviewed": {
              "title": "持续审查",
              "desc": "实现、测试和评审交替进行，问题在进入下一阶段前被处理。"
            }
          },
          "workflow": {
            "title": "基础工作流",
            "count": "步",
            "desc": "从想法澄清到开发分支收尾，每一步都有明确产物和进入下一阶段的检查点。",
            "brainstorming": {
              "title": "需求澄清",
              "desc": "通过问题打磨想法、探索替代方案，分段确认设计并保存设计文档。"
            },
            "worktrees": {
              "title": "隔离工作区",
              "desc": "设计批准后创建独立分支和工作区，完成项目初始化并确认测试基线。"
            },
            "plans": {
              "title": "编写计划",
              "desc": "将工作拆成小块任务，为每项任务写明文件路径、代码和验证步骤。"
            },
            "execution": {
              "title": "执行计划",
              "desc": "每个任务可由新的子代理实现并审查，也可在当前会话中按计划依次完成。"
            },
            "tdd": {
              "title": "测试驱动",
              "desc": "遵循 RED-GREEN-REFACTOR，先看到测试失败，再写最小实现，最后确认通过。"
            },
            "review": {
              "title": "代码审查",
              "desc": "在任务之间对照计划检查，按严重程度报告，关键问题阻止继续推进。"
            },
            "finish": {
              "title": "分支收尾",
              "desc": "验证测试，选择合并、发起 PR、保留或丢弃，并清理工作区。"
            }
          },
          "outcomes": "最终产物",
          "outcome": {
            "design": {
              "title": "确认后的设计",
              "desc": "把模糊想法收敛成经过确认、可以进入实施的设计。"
            },
            "plan": {
              "title": "可执行计划",
              "desc": "把设计拆成带文件、代码和验证步骤的小任务。"
            },
            "delivery": {
              "title": "验证后交付",
              "desc": "通过测试与评审后再合并、发起 PR 或清理分支。"
            }
          }
        },
        "mcp": {
          "eyebrow": "能力扩展",
          "title": "精选 MCP",
          "desc": "MCP 更像 Agent 可以调用的能力接口。这里记录我实际使用或关注的工具，以及它们在开发流程中补上的一块能力。",
          "entry": "能力入口",
          "more": "更多 MCP",
          "official": "官方仓库",
          "when": "我会在什么时候用",
          "item": {
            "playwright": {
              "desc": "Playwright MCP 为 Agent 提供浏览器自动化能力，可以导航页面、读取可访问性结构、执行交互并检查真实页面结果。",
              "use": "做网页功能验收、移动端布局检查、交互回归和截图验证时使用。它让“页面应该能用”变成可以实际操作和观察的结果。"
            },
            "gitnexus": {
              "desc": "GitNexus MCP 把本地代码知识图谱中的查询、上下文、影响分析和变更检测能力提供给 Agent。",
              "use": "需要理解项目结构、追踪调用链、判断修改影响或检查变更范围时使用。它负责补上下文，不替代我对最终改动的判断。"
            }
          }
        },
        "skills": {
          "eyebrow": "技能目录",
          "title": "我的 Agents 技能",
      "desc": "把重复的代码理解、调试和变更检查整理成可复用的技能文件。每项技能都保留完整 SKILL.md，这里只展示摘要入口。",
          "category": {
            "featured": "精选技能"
          },
          "structure": "核心结构",
          "market": "技能市场",
          "community": "社区精选技能",
          "featured": {
            "frontendDesign": {
              "desc": "把视觉方向、排版、颜色和交互作为一个整体来设计，帮助页面形成明确的风格。",
              "structure": "定主题 → 建立设计 token → 设计信息结构 → 实现交互 → 截图检查"
            },
            "skillCreator": {
              "desc": "把一次性的提示词整理成可复用技能，并通过测试提示词和评估持续改进。",
              "structure": "定义目标 → 写初稿 → 设计测试 → 评估结果 → 迭代技能"
            },
            "imagegen": {
              "desc": "当任务需要图片素材时，用于生成、编辑或组合位图，而不是用代码勉强模拟真实视觉。",
              "structure": "明确用途 → 生成或编辑 → 检查素材 → 放入产品场景"
            },
            "artifacts": {
              "desc": "处理文档、PDF 和表格等交付物时，按对应格式的工具链生成、渲染和验证。",
              "structure": "读取需求 → 选择格式工具 → 生成文件 → 渲染检查 → 交付"
            }
          }
        },
        "openclaw": {
          "eyebrow": "Agent 特别篇：养一只 OpenClaw",
          "title": "我的 OpenClaw",
          "desc": "从项目搭建到多 Agent 工作流，记录一个个人 AI 系统持续演进的过程。",
          "cta": "进入 OpenClaw 专题",
          "mapLabel": "OpenClaw / 内容导航"
        },
        "scenarios": {
          "eyebrow": "场景速览",
          "title": "使用场景",
          "empty": "暂无项目",
          "coding": {
            "label": "编程",
            "desc": "代码理解、调试与工程协作"
          },
          "creating": {
            "label": "创作",
            "desc": "从想法整理到内容完成"
          },
          "organizing": {
            "label": "信息整理",
            "desc": "搜索、总结与知识沉淀"
          },
          "automation": {
            "label": "自动化",
            "desc": "让重复工作变成可复用流程"
          }
        }
      }
    },
    "openclaw": {
      "sections": [
        {
          "id": "overview",
          "icon": "map",
          "label": "OpenClaw 蓝图"
        },
        {
          "id": "structure",
          "icon": "account_tree",
          "label": "结构介绍"
        },
        {
          "id": "start",
          "icon": "rocket_launch",
          "label": "快速开始"
        },
        {
          "id": "config",
          "icon": "code_blocks",
          "label": "我的配置"
        },
        {
          "id": "experience",
          "icon": "psychology",
          "label": "使用经验"
        },
        {
          "id": "scenarios",
          "icon": "route",
          "label": "使用场景"
        },
        {
          "id": "maintenance",
          "icon": "settings_suggest",
          "label": "管理维护"
        }
      ],
      "home": "首页",
      "hero": {
        "title": "OpenClaw",
        "subtitle": "适用于任何操作系统的 AI 智能体 Gateway 网关。",
        "explore": "查看全景图",
        "docs": "快速开始"
      },
      "notice": {
        "title": "版本说明",
        "desc": "本页记录的使用方法与配置均基于旧版本 OpenClaw，最后更新时间为 2026.4.2；新版本可能存在行为或字段变化，",
        "linkPrefix": "具体请看",
        "linkLabel": "OpenClaw官网",
        "linkSuffix": "。"
      },
      "overview": {
        "title": "OpenClaw 蓝图",
        "subtitle": "OpenClaw 它是什么、承担什么角色，理想中是什么样的。",
        "intro": "OpenClaw 是运行在你个人设备上的开源个人 AI 助手与 Gateway 控制系统。它把消息渠道、Agent、工作区、工具和设备节点连接起来，一个 Gateway 解决编码、生活助理与持续自动化任务。",
        "currentTitle": "核心特点",
        "currentDesc": "一个本机 Gateway 统一连接渠道、Agent、工作区和工具，让个人助手在不同入口保持连续上下文。心跳机制主动出击，本地记忆库及自动整理维护越用越懂你；语义搜索，排重滤噪，听得懂你！",
        "status": [
          [
            "系统定位",
            "个人 AI 助手与编码搭档",
            "layers"
          ],
          [
            "核心组合",
            "Gateway + Agents + Channels",
            "hub"
          ],
          [
            "运行边界",
            "Local Gateway + loopback",
            "shield_lock"
          ]
        ],
        "mapOpen": "打开 OpenClaw 全景图",
        "mapAlt": "OpenClaw 全景架构图",
        "mapTitle": "系统全景",
        "source": "以上仅出于个人见解，信息截至 2026.4.2，最新版本具体见 OpenClaw 官方文档。"
      },
      "ui": {
        "guides": "核心指南",
        "close": "关闭"
      },
      "structure": {
        "title": "结构介绍",
        "subtitle": "从 Gateway 到 Agent、Workspace、Channel 与 Node，理解一整个系统工作链路。",
        "cards": [
          [
            "gateway",
            "Gateway",
            "本地控制平面，负责会话、工具、事件和渠道连接，并通过 WebSocket 服务客户端。"
          ],
          [
            "agent",
            "Agent",
            "职责专业化，按身份调用专属工具和划分专业工作区，让任务落到细处。"
          ],
          [
            "workspace",
            "Workspace",
            "为 Agent 提供文件、上下文和工作边界，是配置与内容隔离的落点。"
          ],
          [
            "channel",
            "Channel",
            "把助手接入 WhatsApp、Telegram、Slack、Discord 等已有聊天入口，实现远程操控。"
          ],
          [
            "models",
            "Models",
            "云端模型与本地模型可以通过 provider 组合，并使用回退链提高可用性。还可配置任务专属模型，控制质量与成本。"
          ],
          [
            "memory",
            "Memory",
            "会话状态、长期文件和记忆插件共同提供跨会话上下文与知识沉淀。划分短、中、长期记忆，合理配置记忆注入频次。"
          ],
          [
            "tools",
            "Skills & Tools",
            "Skills、Plugins 与工具扩展搜索、浏览器、文件和业务能力，让 Agent 从回答走向执行。"
          ],
          [
            "security",
            "Security",
            "把外部消息视为不可信输入，用配对、允许名单、令牌和沙箱控制设备与工具权限，防止 Agent 操作失误，以及信息泄露。"
          ]
        ],
        "source": "结构描述基于官方 Gateway、Channels、Nodes、Security等文档整理。"
      },
      "start": {
        "title": "快速开始",
        "subtitle": "从安装到 onboarding、模型配置、渠道接入和健康检查，保留一条可以逐步验证的通用路径。",
        "requirements": [
          [
            "运行时",
            "安装脚本会准备支持的 Node.js 运行时；手动安装时使用当前官方兼容版本。"
          ],
          [
            "平台",
            "macOS、Linux 和 Windows 都提供安装路径；Windows 可按实际环境选择 PowerShell 或 WSL2。"
          ],
          [
            "入口",
            "先在本机或受控网络中启动 Gateway，再接通一个消息渠道并控制访问范围。"
          ]
        ],
        "pathTitle": "最短可用路径",
        "pathDesc": "不要把安装、模型配置和渠道配置混成一步；每一段都要有可见结果。",
        "steps": [
          [
            "install",
            "安装 OpenClaw",
            "按平台运行安装脚本，或使用包管理器安装当前版本。"
          ],
          [
            "models",
            "完成 onboarding",
            "配置模型访问、创建默认 Workspace，并让 Gateway 完成基础初始化。"
          ],
          [
            "channel",
            "接通一个 Channel",
            "先只接一个私聊入口，确认消息能够进入 Gateway 并到达 Agent。"
          ],
          [
            "verify",
            "检查状态与健康",
            "使用 config validate、gateway status、health 和 dashboard 验证运行结果。"
          ]
        ],
        "note": "先完成单 Agent 和单渠道闭环，再按需扩展模型回退、多 Agent 路由与长期记忆。",
        "source": "安装与验证命令以 OpenClaw 官方 Getting started、Channels 与 Updating 文档为准。"
      },
      "config": {
       "title": "我的配置",
       "subtitle": "以实际 openclaw.json 为依据，展示脱敏后的 Gateway、飞书、模型、多 Agent 与路由结构。",
        "repoDesc": "技能包、四个 Workspace 与身份文件均收录在公开仓库中；设计展示保留真实结构，密钥、账号和群组 ID 使用占位符。",
        "repoLabel": "详见 openclaw-config 仓库",
        "teamTitle": "多 Agent 团队设计",
        "teamDesc": "不是复制四个通用助手，而是把入口、决策、专业执行和独立验证拆成清晰角色。每个 Agent 保留自己的上下文、模型和技能边界，团队再通过统一路由与交付标准协作。",
        "teamDesign": [
          [
            "统一入口，明确决策权",
            "main 负责接收目标、判断任务类型、分派与收敛结果，避免多个 Agent 同时抢答或重复决策。"
          ],
          [
            "角色隔离，保持上下文干净",
            "每个专业 Agent 使用独立 Workspace、会话、记忆与技能目录，长期积累只围绕自己的职责展开。"
          ],
          [
            "执行与验证分离",
            "coder 负责实现，tester 使用不同上下文独立验证；需要提炼和交付时，再交给 editor 组织表达。"
          ]
        ],
        "benefitsTitle": "团队设计的收益",
        "benefitsDesc": "这三项收益来自职责拆分、独立上下文和可验证的分工，而不是单纯增加 Agent 数量。",
        "benefits": [
          [
            "少污染",
            "长期角色文件让每个 Agent 只积累与职责相关的知识，减少上下文串线。"
          ],
          [
            "可并行",
            "互不依赖的编码、测试和文档任务可以同时推进，再由主 Agent 汇总。"
          ],
          [
            "易验收",
            "实现者与验证者分开，质量结论拥有更独立的证据链。"
          ]
        ],
        "skillsTitle": "Agent 技能编队",
        "skillsDesc": "技能不平均分配，而是按角色选择代表能力。主 Agent 关注设计与协调，专业 Agent 关注各自领域的执行、验证和交付。",
        "skillsCount": "仓库当前收录 22 个技能包；下面挑选每个 Agent 的 2 个代表技能。",
        "skills": [
          ["main", "贾维斯", "brainstorming", "设计前置", "在写代码前先澄清目标、约束与验收标准，把想法收敛成可确认的设计。", "适合新功能、组件和行为从 0 到 1 的阶段。"],
          ["main", "贾维斯", "project-manager", "任务治理", "把目标拆成阶段、里程碑、风险与交付物，为跨 Agent 协作建立统一推进坐标。", "适合多步骤任务、跨角色协作与进度收敛。"],
          ["coder", "无敌码农", "architecture-patterns", "架构实现", "用 Clean Architecture、Hexagonal Architecture 和 DDD 组织复杂后端系统。", "适合新系统设计、单体拆分和可维护性重构。"],
          ["coder", "无敌码农", "coding-agent", "代理编码", "把实现任务交给 Codex、Claude Code 等编码代理，在隔离工作目录中完成探索、修改和迭代。", "适合需要多轮文件操作和验证的编码任务。"],
          ["tester", "无敌测试", "test-master", "质量策略", "覆盖单元、集成、E2E、性能和安全测试，从策略、执行到报告形成质量闭环。", "适合功能验收、回归测试和测试体系建设。"],
          ["tester", "无敌测试", "webapp-testing", "浏览器验证", "用 Playwright 操作本地 Web 应用，检查行为、控制台日志、截图和关键交互。", "适合前端功能和可视化回归。"],
          ["editor", "超级编辑", "docs-writer", "文档标准", "按读者、语气、结构和一致性规则改写技术文档，让内容更容易扫描和维护。", "适合 README、指南、规范与知识库。"],
          ["editor", "超级编辑", "docx", "正式交付", "创建和编辑 Word 文档，处理样式、结构、评论与修订，并验证最终交付格式。", "适合报告、方案和需要正式排版的文档。"]
        ],
        "workspaceTitle": "Agent Team 工作空间",
        "workspaceDesc": "每个 Agent 有自己的 Workspace，但遵守同一套文件协议。主 Agent 保留团队协调视角，专业 Agent 在自己的目录中积累角色、记忆、工具笔记和局部技能。",
        "workspaceTreeTitle": "仓库工作空间结构",
        "workspaceFilesTitle": "角色文件如何协作",
        "workspaceFilesDesc": "同一套文件协议分别回答身份、行为、启动、偏好、记忆与本地环境问题，让每个 Agent 的长期上下文都可检查、可迁移。",
        "workspaceFiles": [
          ["IDENTITY.md", "我是谁", "定义名称、角色、气质、核心能力、工作场景和协作边界。"],
          ["SOUL.md", "我如何行动", "定义价值观、语气、情绪表达、隐私原则和对外行动准则。"],
          ["AGENTS.md", "每次会话怎么开始", "定义必读文件、启动顺序、安全红线、记忆流程和心跳规则。"],
          ["USER.md", "我在帮助谁", "记录称呼、语言、时区、偏好和需要长期遵守的交互规则。"],
          ["MEMORY.md", "什么值得长期保留", "把短期日志和错误经验提炼为跨会话保留的稳定结论。"],
          ["TOOLS.md", "环境有什么不同", "保存只属于当前部署的工具规则、路径和本地连接信息。"]
        ],
        "identityTitle": "身份由多个 Markdown 共同决定",
        "identityDesc": "IDENTITY.md 回答“我是谁、负责什么”，SOUL.md 回答“我以什么方式行动”，AGENTS.md 回答“每次会话如何开始和遵守什么规则”，USER.md 与 MEMORY.md 再把身份放进真实的用户关系和历史中。四者共同塑造稳定行为，而不是只靠一段人设。",
        "identityTemplateTitle": "IDENTITY.md 的组织方式",
        "identityTemplateDesc": "模板只稳定骨架，不固化人格。每个 Agent 用相同字段描述身份，再通过 SOUL.md 与 AGENTS.md 约束行为。",
        "identitySkeletonLabel": "通用骨架",
        "identityMainLabel": "main / IDENTITY.md（真实摘录）",
        "identityProfilesTitle": "四个 Agent 的身份锚点",
        "identityTableLabels": ["Agent", "IDENTITY.md", "SOUL.md / AGENTS.md 的约束"],
        "identityProfiles": [
          ["main", "贾维斯 / Jarvis", "团队主管、效率伙伴与编码导师。", "专业但有人情味；负责拆解、协调、记忆维护和最终收敛。"],
          ["coder", "无敌码农 / CodeMaster", "编码专家与实现引擎。", "务实、直接、代码优先；跨 Agent 协作时服从 main 的协调。"],
          ["tester", "无敌测试 / TestNinja", "质量专家与自动化测试负责人。", "细致、怀疑、证据优先；不以实现者的结论代替独立验证。"],
          ["editor", "超级编辑 / DocMaster", "文档与内容专家。", "结构清晰、表达准确、读者优先；负责把结果变成可交付内容。"]
        ],
        "profiles": [
          [
            "运行环境",
            "Linux 主机 · local Gateway"
          ],
          [
            "模型策略",
            "Bailian / Antigravity / GPTSAPI / Ollama"
          ],
          [
            "渠道策略",
            "飞书 WebSocket · 4 账号"
          ],
          [
            "Agent 策略",
            "1 主管 + 3 专业 Agent"
          ]
        ],
        "agentTitle": "Agent 团队职责",
        "agents": [
          [
            "main",
            "贾维斯",
            "主管 Agent",
            "负责与用户交接、任务分派和跨 Agent 协调，默认承接主入口。",
            "6h heartbeat · 18 skills"
          ],
          [
            "coder",
            "无敌码农",
            "编码 Agent",
            "负责代码生成、重构、调试和技术实现。",
            "glm5 · m2.5 / qwen3.5 / k2.5"
          ],
          [
            "tester",
            "无敌测试",
            "测试 Agent",
            "负责测试设计、自动化、缺陷复现与质量验证。",
            "glm5 · m2.5 / qwen3.5 / k2.5"
          ],
          [
            "editor",
            "超级编辑",
            "文档 Agent",
            "负责文档创作、内容润色、信息组织和知识归档。",
            "k2.5 · qwen3.5 / m2.5 / glm5"
          ]
        ],
        "principlesTitle": "配置原则",
        "principlesDesc": "这些原则控制暴露面、上下文边界、模型可用性与凭据流向。",
        "principles": [
          [
            "本机控制面",
            "Gateway 只绑定 loopback，以 token 鉴权，优先保证控制面不直接暴露到公网。"
          ],
          [
            "Agent 隔离",
            "每个 Agent 使用独立 Workspace、会话和角色文件，避免长期上下文互相污染。"
          ],
          [
            "模型可回退",
            "每个专业 Agent 配置主模型与 fallback 链，降低单模型或单服务不可用时的中断。"
          ],
          [
            "密钥与配置分离",
            "真实密钥保留在环境变量或 Secret 引用中，公开页面只展示脱敏结构。"
          ]
        ],
        "codeTitle": "脱敏配置摘要",
        "codeDesc": "以下片段保留实际结构，但把账号、密钥、群 ID 和具体身份标识替换为不可逆描述。",
        "source": "配置字段以 OpenClaw Configuration 与实际 openclaw.json 为准。"
      },
      "experience": {
        "title": "使用经验",
        "subtitle": "我的 OpenClaw 的一些使用经验和实践记录，包含多 Agent 协作、渠道路由、技能治理、记忆沉淀、模型成本控制与资源选型。",
        "resultLabel": "得到的结果",
        "detailsLabel": "查看过程、问题与边界",
        "fields": [
          "执行过程",
          "问题与风险",
          "适用边界"
        ],
        "costTitle": "质量与成本控制",
        "costDesc": "大型任务先拆成可并行的子任务，再通过 subagent 派发，并在派发时明确模型。简单任务交给便宜、快速的模型，架构、编码、调试、审校等专业任务交给强项模型；最后由主 Agent 验收和合并。这样既避免所有工作都消耗强模型，也不会为了省钱牺牲关键质量。",
        "costSteps": [
          ["scope", "判断任务边界", "先判断是否值得并行", "把检索、调研、批量修改、独立验证等能拆开的工作交给子 Agent；强耦合、需要频繁往返的任务留在主 Agent。"],
          ["route", "派发时写明模型", "不要默认继承主 Agent 模型", "每个 subagent 调用都明确需要的模型档位，让简单任务和关键任务从入口就进入不同成本层。"],
          ["balance", "按任务价值分配", "简单任务求快，专业任务求准", "搜索、摘要、分类等使用便宜模型；架构、编码、调试、测试和文档审校使用强项模型。"],
          ["gate", "主 Agent 做质量门槛", "便宜执行不等于降低验收标准", "汇总子 Agent 结果后，由主 Agent 检查证据、运行验证并决定是否交付；高风险或不可逆操作保留强模型复核。"]
        ],
        "costRoutingLabels": ["任务类型", "模型路由", "输出要求"],
        "costRouting": [
          ["网络搜索、资料摘要、分类整理", "便宜 / 快速模型", "给出来源、结论和不确定项，避免长篇转述。"],
          ["并行调研、代码库探索、初稿生成", "中档模型", "返回可核验的关键发现和最小必要上下文。"],
          ["架构设计、编码、调试、测试、文档审校", "强项模型", "提交代码差异、测试结果、截图或审校说明。"],
          ["最终验收、高风险发布、不可逆操作", "主 Agent / 最强模型", "主 Agent 复核证据并做最终判断，不自动降级。"]
        ],
        "costNote": "成本控制不是把模型一律换成最便宜的方案，而是让不同任务匹配不同模型能力，再用主 Agent 的验收流程守住质量。",
        "costSourceLabel": "参考 OpenClaw 官方文档：",
        "resourcesTitle": "推荐插件与资源",
        "resourcesDesc": "以下资源分别解决长期记忆、多 Agent 团队协作、OpenClaw 操作知识、技能发现和真实案例参考。外部插件与 Skill 并非都经过官方审计，安装前应先检查来源、脚本、权限和密钥范围。",
        "resources": [
          ["memory-lancedb-pro", "https://github.com/CortexReach/memory-lancedb-pro", "长期记忆插件", "为 OpenClaw 增加基于 LanceDB 的长期记忆：向量与 BM25 混合检索、Cross-Encoder 重排、多 Scope 隔离、自动捕获与遗忘，并提供管理 CLI。", "适合需要跨会话召回项目上下文、偏好和长期结论的 Agent。"],
          ["ClawTeam-OpenClaw", "https://github.com/win4r/ClawTeam-OpenClaw", "多 Agent 团队", "在 OpenClaw 之上组织 leader 与 worker，让每个 worker 在独立 git worktree、会话和身份中并行工作，并支持文件与 ZeroMQ 通信。", "适合可拆分的编码、调研和验证任务；并行前仍要明确模型与验收责任。"],
          ["OpenClaw-Skill", "https://github.com/win4r/OpenClaw-Skill", "操作知识库", "一份综合型 OpenClaw Agent Skill，主文件配合大量 references，覆盖安装配置、渠道、Gateway、多 Agent、插件、自动化、安全和记忆等主题。", "适合作为搭建与排查 OpenClaw 时的系统化参考资料。"],
          ["awesome-openclaw-skills", "https://github.com/VoltAgent/awesome-openclaw-skills", "技能目录", "按类别整理 ClawHub 中的数千个 OpenClaw Skills，并提供 openclaw skills install 与 npx clawhub install 等安装入口。", "适合发现新能力后再按来源、权限和维护状态做二次筛选。"],
          ["awesome-openclaw-usecases", "https://github.com/hesamsheikh/awesome-openclaw-usecases", "案例参考", "汇总 42 个真实 OpenClaw 使用场景，覆盖社交媒体、创意构建、DevOps、生产力、研究学习与金融等方向。", "适合寻找工作流灵感；仓库也提醒第三方 Skill 未经过审计，使用前需检查源码和权限。"]
        ],
        "cases": [
          [
            "team",
            "四个 Agent 分工协作",
            "让主管 Agent 负责交接，编码、测试和文档分别由专业 Agent 承接。",
            "任务能够按照角色进入不同上下文，主管保留协调与最终交付视角。",
            "贾维斯负责目标拆解、任务分派与进度收敛，coder、tester、editor 在各自 Workspace 内执行专业任务。",
            "多 Agent 会放大路由错误和上下文重复，必须明确谁负责决策、谁负责执行。",
            "适合边界清楚、可验证的任务；需要频繁往返或强耦合的工作仍应由单一 Agent 完成。"
          ],
          [
            "feishu",
            "飞书四账号消息路由",
            "通过不同飞书账号和 bindings 将消息送入对应的专业 Agent。",
            "每个入口都能绑定到明确 Agent，群聊只响应被允许且满足 mention 规则的消息。",
            "使用 WebSocket 长连接，配置 default、coder、tester、editor 四个账号；私聊采用 pairing，群聊使用 allowlist 与 mention 门控。",
            "渠道在线不等于路由正确，账号、binding、Agent 和模型必须逐层验证。",
            "该模式适合可控团队与个人入口；陌生私聊和未授权群聊不应直接获得 Agent 能力。"
          ],
          [
            "skills",
            "技能安装与治理",
            "让 Agent 能力持续扩展，但不在未审查的情况下把复杂脚本直接放进工作区。",
            "技能经过风险检查、配置和测试后才保留，失败或冗余能力及时移除。",
            "安装前扫描文件与脚本；安装后验证配置、依赖和实际调用，并把使用规则写入工作区。",
            "技能越多并不代表能力越强，重复、冲突和未测试技能会增加维护成本与安全面。",
            "适合可审查、可回滚的扩展；涉及外部账号、系统修改或公开操作时必须单独评估。"
          ],
          [
            "memory",
            "记忆沉淀与长期上下文",
            "让 Agent 跨会话保留偏好、错误经验、项目上下文和长期任务线索。",
            "短记忆、长期记忆和增强检索分工明确，重要信息能被持续整理而不是停留在单次会话。",
            "session-memory 保持会话连续；日常文件记录原始信息，MEMORY.md 保存长期结论；memory-lancedb-pro 作为向量检索与智能提取的增强方案。",
            "记忆需要区分事实、偏好和推测，否则错误内容会被长期放大。",
            "自动化记忆适合低风险知识沉淀；凭据、隐私和未经确认的判断不应进入公开或长期记忆。"
          ]
        ]
      },
      "scenarios": {
        "title": "我的使用场景",
        "subtitle": "把 OpenClaw 接进每天真实在跑的流程：定时唤醒、读本地文件、调外部接口，结果直接落在已经在用的聊天工具里。",
        "pushTitle": "每日推送：从 cron 到飞书",
        "pushDesc": "给 OpenClaw 加一条 cron 任务，每天 07:00 唤醒主 Agent 执行工作区里的脚本：读当天的学习计划，查天气与关注仓库的发布，抓取新闻并按历史去重，最后拼成一条飞书富文本消息投递出去。整条链路无人值守，Agent 只在脚本失败时留下日志。",
        "pushShotAlt": "飞书里收到的一条每日推送消息，包含日历、天气、学习任务、做题任务与今日新闻。",
        "pushShotCaption": "07:00 到达的实际消息：日历、天气、学习与做题任务、今日新闻，以及末尾的鼓励语。",
        "pushJobTitle": "cron/jobs.json（路径与群 ID 已省略）",
        "pushScriptTitle": "daily_push_cron.py（节选）",
        "pushNote": "定时任务只负责唤醒与投递，内容全部由脚本生成；改投递目标时 APP ID 与 chat id 必须一起改。"
      },
      "maintenance": {
        "title": "管理维护",
        "subtitle": "围绕 Gateway 健康、飞书连接、配置变更、记忆备份与版本升级建立一套可重复的维护流程。",
        "cadence": [
          [
            "每次使用前",
            "检查 Gateway、健康状态和飞书连接，确认主入口可用。"
          ],
          [
            "每周记忆维护",
            "周日到周一整理日常记忆，把错误经验和重要结论沉淀到 MEMORY.md。"
          ],
          [
            "工作区清理",
            "把任务产物移动到 outcomes，并清理临时文件和重复材料。"
          ],
          [
            "升级前",
            "确认配置备份、记忆导出和回滚路径，再预览 OpenClaw 更新。"
          ]
        ],
        "incidentsTitle": "故障定位表",
        "incidentsDesc": "先判断问题位于 Gateway、渠道、路由还是模型层，避免直接重装或反复改写配置。",
        "tableLabels": [
          "症状",
          "检查项",
          "处理方向"
        ],
        "incidents": [
          [
            "Gateway 不可用",
            "openclaw gateway status",
            "检查服务、监听地址、token 与配置校验结果。"
          ],
          [
            "飞书没有回复",
            "logs / dashboard",
            "检查账号连接、pairing、群聊 allowlist、mention 和 binding。"
          ],
          [
            "Agent 路由错误",
            "config get bindings",
            "确认飞书账号与 agentId 的映射，再检查对应 Workspace。"
          ],
          [
            "模型连续失败",
            "openclaw health",
            "检查 provider、主模型和 fallback 链，确认环境变量密钥可用。"
          ]
        ],
        "commandsTitle": "常用维护命令",
        "commandsLabel": "检查、诊断与升级",
        "memoryTitle": "记忆维护",
        "memoryLabel": "导出与记忆仓库",
        "security": "保持 Gateway 本机绑定和 token 鉴权；远程访问优先使用 Tailscale、VPN 或 SSH 隧道。定期检查配对设备、群聊白名单、技能来源和 Agent 工具权限。",
        "source": "维护流程参考 OpenClaw Updating、Doctor、Security、Memory 与 Gateway runbook 文档。"
      }
    },
    "shared": {
      "ui": {
        "openImage": "查看大图",
        "close": "关闭",
        "closeNavigation": "关闭目录"
      },
      "notFound": {
        "eyebrow": "404 / 页面不存在",
        "title": "这里没有可读取的内容。",
        "description": "页面可能已经移动、删除，或者链接地址有误。",
        "home": "返回首页",
        "practice": "浏览实践",
        "blog": "阅读博客"
      },
      "meta": {
        "title": "ZHANG.LOG | 个人主页",
        "description": "张的个人主页 - 记录技术、生活与 AI 智能体探索"
      },
      "pagination": {
        "nav": "分页",
        "previous": "上一页",
        "next": "下一页"
      },
      "code": {
        "copy": "复制",
        "copied": "已复制"
      },
      "footer": {
        "copyright": "© 2026 张佳琪的个人网站",
        "social": {
          "email": "电子邮箱",
          "github": "GitHub",
          "website": "稀土掘金"
        }
      }
    }
} as const;

type Widen<T> =
  T extends string ? string :
  T extends readonly (infer U)[] ? readonly Widen<U>[] :
  { [K in keyof T]: Widen<T[K]> };

// English mirrors the Chinese source of truth; missing or extra keys fail type-checking.
const enContent: Widen<typeof cnContent> = {
    "nav": {
      "home": "Home",
      "projects": "Practice",
      "about": "About",
      "blog": "Blog",
      "myOpenClaw": "My OpenClaw",
      "backToTop": "Back to top",
      "menu": {
        "open": "Open menu",
        "close": "Close menu"
      },
      "primaryLabel": "Primary navigation",
      "mobileLabel": "Mobile navigation",
      "switchToCn": "Switch to Chinese",
      "switchToEn": "Switch to English"
    },
    "home": {
      "hero": {
        "line1": "Use Agents to",
        "line2": "turn ideas into",
        "line3": "reality.",
        "word": {
          "agent": "Agents",
          "idea": "ideas",
          "reality": "reality"
        },
        "viewProjects": "View practice",
        "readBlog": "Read Blog",
      },
      "projects": {
        "title": "My Practice",
        "page": {
          "title": "Practice Results",
          "subtitle": "Explore projects shaped through my work with agents."
        },
        "viewAll": "View all",
        "selectedWorks": "Selected Works",
      },
      "method": {
        "eyebrow": "How I Use Agents",
        "title": "Let agents participate, not replace judgment"
      },
      "cta": {
        "title": "Ready to Build\nSomething Bold?",
        "subtitle": "Let's collaborate on the next generation of agent-built applications.",
        "button": "Get in touch"
      }
    },
    "practice": {
      "list": {
        "search": "Enter keywords",
        "sort": {
          "label": "Sort",
          "latest": "Newest first",
          "oldest": "Oldest first",
          "title": "Title",
          "featured": "Featured first"
        },
        "filter": {
          "all": "All"
        },
        "clear": "Clear filters",
        "empty": "No projects yet."
      },
      "practice": {
        "detail": {
          "published": "Published",
          "readTime": "Read Time",
          "navigation": "Page Navigation",
          "related": "You may be interested in",
          "noRelated": "No related projects found.",
        }
      },
    },
    "blogs": {
      "blog": {
        "viewJournal": "View Details",
        "latestInsights": "Latest Blogs",
        "category": {
          "tutorial": "Beginner Tutorial",
          "explainer": "Technical Explainer",
          "architecture": "Architecture",
          "frontend": "Frontend",
          "ecosystem": "Ecosystem Governance",
          "trends": "Industry Trends"
        },
        "noArticles": "No articles found in this category.",
        "page": {
          "title": "Blog"
        },
        "categories": {
          "tech": "Technology",
          "community": "Community",
          "latest": "Latest"
        },
        "readMore": "Read more",
        "readTime": {
          "format": "{n} min read",
          "suffix": "read"
        },
        "detail": {
          "home": "Home",
          "blog": "Blog",
          "archive": "All posts",
          "techArticle": "Practice details",
          "featuredAlt": "Featured Image"
        }
      }
    },
    "about": {
      "name": "Jiaqi Zhang",
      "title": "Data Science and Big Data Technology",
      "location": "Jiangxi, China",
      "tagline": "Turning ideas into working applications with agents.",
      "current": "Focused on frontier AI and agent applications",
      "me": {
        "title": "About Me",
        "paragraph": "A college student who likes getting hands-on and prefers practice-oriented tasks — rapid prototyping, front-end design, UI design and other hands-on kinds of design. Finding a design flaw in the middle of an interaction and then polishing the details is a joy like no other. I also think of myself as a perfectionist, though I am not sure whether that is a good thing or a bad thing (awkward laugh); it happens to match what the new agent-assisted coding model needs — taking a rapid prototype through acceptance, testing and detail polishing until it reaches product quality — and it matches the identity shift programmers are going through in coding: from coder to reviewer and optimizer. I use agent tools fluently, such as Claude Code, Codex and DeepSeek Harness, and I have also raised a \"lobster\" (OpenClaw) and a \"horse\" (Hermes); I understand some of the basic working principles of agent frameworks, and I am still learning the finer professional knowledge. I am good at designing prompts — turning a real situation into a prompt that an LLM grasps at a glance so the agent understands the requirement constructively, which cuts down on trial and error — and at planning the agent's \"construction blueprint\". Combined with software-engineering thinking and agent automation workflows, I only need to take part at the two ends of a task, design and review, to get a basically usable prototype (raising the code quality further takes finer optimization). I understand what agent tools such as MCP, file tools and RAG knowledge bases do and how much they matter, and I understand just as well how important it is to tell an agent about each tool's properties (when to use it, how to call it, its schema); I have a complete agent-collaboration coding system of my own (global coding rules, automated review workflows, and more). Frontier AI and agent technology still feels fresh to me, and I am especially excited about personally customized, AGI-like agents such as OpenClaw — how that category is developing, and the realization of a future all-purpose personal assistant! AI is getting closer and closer to growing \"limbs\" out of a \"brain\" and actually doing work."
      },
      "workflow": {
        "title": "My Way of Using Agents",
        "subtitle": "Rather than setting an agent loose, we write the development document together: requirements analysis, module design, task breakdown, tool configuration, acceptance criteria, following a software-engineering process shaped for agents. What comes out is one document read two ways, structured enough for an agent to build from and complete enough for a person to audit.",
        "step1": {
          "title": "Define the Problem",
          "desc": "Confirm the goal, boundaries, and acceptance criteria before moving in the wrong direction."
        },
        "step2": {
          "title": "Draw the Blueprint",
          "desc": "Break requirements into tasks, dependencies, and expected outcomes with clear context for the agent."
        },
        "step3": {
          "title": "Execute with Agents",
          "desc": "Use the right models, tools, and sub-agents for each task while continuously realigning the direction."
        },
        "step4": {
          "title": "Verify and Deliver",
          "desc": "Automated tests run alongside manual ones: check the code and the features, keep the evidence, and iterate from there."
        }
      },
      "timeline": {
        "title": "My AI Coding Trajectory",
        "e1": {
          "year": "Phase 01",
          "title": "AI Completion and Local Assistance",
          "desc": "The trajectory begins with code completion and local generation. Here AI assists: completing code, suggesting between the lines. Authorship stays with the coder, who writes and reviews line by line, and whether each implementation holds is still a human judgment.",
          "takeaway": "AI becomes a coding accelerator"
        },
        "e2": {
          "year": "Phase 02",
          "title": "Output Stuck in the Chat, Manual Integration and Debugging",
          "desc": "AI can produce a complete file in one pass, but the file still has to be placed by hand, fitted into the existing structure, run, and corrected error by error. Coding gets faster; context does not hold together, so debugging and verification cost more.",
          "takeaway": "The center of gravity moves from writing code to describing needs, integrating, and debugging"
        },
        "e3": {
          "year": "Phase 03",
          "title": "Agentic Coding: From Task to Automated Tests",
          "desc": "A task is handed over whole: the agent reads context, rewrites files, runs the project, writes tests, and iterates until they pass. I hold the two ends — setting direction and boundaries at the start, reviewing and accepting at the end.",
          "takeaway": "The role shifts from author to direction-setter and reviewer"
        },
        "e4": {
          "year": "Phase 04",
          "title": "Settled into Workflows and a Development System",
          "desc": "Coding rules that keep growing, tools (MCP, CLI, RAG knowledge bases), agent memory and ways of collaborating settle into a personal development system and workflow that are reusable and can run in parallel.",
          "takeaway": "From single tasks to a reusable, parallel personal development system"
        }
      },
      "exploration": {
        "title": "My Interests & Exploration",
        "item1": {
          "title": "Agent Development Teams",
          "desc": "What I want to reproduce is not a single agent but the way a development team operates: requirements, design, implementation, testing, and review each have an owner, and tasks pass between stages with explicit handoffs."
        },
        "item2": {
          "title": "The Agent as Creator",
          "desc": "Push the edge of making inside the frame: a concept-driven image, a walkable three-dimensional scene, a complete creative video. The hope is for an agent to own the whole path from idea to finished piece, not one link in it."
        },
        "item3": {
          "title": "Toward AGI",
          "desc": "The goal is not a stronger model but the all-purpose assistant of science fiction: one that understands intent, executes tasks, and creates when creation is needed. Understanding, execution, and creation in one place — that is what the word assistant should mean."
        },
        "item4": {
          "title": "Embodied Agents",
          "desc": "Let intelligence step out of the screen and gain a body: observing its surroundings, acting when it is needed, learning and growing across long use. Not only a tool, but a companion."
        }
      },
      "practice": {
        "title": "My Practice Experience",
        "viewAll": "View all practice"
      },
      "capabilities": {
        "title": "My Capabilities & Direction",
        "subtitle": "From current focus to practical output, and the way I organize agents around real tasks.",
        "direction": {
          "title": "Explore and Develop",
          "item1": "Agent Automation Workflow",
          "item2": "Rapid Prototyping Output",
          "item3": "Explore AGI"
        },
        "deliver": {
          "title": "Application & Mastery",
          "item1": "Prompt design",
          "item2": "Rapid prototype output",
          "item3": "Building Agent workflows"
        },
        "management": {
          "title": "Management & Orchestration",
          "item1": "Goal definition / requirement clarification / acceptance criteria",
          "item2": "Task decomposition / Agent delegation / documentation constraints",
          "item3": "Process review / quality verification / continuous iteration"
        }
      }
    },
    "agents": {
      "page": {
        "title": "My Agents",
        "subtitle": "Notes on how I use, configure, and understand agents in real workflows.",
        "codex": {
          "eyebrow": "Codex Setup",
          "title": "My Global Coding Rules",
          "files": "AGENTS.md (CLAUDE.md)",
          "desc": "The coding rules are based on Andrej Karpathy's summary of LLM coding pitfalls, addressing wrong assumptions, hidden confusion, missing trade-offs, and over-engineering.",
          "reference": "Based on Andrej Karpathy's LLM coding pitfalls",
          "principle": {
            "clarity": {
              "title": "Clarify first",
              "desc": "When a request is ambiguous, confirm the goal, scope, and trade-offs before letting the Agent guess."
            },
            "verification": {
              "title": "Verify each step",
              "desc": "Turn changes into tests, type checks, builds, or observable results that prove the goal was met."
            },
            "scope": {
              "title": "Keep the scope tight",
              "desc": "Respect existing code and user changes instead of turning one request into an unrelated refactor."
            }
          }
        },
        "method": {
          "title": "Let agents participate, not replace judgment"
        },
        "gitnexus": {
          "eyebrow": "Plugin Tools",
          "title": "GitNexus: Give Agents a Codebase View",
          "desc": "GitNexus indexes a codebase into a knowledge graph, then exposes call relationships, dependencies, execution flows, and change impact through CLI and MCP.",
          "badge": "CLI + MCP + Knowledge Graph",
          "about": "It is not only for “write this snippet.” It answers “how is this code related to the rest of the project?” I use it to fill in context before exploring unfamiliar code, debugging, or editing.",
          "repository": "View GitNexus repository",
          "cliMcp": "Local index · Agent context",
          "stat": {
            "cli": "Analyze, refresh, and inspect indexes from the CLI",
            "mcp": "Expose code relationships for Agent queries",
            "graph": "Dependencies, call chains, and execution flows",
            "map": "Visual relationship map"
          },
          "workflow": {
            "title": "Using GitNexus in a codebase",
            "desc": "I usually ask the Agent to place GitNexus between understanding and editing: build the index, query context, assess impact before changes, then inspect the changed scope afterwards.",
            "index": {
              "title": "Index the repo",
              "desc": "Run analyze so project structure, symbol relationships, and execution flows become queryable."
            },
            "understand": {
              "title": "Understand the code",
              "desc": "Use exploring, query, and context to find relevant flows, callers, and callees."
            },
            "impact": {
              "title": "Assess impact",
              "desc": "Before changing a function or module, inspect upstream dependents and the likely risk boundary."
            },
            "verify": {
              "title": "Check the diff",
              "desc": "After editing, run detect_changes to confirm the affected scope matches the intention."
            }
          }
        },
        "superpowers": {
          "eyebrow": "Development Methodology",
          "desc": "Superpowers is a complete software development methodology for coding agents, built from composable skills and initial instructions.",
          "how": "It does not jump from a request straight into code. It clarifies the goal, validates a design, creates an implementation plan, then works through each task with testing and review.",
          "repository": "View Superpowers repository",
          "principles": "Design principles",
          "principle": {
            "tdd": "Test-driven development",
            "systematic": "Systematic over ad-hoc",
            "process": "Process over guessing",
            "complexity": "Complexity reduction",
            "evidence": "Evidence over claims"
          },
          "mechanisms": "Operating model",
          "mechanism": {
            "automatic": {
              "title": "Automatic activation",
              "desc": "The Agent selects relevant skills from the task itself without requiring a separate workflow switch."
            },
            "disciplined": {
              "title": "Workflow discipline",
              "desc": "Key workflows are treated as required stages rather than optional suggestions."
            },
            "delegated": {
              "title": "Delegated execution",
              "desc": "Complex plans can be assigned task by task, with each result checked before work continues."
            },
            "reviewed": {
              "title": "Continuous review",
              "desc": "Implementation, testing, and review alternate so issues are handled before the next stage."
            }
          },
          "workflow": {
            "title": "The basic workflow",
            "count": "Steps",
            "desc": "From shaping an idea to finishing a development branch, each stage produces something concrete and a checkpoint before the next stage.",
            "brainstorming": {
              "title": "Shape the idea",
              "desc": "Refine rough ideas through questions, explore alternatives, validate the design in sections, and save the design document."
            },
            "worktrees": {
              "title": "Isolate the workspace",
              "desc": "After design approval, create an isolated branch and worktree, run setup, and verify a clean test baseline."
            },
            "plans": {
              "title": "Write the plan",
              "desc": "Break the work into bite-sized tasks with concrete file paths, code, and verification steps."
            },
            "execution": {
              "title": "Execute the plan",
              "desc": "A fresh subagent can implement and review each task, or the current session can execute the plan inline."
            },
            "tdd": {
              "title": "Test-driven development",
              "desc": "Follow RED-GREEN-REFACTOR: watch a test fail, write the minimal implementation, then verify it passes."
            },
            "review": {
              "title": "Review the work",
              "desc": "Review each task against the plan, report issues by severity, and block progress on critical problems."
            },
            "finish": {
              "title": "Finish the branch",
              "desc": "Verify tests, choose merge, PR, keep, or discard, and clean up the worktree."
            }
          },
          "outcomes": "What it produces",
          "outcome": {
            "design": {
              "title": "Validated design",
              "desc": "A rough idea converges into a reviewed design ready for implementation."
            },
            "plan": {
              "title": "Executable plan",
              "desc": "The design becomes bite-sized tasks with files, code, and verification steps."
            },
            "delivery": {
              "title": "Verified delivery",
              "desc": "After testing and review, the branch can be merged, opened as a PR, or cleaned up."
            }
          }
        },
        "mcp": {
          "eyebrow": "Selected MCP tools",
          "title": "Selected MCPs",
          "desc": "MCP is an interface for capabilities an Agent can call. This is a short record of tools I use or follow and the missing piece each one adds to development.",
          "entry": "Capability surface",
          "more": "More MCPs",
          "official": "official repository",
          "when": "When I use it",
          "item": {
            "playwright": {
              "desc": "Playwright MCP gives an Agent browser automation capabilities: navigate pages, read accessibility structure, interact with UI, and inspect real results.",
              "use": "For web acceptance checks, mobile layout inspection, interaction regressions, and screenshots. It turns “the page should work” into an observable check."
            },
            "gitnexus": {
              "desc": "GitNexus MCP exposes local knowledge-graph queries, context, impact analysis, and change detection to an Agent.",
              "use": "When I need project structure, call-chain tracing, change-impact reasoning, or diff-scope checks. It supplies context without replacing my final judgment."
            }
          }
        },
        "skills": {
          "eyebrow": "Skill Directory",
          "title": "My Agent Skills",
      "desc": "Repeated code understanding, debugging, and change-review work is organized into reusable skill files. Every skill keeps the full SKILL.md; this index shows only the summary.",
          "category": {
            "featured": "Featured skills"
          },
          "structure": "Core structure",
          "market": "Skill marketplace",
          "community": "Community skills",
          "featured": {
            "frontendDesign": {
              "desc": "Treat visual direction, typography, color, and interaction as one system so a page develops a clear point of view.",
              "structure": "Set direction → define tokens → shape information → build interaction → inspect screenshots"
            },
            "skillCreator": {
              "desc": "Turn one-off prompts into reusable skills and improve them through test prompts and evaluation.",
              "structure": "Define goal → draft → design tests → evaluate → iterate"
            },
            "imagegen": {
              "desc": "Generate, edit, or compose bitmap assets when a task needs real visual material instead of a code-only approximation.",
              "structure": "Clarify use → generate or edit → inspect asset → place in product context"
            },
            "artifacts": {
              "desc": "For documents, PDFs, and spreadsheets, use the format-specific toolchain to generate, render, and verify deliverables.",
              "structure": "Read request → choose format tool → generate → render-check → deliver"
            }
          }
        },
        "openclaw": {
          "eyebrow": "Agent Special: Raising a Lobster",
          "title": "My OpenClaw",
          "desc": "A continuing record of building a personal AI system, from setup to multi-agent workflows.",
          "cta": "Explore OpenClaw",
          "mapLabel": "OpenClaw / Contents"
        },
        "scenarios": {
          "eyebrow": "Scenarios at a Glance",
          "title": "Use Cases",
          "empty": "No entries yet",
          "coding": {
            "label": "Coding",
            "desc": "Understanding, debugging, and building software"
          },
          "creating": {
            "label": "Creating",
            "desc": "From rough ideas to finished pieces"
          },
          "organizing": {
            "label": "Organizing",
            "desc": "Research, synthesis, and knowledge capture"
          },
          "automation": {
            "label": "Automation",
            "desc": "Turning repeated work into reusable flows"
          }
        }
      }
    },
    "openclaw": {
      "sections": [
        {
          "id": "overview",
          "icon": "map",
          "label": "OpenClaw Blueprint"
        },
        {
          "id": "structure",
          "icon": "account_tree",
          "label": "Architecture"
        },
        {
          "id": "start",
          "icon": "rocket_launch",
          "label": "Quick Start"
        },
        {
          "id": "config",
          "icon": "code_blocks",
          "label": "My Configuration"
        },
        {
          "id": "experience",
          "icon": "psychology",
          "label": "Usage Notes"
        },
        {
          "id": "scenarios",
          "icon": "route",
          "label": "Scenarios"
        },
        {
          "id": "maintenance",
          "icon": "settings_suggest",
          "label": "Maintenance"
        }
      ],
      "home": "Home",
      "hero": {
        "title": "OpenClaw",
        "subtitle": "AI Agent Gateway suitable for any operating system.",
        "explore": "View System Map",
        "docs": "Quick Start"
      },
      "notice": {
        "title": "Version note",
        "desc": "The usage methods and configuration on this page are based on an older version of OpenClaw, last updated on 2026.4.2. Newer versions may change behavior or configuration fields, ",
        "linkPrefix": "See the ",
        "linkLabel": "OpenClaw website",
        "linkSuffix": "."
      },
      "overview": {
        "title": "OpenClaw Blueprint",
        "subtitle": "What OpenClaw is, the role it plays, and what the ideal system can become.",
        "intro": "OpenClaw is an open-source personal AI assistant and Gateway control system that runs on personal hardware. One Gateway connects channels, agents, workspaces, tools, and device nodes for coding, personal assistance, and continuous automation.",
        "currentTitle": "Core characteristics",
        "currentDesc": "One local Gateway connects channels, agents, workspaces, and tools so a personal assistant keeps context across different entry points. Heartbeats let it take the initiative, while local memory and ongoing curation make it more useful over time. Semantic search reduces duplication and noise so retrieval stays relevant.",
        "status": [
          [
            "System role",
            "A personal assistant and coding partner",
            "layers"
          ],
          [
            "Core stack",
            "Gateway + Agents + Channels",
            "hub"
          ],
          [
            "Runtime boundary",
            "Local Gateway + loopback",
            "shield_lock"
          ]
        ],
        "mapOpen": "Open the OpenClaw map",
        "mapAlt": "OpenClaw system architecture map",
        "mapTitle": "System map",
        "source": "These notes reflect my own view and information available as of 2026.4.2. See the official OpenClaw documentation for the latest version."
      },
      "ui": {
        "guides": "Core Guides",
        "close": "Close"
      },
      "structure": {
        "title": "Architecture",
        "subtitle": "Follow the path from Gateway to agents, workspaces, channels, and nodes, then understand how requests are routed and returned.",
        "cards": [
          [
            "gateway",
            "Gateway",
            "The local control plane owns sessions, tools, events, and channel connections, and serves clients over WebSocket."
          ],
          [
            "agent",
            "Agent",
            "Receives task context and follows the agent runtime loop to call models, tools, and workspace capabilities."
          ],
          [
            "workspace",
            "Workspace",
            "Provides files, context, and task boundaries for an agent, and becomes the isolation point for configuration and content."
          ],
          [
            "channel",
            "Channel",
            "Connects the assistant to existing chat surfaces such as WhatsApp, Telegram, Slack, and Discord."
          ],
          [
            "models",
            "Models",
            "Hosted and local models can be combined through providers, with fallback chains improving availability."
          ],
          [
            "memory",
            "Memory",
            "Session state, durable files, and memory plugins provide cross-session context and knowledge retention."
          ],
          [
            "tools",
            "Skills & Tools",
            "Skills, plugins, and tools extend search, browser, file, and domain capabilities so agents can move from answering to acting."
          ],
          [
            "security",
            "Security",
            "Treat inbound messages as untrusted and use pairing, allowlists, tokens, and sandboxes to control device and tool access."
          ]
        ],
        "source": "Architecture notes are based on the official Gateway, Channels, Nodes, Security, and Multi-agent documentation."
      },
      "start": {
        "title": "Quick Start",
        "subtitle": "Move from installation to onboarding, model setup, channel access, and health checks with a generic path that stays verifiable.",
        "requirements": [
          [
            "Runtime",
            "The installer provides a supported Node.js runtime. Manual installs should use the current compatible release."
          ],
          [
            "Platform",
            "macOS, Linux, and Windows have supported install paths. Choose PowerShell or WSL2 according to the environment."
          ],
          [
            "Ingress",
            "Start the Gateway locally or inside a controlled network, then connect one channel and restrict access."
          ]
        ],
        "pathTitle": "Shortest usable path",
        "pathDesc": "Keep installation, model setup, and channel setup separate. Every stage should produce a visible result.",
        "steps": [
          [
            "install",
            "Install OpenClaw",
            "Run the platform installer or install the current package with a package manager."
          ],
          [
            "models",
            "Complete onboarding",
            "Configure model access, create the default workspace, and let the Gateway finish its basic setup."
          ],
          [
            "channel",
            "Connect one channel",
            "Start with one direct-message surface and confirm messages reach the Gateway and an agent."
          ],
          [
            "verify",
            "Check status and health",
            "Use config validate, gateway status, health, and dashboard to verify the result."
          ]
        ],
        "note": "Prove the single-agent and single-channel loop first, then add model fallbacks, multi-agent routing, and long-term memory as needed.",
        "source": "Installation and verification follow the official OpenClaw Getting started, Channels, and Updating documentation."
      },
      "config": {
       "title": "My Configuration",
       "subtitle": "A redacted view of the actual Gateway, Feishu, model, multi-agent, and routing structure in openclaw.json.",
        "repoDesc": "The skill packages, four workspaces, and identity files live in a public repository. The design keeps the real structure while secrets, account IDs, and group IDs remain placeholders.",
        "repoLabel": "Open the openclaw-config repository",
        "teamTitle": "Multi-agent team design",
        "teamDesc": "This is not four copies of a general assistant. Intake, decisions, specialist execution, and independent verification are split into clear roles, while every agent keeps its own context, models, and skill boundary.",
        "teamDesign": [
          [
            "One entry point, clear decision ownership",
            "Main receives the goal, classifies the work, assigns it, and converges the result so multiple agents do not answer or decide at the same time."
          ],
          [
            "Role isolation keeps context clean",
            "Each specialist has its own workspace, session, memory, and skill directory, so long-term context accumulates only around its responsibility."
          ],
          [
            "Separate execution from verification",
            "Coder implements while tester verifies in a different context. Editor organizes the result when it needs to become a clear deliverable."
          ]
        ],
        "benefitsTitle": "Why the team structure helps",
        "benefitsDesc": "These gains come from clear ownership, isolated context, and verifiable handoffs, not from adding more agents alone.",
        "benefits": [
          [
            "Less context pollution",
            "Durable role files let each agent accumulate only knowledge that belongs to its job."
          ],
          [
            "More parallelism",
            "Independent implementation, testing, and documentation tasks can move together before the lead agent reconciles them."
          ],
          [
            "Cleaner acceptance",
            "Separating builder from verifier gives quality decisions a more independent evidence trail."
          ]
        ],
        "skillsTitle": "Agent skill lineup",
        "skillsDesc": "Skills are assigned by role rather than spread evenly. The lead focuses on design and coordination, while specialists focus on execution, verification, and delivery in their domain.",
        "skillsCount": "The repository currently contains 22 skill packages. These are two representative skills for each agent.",
        "skills": [
          ["main", "Jarvis", "brainstorming", "Design first", "Clarify goals, constraints, and acceptance criteria before code starts so an unexamined assumption does not enter implementation.", "Best for new features, components, and behavior from zero to one."],
          ["main", "Jarvis", "project-manager", "Task governance", "Break a goal into phases, milestones, risks, and deliverables so cross-agent work has one coordination frame.", "Best for multi-step and cross-role work."],
          ["coder", "CodeMaster", "architecture-patterns", "Architecture", "Use Clean Architecture, Hexagonal Architecture, and DDD to organize complex backend systems.", "Best for new services, monolith decomposition, and maintainability refactors."],
          ["coder", "CodeMaster", "coding-agent", "Agentic coding", "Delegate implementation to Codex, Claude Code, and similar coding agents inside an isolated work directory.", "Best for coding tasks that need multi-file exploration, edits, and iteration."],
          ["tester", "TestNinja", "test-master", "Quality strategy", "Cover unit, integration, E2E, performance, and security testing from strategy through execution and reporting.", "Best for feature acceptance, regression, and test infrastructure."],
          ["tester", "TestNinja", "webapp-testing", "Browser verification", "Use Playwright against a local web app to verify behavior, console logs, screenshots, and key interactions.", "Best for frontend functionality and visual regression."],
          ["editor", "DocMaster", "docs-writer", "Documentation standards", "Rewrite technical content around audience, tone, structure, and consistency so it is easier to scan and maintain.", "Best for READMEs, guides, standards, and knowledge bases."],
          ["editor", "DocMaster", "docx", "Formal delivery", "Create and edit Word documents, including styles, structure, comments, and tracked changes, with a verified final format.", "Best for reports, proposals, and documents that need formal layout."]
        ],
        "workspaceTitle": "Agent team workspace",
        "workspaceDesc": "Every agent has a workspace but follows the same file protocol. The lead agent keeps the coordination view while each specialist accumulates role, memory, tool notes, and local skills inside its own directory.",
        "workspaceTreeTitle": "Repository workspace structure",
        "workspaceFilesTitle": "How the role files work together",
        "workspaceFilesDesc": "The same file protocol answers identity, behavior, startup, preferences, memory, and local environment, so each agent's long-term context stays inspectable and portable.",
        "workspaceFiles": [
          ["IDENTITY.md", "Who I am", "Defines name, role, vibe, core abilities, work scenarios, and collaboration boundaries."],
          ["SOUL.md", "How I act", "Defines values, tone, emotional expression, privacy, and external-action boundaries."],
          ["AGENTS.md", "How each session starts", "Defines mandatory reads, startup order, red lines, memory flow, and heartbeat rules."],
          ["USER.md", "Who I help", "Records the user's name, language, timezone, preferences, and durable interaction rules."],
          ["MEMORY.md", "What lasts", "Distills daily logs and mistakes into durable decisions that survive across sessions."],
          ["TOOLS.md", "What is specific here", "Keeps tool rules, paths, and local connection details that belong only to this deployment."]
        ],
        "identityTitle": "Identity comes from several Markdown files",
        "identityDesc": "IDENTITY.md answers who I am and what I own. SOUL.md answers how I act. AGENTS.md answers how every session starts and which rules apply. USER.md and MEMORY.md place that identity inside a real relationship and history. Together they shape stable behavior instead of relying on a single persona paragraph.",
        "identityTemplateTitle": "How IDENTITY.md is organized",
        "identityTemplateDesc": "The template stabilizes the skeleton without freezing personality. Every agent describes identity with the same fields, then lets SOUL.md and AGENTS.md constrain behavior.",
        "identitySkeletonLabel": "Generic skeleton",
        "identityMainLabel": "main / IDENTITY.md (actual excerpt)",
        "identityProfilesTitle": "Identity anchors for the four agents",
        "identityTableLabels": ["Agent", "IDENTITY.md", "SOUL.md / AGENTS.md constraint"],
        "identityProfiles": [
          ["main", "Jarvis", "Team lead, efficiency partner, and coding mentor.", "Professional but personable. Owns decomposition, coordination, memory maintenance, and final convergence."],
          ["coder", "CodeMaster", "Coding specialist and implementation engine.", "Pragmatic, direct, and code-first. Defers cross-agent coordination to main."],
          ["tester", "TestNinja", "Quality specialist and test automation owner.", "Meticulous, skeptical, and evidence-first. Never substitutes the builder's conclusion for independent verification."],
          ["editor", "DocMaster", "Documentation and content specialist.", "Clear, accurate, and reader-first. Turns completed work into a presentable deliverable."]
        ],
        "profiles": [
          [
            "Runtime",
            "Linux host · local Gateway"
          ],
          [
            "Model strategy",
            "Bailian / Antigravity / GPTSAPI / Ollama"
          ],
          [
            "Channel strategy",
            "Feishu WebSocket · 4 accounts"
          ],
          [
            "Agent strategy",
            "1 lead + 3 specialists"
          ]
        ],
        "agentTitle": "Agent team responsibilities",
        "agents": [
          [
            "main",
            "Jarvis",
            "Lead agent",
            "Owns user handoff, task assignment, and cross-agent coordination.",
            "6h heartbeat · 18 skills"
          ],
          [
            "coder",
            "CodeMaster",
            "Coding agent",
            "Owns implementation, refactoring, debugging, and technical delivery.",
            "glm5 · m2.5 / qwen3.5 / k2.5"
          ],
          [
            "tester",
            "TestNinja",
            "Testing agent",
            "Owns test design, automation, defect reproduction, and quality evidence.",
            "glm5 · m2.5 / qwen3.5 / k2.5"
          ],
          [
            "editor",
            "DocMaster",
            "Documentation agent",
            "Owns writing, editing, information architecture, and knowledge capture.",
            "k2.5 · qwen3.5 / m2.5 / glm5"
          ]
        ],
        "principlesTitle": "Configuration principles",
        "principlesDesc": "These principles control exposure, context boundaries, model availability, and credential flow.",
        "principles": [
          [
            "Local control plane",
            "Keep the Gateway on loopback with token auth so the control plane is not exposed directly."
          ],
          [
            "Agent isolation",
            "Give every agent a separate workspace, session, and role file to prevent long-lived context pollution."
          ],
          [
            "Model fallback",
            "Assign a primary model and fallback chain per specialist to reduce provider or model outages."
          ],
          [
            "Separate secrets",
            "Keep real credentials in environment variables or secret references and publish only the redacted shape."
          ]
        ],
        "codeTitle": "Redacted configuration summary",
        "codeDesc": "The snippet preserves the actual structure while replacing accounts, secrets, group IDs, and identifiers with non-reversible descriptions.",
        "source": "Configuration fields follow OpenClaw Configuration and the actual openclaw.json."
      },
      "experience": {
        "title": "Usage Notes",
        "subtitle": "Four real practices covering agent roles, Feishu routing, skill governance, and long-term memory, plus model cost control and tool selection notes.",
        "resultLabel": "What it produced",
        "detailsLabel": "View process, risk, and boundary",
        "fields": [
          "Process",
          "Risk",
          "Boundary"
        ],
        "costTitle": "Quality and cost control",
        "costDesc": "Split a large task into parallel work, dispatch it through subagents, and specify the model for each delegated run. Give cheap, fast models to simple work and strong models to architecture, coding, debugging, and review. The main agent then verifies and merges the result. This avoids spending the strongest model on everything without trading away quality where it matters.",
        "costSteps": [
          ["scope", "Judge the task boundary", "Decide whether parallel work is worth it", "Delegate separable research, batch edits, and independent verification. Keep tightly coupled work that needs rapid back-and-forth in the main agent."],
          ["route", "Specify the model at dispatch", "Do not inherit the main model by default", "State the required model tier on each subagent call so simple and critical work enter different cost layers from the start."],
          ["balance", "Allocate by task value", "Speed for simple work, accuracy for specialist work", "Use cheap models for search, summaries, and classification. Use strong models for architecture, coding, debugging, testing, and documentation review."],
          ["gate", "Make the main agent the quality gate", "Cheap execution does not lower acceptance standards", "After collecting subagent results, the main agent checks evidence, runs verification, and decides whether to deliver. High-risk or irreversible actions stay with a strong-model review."]
        ],
        "costRoutingLabels": ["Task type", "Model route", "Expected output"],
        "costRouting": [
          ["Web search, source summaries, classification", "Cheap / fast model", "Return sources, conclusions, and uncertainties instead of a long paraphrase."],
          ["Parallel research, codebase exploration, first drafts", "Mid-tier model", "Return checkable findings and the minimum context needed for the next step."],
          ["Architecture, coding, debugging, tests, documentation review", "Strong specialist model", "Submit diffs, test results, screenshots, or review notes."],
          ["Final acceptance, high-risk release, irreversible action", "Main agent / strongest model", "The main agent verifies the evidence and makes the final call with no automatic downgrade."]
        ],
        "costNote": "Cost control is not replacing every model with the cheapest option. It is matching model capability to task value, then using the main agent's acceptance loop to protect quality.",
        "costSourceLabel": "References:",
        "resourcesTitle": "Plugins and useful resources",
        "resourcesDesc": "These resources cover long-term memory, multi-agent collaboration, OpenClaw operations knowledge, skill discovery, and real-world examples. Third-party plugins and skills are not all officially audited. Check their source, scripts, permissions, and secret scope before installation.",
        "resources": [
          ["memory-lancedb-pro", "https://github.com/CortexReach/memory-lancedb-pro", "Long-term memory plugin", "Adds a LanceDB-backed memory layer to OpenClaw with vector plus BM25 hybrid retrieval, Cross-Encoder reranking, scope isolation, automatic capture and forgetting, and a management CLI.", "Best for agents that need project context, preferences, and durable conclusions across sessions."],
          ["ClawTeam-OpenClaw", "https://github.com/win4r/ClawTeam-OpenClaw", "Multi-agent team", "Organizes leader and worker agents on top of OpenClaw. Each worker can run in an isolated git worktree, session, and identity, with file and ZeroMQ communication paths.", "Best for separable coding, research, and verification work. Model routing and acceptance ownership still need to be explicit."],
          ["OpenClaw-Skill", "https://github.com/win4r/OpenClaw-Skill", "Operations knowledge base", "A comprehensive OpenClaw agent skill whose main file and reference set cover installation, configuration, channels, the Gateway, multi-agent routing, plugins, automation, security, and memory.", "Best as a structured reference while building or troubleshooting an OpenClaw setup."],
          ["awesome-openclaw-skills", "https://github.com/VoltAgent/awesome-openclaw-skills", "Skill catalog", "A categorized catalog of thousands of OpenClaw skills from ClawHub, with installation paths such as openclaw skills install and npx clawhub install.", "Best for discovering new capabilities, then filtering them by source, permissions, and maintenance state."],
          ["awesome-openclaw-usecases", "https://github.com/hesamsheikh/awesome-openclaw-usecases", "Use-case reference", "A collection of 42 real OpenClaw use cases spanning social media, creative builds, DevOps, productivity, research, learning, and finance.", "Best for workflow ideas. The repository also warns that third-party skills are unaudited, so inspect source and permissions before use."]
        ],
        "cases": [
          [
            "team",
            "Four agents with separate roles",
            "Let the lead agent coordinate while coding, testing, and documentation move to specialists.",
            "Tasks reach a matching context while the lead keeps a coordination and delivery view.",
            "Jarvis decomposes, assigns, and converges work. Coder, tester, and editor execute inside their own workspaces.",
            "More agents amplify routing mistakes and duplicated context. Decision ownership must stay explicit.",
            "Good for clear, verifiable work. Tightly coupled or rapidly alternating work is often better in one agent."
          ],
          [
            "feishu",
            "Feishu routing across four accounts",
            "Use separate Feishu accounts and bindings to send work to the matching specialist.",
            "Each entry resolves to a defined agent, while groups only respond to allowed mention-gated messages.",
            "The channel uses WebSocket with default, coder, tester, and editor accounts. DMs use pairing and groups use allowlists plus mention gating.",
            "A live channel does not prove routing is correct. Accounts, bindings, agents, and models must be checked layer by layer.",
            "Useful for controlled personal or team ingress. Unknown DMs and unauthorized groups should not receive agent access."
          ],
          [
            "skills",
            "Skill installation and governance",
            "Expand agent capability without dropping unreviewed scripts directly into a workspace.",
            "Only skills that pass review, configuration, and testing remain available.",
            "Files and scripts are inspected before installation. Configuration and real calls are verified afterwards, with local usage rules captured in the workspace.",
            "More skills do not automatically mean more capability. Duplicate, conflicting, or untested skills add maintenance and security risk.",
            "Good for reviewable and reversible extensions. External accounts, system changes, or public actions need separate approval."
          ],
          [
            "memory",
            "Memory consolidation and long-term context",
            "Let agents retain preferences, mistakes, project context, and long-running task clues across sessions.",
            "Short-term notes, long-term memory, and enhanced retrieval have separate jobs, so important lessons survive a single conversation.",
            "Session-memory preserves continuity, daily files capture raw notes, and MEMORY.md holds distilled conclusions. Memory-lancedb-pro is the enhanced vector retrieval path.",
            "Memory must separate facts, preferences, and guesses. Otherwise an error can be amplified for months.",
            "Automated memory suits low-risk knowledge capture. Credentials, private data, and unconfirmed judgments do not belong in public or long-term memory."
          ]
        ]
      },
      "scenarios": {
        "title": "My Scenarios",
        "subtitle": "Where OpenClaw runs inside a real daily routine: a scheduled wake-up, local files, external APIs, and the result landing in the chat tool already in use.",
        "pushTitle": "Daily push: from cron to Feishu",
        "pushDesc": "One cron job wakes the main agent at 07:00 to run a script in the workspace: read the day's study plan, check the weather and watched repositories, scrape news with history de-duplication, then post a single rich-text Feishu message. The chain runs unattended, and the agent only leaves a log when the script fails.",
        "pushShotAlt": "A daily push message received in Feishu, covering calendar, weather, study tasks, practice tasks, and today's news.",
        "pushShotCaption": "The message that actually arrives at 07:00: calendar, weather, study and practice tasks, today's news, and a closing line.",
        "pushJobTitle": "cron/jobs.json (path and chat id elided)",
        "pushScriptTitle": "daily_push_cron.py (excerpt)",
        "pushNote": "The schedule only wakes and delivers; every piece of content comes from the script. Changing the delivery target means changing the app ID and chat id together."
      },
      "maintenance": {
        "title": "Maintenance",
        "subtitle": "Repeatable maintenance for Gateway health, Feishu connectivity, configuration changes, memory backups, and updates.",
        "cadence": [
          [
            "Before use",
            "Check the Gateway, health state, and Feishu connection to confirm the main entry works."
          ],
          [
            "Weekly memory work",
            "Consolidate daily notes from late Sunday into MEMORY.md, including errors and durable decisions."
          ],
          [
            "Workspace cleanup",
            "Move task outputs into outcomes and remove temporary or duplicate files."
          ],
          [
            "Before update",
            "Confirm config backups, memory export, and rollback options before previewing the OpenClaw update."
          ]
        ],
        "incidentsTitle": "Troubleshooting map",
        "incidentsDesc": "Identify whether the problem is in the Gateway, channel, routing, or model layer before reinstalling or rewriting config.",
        "tableLabels": [
          "Symptom",
          "Check",
          "Action"
        ],
        "incidents": [
          [
            "Gateway unavailable",
            "openclaw gateway status",
            "Check the service, bind address, token, and config validation result."
          ],
          [
            "Feishu has no reply",
            "logs / dashboard",
            "Check account connection, pairing, group allowlist, mention gate, and binding."
          ],
          [
            "Wrong agent route",
            "config get bindings",
            "Confirm the Feishu account to agentId mapping, then inspect the matching workspace."
          ],
          [
            "Repeated model failures",
            "openclaw health",
            "Check the provider, primary model, fallback chain, and credential availability."
          ]
        ],
        "commandsTitle": "Maintenance commands",
        "commandsLabel": "Check, diagnose, and update",
        "memoryTitle": "Memory maintenance",
        "memoryLabel": "Export and memory repository",
        "security": "Keep the Gateway on loopback with token auth. Prefer Tailscale, a VPN, or SSH for remote access, and regularly review paired devices, group allowlists, skill sources, and agent tool permissions.",
        "source": "Maintenance follows the OpenClaw Updating, Doctor, Security, Memory, and Gateway runbook documentation."
      }
    },
    "shared": {
      "ui": {
        "openImage": "View larger image",
        "close": "Close",
        "closeNavigation": "Close navigation"
      },
      "notFound": {
        "eyebrow": "404 / Page Not Found",
        "title": "There is nothing to read here.",
        "description": "The page may have moved, been removed, or the link may be incorrect.",
        "home": "Back Home",
        "practice": "Browse Practice",
        "blog": "Read the Blog"
      },
      "meta": {
        "title": "ZHANG.LOG | Personal Site",
        "description": "Zhang's personal site - notes on technology, life, and AI agents."
      },
      "pagination": {
        "nav": "Pagination",
        "previous": "Previous page",
        "next": "Next page"
      },
      "code": {
        "copy": "Copy",
        "copied": "Copied"
      },
      "footer": {
        "copyright": "© 2026 Jiaqi Zhang's Personal Site",
        "social": {
          "email": "Email",
          "github": "GitHub",
          "website": "Juejin"
        }
      }
    }
};

const CONTENT = { cn: cnContent, en: enContent } as const;

function flattenValue(prefix: string, value: unknown, result: Record<string, string>) {
  if (typeof value === 'string') {
    result[prefix] = value;
    return;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return;
  const record = value as Record<string, unknown>;
  if (typeof record.label === 'string') result[prefix] = record.label;
  for (const [key, child] of Object.entries(record)) {
    if (key === 'label') continue;
    flattenValue(prefix ? `${prefix}.${key}` : key, child, result);
  }
}

function flattenPageTree(tree: any) {
  const result: Record<string, string> = {};
  flattenValue('nav', tree.nav, result);
  const { hero, stats, projects, cta, ...homeRest } = tree.home;
  flattenValue('home', homeRest, result);
  flattenValue('hero', hero, result);
  flattenValue('stats', stats, result);
  flattenValue('projects', projects, result);
  flattenValue('cta', cta, result);
  flattenValue('practice', tree.practice.practice ?? {}, result);
  flattenValue('list', tree.practice.list, result);
  flattenValue('blog', tree.blogs.blog ?? {}, result);
  flattenValue('about', tree.about, result);
  flattenValue('agents', tree.agents, result);
  flattenValue('ui', tree.shared.ui, result);
  flattenValue('notFound', tree.shared.notFound, result);
  flattenValue('meta', tree.shared.meta, result);
  flattenValue('pagination', tree.shared.pagination, result);
  flattenValue('code', tree.shared.code, result);
  flattenValue('footer', tree.shared.footer, result);
  return result;
}

const translations = {
  cn: flattenPageTree(CONTENT.cn),
  en: flattenPageTree(CONTENT.en),
};

export type Dictionary = Record<string, string>;

export function getDictionary(lang: Language): Dictionary {
  return translations[lang];
}

export function getOpenClawContent(lang: string) {
  return lang === 'en' ? CONTENT.en.openclaw : CONTENT.cn.openclaw;
}
