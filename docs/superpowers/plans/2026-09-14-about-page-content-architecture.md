# 关于页内容架构升级实施方案

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把“关于我”页面升级为完整、可信、可参与修改的个人叙事页，依次回答“我是谁、为什么做这些、能做什么、如何成长、我关注什么、如何联系我”。

**Architecture:** 保留现有头像、深色视觉、Lobster 橙主色和 Motion 动效，不新增实践切片。页面继续由 `AboutClient.tsx` 编排；中英文内容统一维护在 `lib/i18n.ts`。数字统计改为工作流程，工具不再作为能力主叙事，能力地图第三列改为“管理与方法”，时间线改为阶段式成长轨迹，兴趣探索保留原名并增强内容，“联系我”回跳页面顶部个人名片。

**Tech Stack:** Next.js 16.3.1、React 19、TypeScript 7、Tailwind CSS 4、Motion 12、lucide-react、现有 i18n 字典。

**Spec:** 本文件同时作为设计说明和实施方案。执行前先确认“A. 已确认内容要求”，后续任务以 A 区为唯一内容来源。

## Global Constraints

- 只修改 `app/[lang]/about/AboutClient.tsx` 和 `lib/i18n.ts`。
- 不修改 `app/[lang]/about/page.tsx`，不读取或展示实践项目，不新增“实践切片”。
- 保留 `text-indent: 2em`，确保“关于我”仍是一段完整正文。
- 保留现有头像、社交链接、深色主题、Lobster 橙主色和 Motion 动效语言。
- 所有新增内容必须同时补齐中文和英文，不允许只改一侧。
- 删除不再使用的数字统计、CountUp 逻辑、独立工具箱和旧技能字段。
- 不引入新依赖，不新建 CMS，不扩展为后台或管理界面。
- 当前工作区存在用户未提交改动。禁止使用 `git add -A`、`git reset --hard` 或提交全部改动；除非用户明确要求，否则不创建提交。
- 现有页面和源码均为 UTF-8，中英文文案允许使用中文和常规标点。

---

## A. 已确认内容要求

### A1. 页面定位

- [x] 综合型：兼顾个人介绍、能力展示、成长轨迹、兴趣探索和联系入口
- [ ] 求职型：更强调技能、经历和可验证结果
- [ ] 合作型：更强调可合作方向、工作方式和联系方式
- [ ] 内容型：更强调个人观点、学习过程和文章入口

### A2. 页面顺序

- [x] 个人名片 → 关于我 → 工作方式 → 能力地图 → 成长轨迹 → 兴趣与探索 → 合作邀请
- [ ] 个人名片 → 关于我 → 能力地图 → 成长轨迹 → 兴趣与探索 → 合作邀请
- [ ] 个人名片 → 关于我 → 成长轨迹 → 能力地图 → 兴趣与探索 → 合作邀请

“工作方式”属于“关于我”内容区内部，不单独计入一级区块顺序。

### A3. 内容保留与设计决策

| 模块 | 已确认要求 | 实施方案 |
| --- | --- | --- |
| 个人头像与姓名 | 保留 | 继续作为首屏视觉锚点 |
| 当前位置 | 保留 | 与“当前关注方向”并排展示 |
| 邮箱、GitHub、掘金 | 保留 | 继续使用现有社交入口 |
| 数字统计 | 真实数据不足，不能使用虚假数字 | 删除 `3+ / 20+ / 5+ / 10+`，改成“明确问题 → 设计施工图 → Agent 协同执行 → 验证并交付” |
| 管理能力 | Agent 编程中人从技术使用者转为管理者，需要体现管理才能 | 删除独立工具箱面板，第三列改为“管理与方法”，突出目标定义、任务拆解、Agent 编排、上下文管理和质量验收；工具只作为执行资源 |
| 时间线 | 原内容太浅，需要体现重要节点 | 改为四个阶段：认知建立、系统设计、完整交付、持续探索；每阶段增加获得与改变 |
| 兴趣与探索 | 保留名称“兴趣与探索” | 内容升级为 AI 智能体、Agent 工程化、氛围编程、个人助理 Agent |
| 最终 CTA | “联系我”回到关于页顶部名片 | 按钮改为 `href="#about-hero"`，在首屏增加滚动锚点 |
| 实践切片 | 不加入 | 不读取实践数据，不修改 About 服务端页面，不新增实践卡片 |

### A4. 最终中文文案

**个人名片**

- 姓名：`张`
- 身份：`数据科学与大数据技术专业`
- 一句话定位：`用 Agent 把想法快速产出原型。`
- 当前坐标：`关注 AI / Agent 前沿应用`
- 地点：`江西, 中国`

**关于我**

`一个喜欢动手操作的大学生，完美主义追求者，任务结果追求最好。熟练使用 Agent 类工具，如：Claude Code、Codex、Trae等。善于设计提示词、向 Agent 正向描述需求，以及预期结果等，善于统筹规划 Agent “施工图纸”。明确 Agent 工具的作用与重要性，如：MCP，CLI，RAG知识库等。拥有一套自己的完整的 Agent 协作代码开发系统。对于 Agent 感到新鲜，尤其是对于像 OpenClaw 这种私人定制化的、类个人电子助理的 Agent 发展和未来个人助手的实现充满期待！AI 从只有大脑到长出四肢干实事正越来越近。`

**工作方式**

- 标题：`我的工作方式`
- 说明：`不用无法验证的数字定义自己，用一套稳定流程说明如何把想法推进到结果。`
- 01：`明确问题`；`先确认目标、边界和验收标准，避免在错误方向上加速。`
- 02：`设计施工图`；`把需求拆成任务、依赖和预期结果，为 Agent 提供清晰上下文。`
- 03：`Agent 协同执行`；`按任务调用合适的模型、工具与子 Agent，过程中持续校准方向。`
- 04：`验证并交付`；`检查代码、页面与结果，保留证据，再继续迭代。`

**能力地图**

- 标题：`能力地图`
- 说明：`以目标、任务、Agent 和验收为管理核心；工具只是执行资源，不定义我的角色。`
- 关注方向：`AI 智能体 / 前端体验 / 氛围编程`
- 我能交付：`想法原型 / 相应 Agent 工作流`
- 管理与方法：`目标定义 / 需求澄清 / 验收标准`、`任务拆解 / Agent 分工 / 上下文编排`、`过程审查 / 质量验证 / 持续迭代`

**成长轨迹**

- 标题：`成长轨迹`
- 阶段 01：`建立 Agent 协作认知`；`不再把 Agent 当作单次问答或代码补全，而是开始关注上下文、工具调用与任务拆解。`；获得：`从零散使用走向有意识协作`
- 阶段 02：`设计自己的 Agent 协作系统`；`围绕 MCP、CLI、RAG 知识库和提示词组织任务，把需求转化为可执行的“施工图纸”。`；获得：`让 Agent 围绕目标持续协作，而不是只完成零散步骤`
- 阶段 03：`统筹一次完整项目交付`；`从定位、内容架构到页面实现和验收，统筹 Agent 完成个人网站这一真实项目。`；获得：`打通从想法、设计、开发到验证的交付链路`
- 阶段 04：`从完成项目转向持续探索`；`记录可复用方法，并继续探索 OpenClaw、个人助理和多 Agent 协作。`；获得：`构建可长期演进的个人 Agent 系统`

**兴趣与探索**

- 标题：`兴趣与探索`
- AI 智能体：`关注多 Agent 协作、工具调用、任务分解与结果验证，研究 Agent 如何真正承接完整工作流。`
- Agent 工程化：`持续理解 MCP、CLI、RAG 知识库和上下文管理，把提示词、工具与流程组合成稳定系统。`
- 氛围编程：`关注视觉层级、响应式布局和微交互，让 Agent 产出的页面不只是可用，也有完整体验。`
- 个人助理 Agent：`探索私人定制化的长期运行 Agent，以及从“会回答”走向“能做事”的个人助手形态。`

**合作邀请**

- 标题：`有想法？来聊聊`
- 说明：`交流技术、合作小项目，或者单纯聊聊 AI，都欢迎。`
- 适合合作：`Agent 工作流 / AI 应用原型 / 前端体验 / 内容型站点`
- 工作方式：`先明确问题 → 小步验证 → 保留证据 → 交付可运行结果`
- 主按钮：`联系我`，点击滚动到 `#about-hero`
- 次按钮：`先看看我的实践`

---

## B. 最终页面结构

```text
关于页
├── 1. 个人名片
│   ├── 头像
│   ├── 姓名与专业
│   ├── 一句话定位
│   ├── 当前关注方向与地点
│   └── 社交入口
├── 2. 关于我
│   ├── 单段正文
│   └── 我的工作方式
├── 3. 能力地图
│   ├── 关注方向
│   ├── 我能交付
│   └── 管理与方法
├── 4. 成长轨迹
│   └── 四个阶段的事件、变化与获得
├── 5. 兴趣与探索
│   └── 四个方向的当前关注点
└── 6. 合作邀请
    ├── 适合合作方向
    ├── 工作方式
    ├── 联系我
    └── 查看实践
```

| 层级 | 访客问题 | 页面职责 |
| --- | --- | --- |
| 个人名片 | 你是谁？ | 建立身份和当前方向 |
| 关于我 | 你为什么做这些？ | 解释动机、Agent 协作能力和长期方向 |
| 工作方式 | 你如何推进任务？ | 用稳定流程替代不可验证的数字 |
| 能力地图 | 你能做什么？ | 区分关注方向、交付能力和管理能力 |
| 成长轨迹 | 你如何走到这里？ | 展示阶段变化，而不是只列年份 |
| 兴趣与探索 | 你关注什么？ | 呈现 AI Agent 相关的探索方向 |
| 合作邀请 | 如何联系你？ | 回到名片并进入实践内容 |

## C. 文件职责

| 文件 | 职责 | 计划改动 |
| --- | --- | --- |
| `app/[lang]/about/AboutClient.tsx` | 页面结构、数据数组和交互 | 重构名片、工作方式、能力地图、成长轨迹和 CTA |
| `lib/i18n.ts` | 中英文内容 | 更新全部关于页字段，删除旧统计、技能和工具箱字段 |
| `app/[lang]/about/page.tsx` | 服务端渲染入口 | 不修改 |
| `lib/content.ts` | 实践数据接口 | 不修改 |
| `components/ParallaxSection.tsx` | 页面滚动容器 | 不修改 |

---

## D. 分阶段实施任务

### Task 1：更新关于页内容字段

**Files:**

- Modify: `lib/i18n.ts`

**Interfaces:**

- Consumes: 现有 `translations.cn` 与 `translations.en`
- Produces: `about.title`、`about.tagline`、`about.current`、`about.workflow.*`、`about.capabilities.*`、`about.timeline.eN.takeaway`、`about.exploration.*`、`about.cta.fit`、`about.cta.work`

- [ ] **Step 1: 确认旧字段仍存在**

Run:

```powershell
rg -n "about\.stats|about\.toolbox|about\.skills" lib/i18n.ts
```

Expected: 返回现有旧字段。

- [ ] **Step 2: 更新中文字典的名片、关于我和工作方式**

```ts
'about.title': '数据科学与大数据技术专业',
'about.location': '江西, 中国',
'about.tagline': '用 Agent 把想法快速产出原型。',
'about.current': '关注 AI / Agent 前沿应用',
'about.me.title': '关于我',
'about.me.paragraph': '一个喜欢动手操作的大学生，完美主义追求者，任务结果追求最好。熟练使用 Agent 类工具，如：Claude Code、Codex、Trae等。善于设计提示词、向 Agent 正向描述需求，以及预期结果等，善于统筹规划 Agent “施工图纸”。明确 Agent 工具的作用与重要性，如：MCP，CLI，RAG知识库等。拥有一套自己的完整的 Agent 协作代码开发系统。对于 Agent 感到新鲜，尤其是对于像 OpenClaw 这种私人定制化的、类个人电子助理的 Agent 发展和未来个人助手的实现充满期待！AI 从只有大脑到长出四肢干实事正越来越近。',
'about.workflow.title': '我的工作方式',
'about.workflow.subtitle': '不用无法验证的数字定义自己，用一套稳定流程说明如何把想法推进到结果。',
'about.workflow.step1.title': '明确问题',
'about.workflow.step1.desc': '先确认目标、边界和验收标准，避免在错误方向上加速。',
'about.workflow.step2.title': '设计施工图',
'about.workflow.step2.desc': '把需求拆成任务、依赖和预期结果，为 Agent 提供清晰上下文。',
'about.workflow.step3.title': 'Agent 协同执行',
'about.workflow.step3.desc': '按任务调用合适的模型、工具与子 Agent，过程中持续校准方向。',
'about.workflow.step4.title': '验证并交付',
'about.workflow.step4.desc': '检查代码、页面与结果，保留证据，再继续迭代。',
```

删除 `about.stats.*` 和 `about.toolbox.title`。

- [ ] **Step 3: 更新中文成长轨迹**

```ts
'about.timeline.title': '成长轨迹',
'about.timeline.e1.year': '阶段 01',
'about.timeline.e1.title': '建立 Agent 协作认知',
'about.timeline.e1.desc': '不再把 Agent 当作单次问答或代码补全，而是开始关注上下文、工具调用与任务拆解。',
'about.timeline.e1.takeaway': '从零散使用走向有意识协作',
'about.timeline.e2.year': '阶段 02',
'about.timeline.e2.title': '设计自己的 Agent 协作系统',
'about.timeline.e2.desc': '围绕 MCP、CLI、RAG 知识库和提示词组织任务，把需求转化为可执行的“施工图纸”。',
'about.timeline.e2.takeaway': '让 Agent 围绕目标持续协作，而不是只完成零散步骤',
'about.timeline.e3.year': '阶段 03',
'about.timeline.e3.title': '统筹一次完整项目交付',
'about.timeline.e3.desc': '从定位、内容架构到页面实现和验收，统筹 Agent 完成个人网站这一真实项目。',
'about.timeline.e3.takeaway': '打通从想法、设计、开发到验证的交付链路',
'about.timeline.e4.year': '阶段 04',
'about.timeline.e4.title': '从完成项目转向持续探索',
'about.timeline.e4.desc': '记录可复用方法，并继续探索 OpenClaw、个人助理和多 Agent 协作。',
'about.timeline.e4.takeaway': '构建可长期演进的个人 Agent 系统',
```

- [ ] **Step 4: 把旧技能字段改为中文能力地图**

```ts
'about.capabilities.title': '能力地图',
'about.capabilities.subtitle': '以目标、任务、Agent 和验收为管理核心；工具只是执行资源，不定义我的角色。',
'about.capabilities.direction.title': '关注方向',
'about.capabilities.direction.item1': 'AI 智能体',
'about.capabilities.direction.item2': '前端体验',
'about.capabilities.direction.item3': '氛围编程',
'about.capabilities.deliver.title': '我能交付',
'about.capabilities.deliver.item1': '想法原型',
'about.capabilities.deliver.item2': '相应 Agent 工作流',
'about.capabilities.management.title': '管理与方法',
'about.capabilities.management.item1': '目标定义 / 需求澄清 / 验收标准',
'about.capabilities.management.item2': '任务拆解 / Agent 分工 / 上下文编排',
'about.capabilities.management.item3': '过程审查 / 质量验证 / 持续迭代',
```

删除 `about.skills.*`。

- [ ] **Step 5: 更新中文兴趣与探索**

保留 `about.exploration.title: '兴趣与探索'`，更新四项：

```ts
'about.exploration.item1.title': 'AI 智能体',
'about.exploration.item1.desc': '关注多 Agent 协作、工具调用、任务分解与结果验证，研究 Agent 如何真正承接完整工作流。',
'about.exploration.item2.title': 'Agent 工程化',
'about.exploration.item2.desc': '持续理解 MCP、CLI、RAG 知识库和上下文管理，把提示词、工具与流程组合成稳定系统。',
'about.exploration.item3.title': '氛围编程',
'about.exploration.item3.desc': '关注视觉层级、响应式布局和微交互，让 Agent 产出的页面不只是可用，也有完整体验。',
'about.exploration.item4.title': '个人助理 Agent',
'about.exploration.item4.desc': '探索私人定制化的长期运行 Agent，以及从“会回答”走向“能做事”的个人助手形态。',
```

- [ ] **Step 6: 更新中文合作 CTA**

```ts
'about.cta.button': '联系我',
'about.cta.fit': '适合合作：Agent 工作流 / AI 应用原型 / 前端体验 / 内容型站点',
'about.cta.work': '工作方式：先明确问题 → 小步验证 → 保留证据 → 交付可运行结果',
'about.cta.secondary': '先看看我的实践',
```

- [ ] **Step 7: 在英文字典提供一一对应的内容键**

```ts
'about.title': 'Data Science and Big Data Technology',
'about.tagline': 'Turning ideas into prototypes quickly with agents.',
'about.current': 'Focused on frontier AI and agent applications',
'about.me.paragraph': 'A college student who enjoys hands-on work and pursues the best possible result. I work fluently with agent tools such as Claude Code, Codex, and Trae. I am good at designing prompts, describing requirements and expected outcomes to agents, and planning the "construction blueprint" for agent execution. I understand the role and importance of tools such as MCP, CLI, and RAG knowledge bases, and have built a complete agent-assisted software development workflow. Everything agentic still feels new to me, especially personally customized agents like OpenClaw and the future of personal assistants. AI is getting closer and closer to evolving from having only a "brain" to growing "limbs" and doing practical work.',
'about.workflow.title': 'How I Work',
'about.workflow.subtitle': 'Instead of unverified numbers, here is the process I use to move ideas into results.',
'about.workflow.step1.title': 'Define the Problem',
'about.workflow.step1.desc': 'Confirm the goal, boundaries, and acceptance criteria before moving in the wrong direction.',
'about.workflow.step2.title': 'Draw the Blueprint',
'about.workflow.step2.desc': 'Break requirements into tasks, dependencies, and expected outcomes with clear context for the agent.',
'about.workflow.step3.title': 'Execute with Agents',
'about.workflow.step3.desc': 'Use the right models, tools, and sub-agents for each task while continuously realigning the direction.',
'about.workflow.step4.title': 'Verify and Deliver',
'about.workflow.step4.desc': 'Check the code, interface, and outcome, keep the evidence, and iterate from there.',
'about.timeline.title': 'Growth Path',
'about.timeline.e1.year': 'Phase 01',
'about.timeline.e1.title': 'Building Agent Collaboration Awareness',
'about.timeline.e1.desc': 'I stopped treating agents as one-off Q&A tools or code completion and began focusing on context, tool use, and task decomposition.',
'about.timeline.e1.takeaway': 'Moving from scattered usage to deliberate collaboration',
'about.timeline.e2.year': 'Phase 02',
'about.timeline.e2.title': 'Designing My Agent Collaboration System',
'about.timeline.e2.desc': 'I organize tasks around MCP, CLI, RAG knowledge bases, and prompts, turning requirements into an executable blueprint for agents.',
'about.timeline.e2.takeaway': 'Keeping agents aligned with a goal instead of completing isolated steps',
'about.timeline.e3.year': 'Phase 03',
'about.timeline.e3.title': 'Leading a Complete Project Delivery',
'about.timeline.e3.desc': 'From positioning and content architecture to implementation and verification, I coordinated agents to deliver this real personal website.',
'about.timeline.e3.takeaway': 'Connecting the full path from idea and design to development and verification',
'about.timeline.e4.year': 'Phase 04',
'about.timeline.e4.title': 'Moving from Delivery to Continuous Exploration',
'about.timeline.e4.desc': 'I document reusable methods and continue exploring OpenClaw, personal assistants, and multi-agent collaboration.',
'about.timeline.e4.takeaway': 'Building a personal agent system that can evolve over time',
'about.capabilities.title': 'Capability Map',
'about.capabilities.subtitle': 'The core work is managing goals, tasks, agents, and acceptance criteria; tools are execution resources, not my identity.',
'about.capabilities.direction.title': 'Focus',
'about.capabilities.direction.item1': 'AI Agents',
'about.capabilities.direction.item2': 'Frontend Experience',
'about.capabilities.direction.item3': 'Vibe Coding',
'about.capabilities.deliver.title': 'Deliverables',
'about.capabilities.deliver.item1': 'Idea Prototypes',
'about.capabilities.deliver.item2': 'Matching Agent Workflows',
'about.capabilities.management.title': 'Management & Orchestration',
'about.capabilities.management.item1': 'Goal definition / requirement clarification / acceptance criteria',
'about.capabilities.management.item2': 'Task decomposition / agent assignment / context orchestration',
'about.capabilities.management.item3': 'Process review / quality verification / continuous iteration',
'about.exploration.title': 'Interests & Exploration',
'about.exploration.item1.title': 'AI Agents',
'about.exploration.item1.desc': 'Exploring multi-agent collaboration, tool calling, task decomposition, and result verification to understand how agents can own complete workflows.',
'about.exploration.item2.title': 'Agent Engineering',
'about.exploration.item2.desc': 'Learning how MCP, CLI, RAG knowledge bases, and context management combine prompts, tools, and workflows into stable systems.',
'about.exploration.item3.title': 'Vibe Coding',
'about.exploration.item3.desc': 'Focusing on visual hierarchy, responsive layout, and micro-interactions so agent-built pages feel complete instead of merely functional.',
'about.exploration.item4.title': 'Personal Assistant Agents',
'about.exploration.item4.desc': 'Exploring long-running, personally customized agents and the shift from assistants that answer to assistants that act.',
'about.cta.button': 'Contact Me',
'about.cta.fit': 'Good fit: Agent workflows / AI app prototypes / frontend experience / content sites',
'about.cta.work': 'How I work: define the problem → validate in small steps → keep evidence → ship a working result',
```

- [ ] **Step 8: 检查内容和类型**

```powershell
rg -n "about\.(title|tagline|current|me|workflow|capabilities|timeline|exploration|cta)" lib/i18n.ts
npm run lint
```

Expected: 中英文键数量一致，类型检查退出码为 0。

### Task 2：重构个人名片、关于我与工作方式

**Files:**

- Modify: `app/[lang]/about/AboutClient.tsx`

- [ ] **Step 1: 删除 CountUp 和数字统计**

删除 `CountUp`、`stats`，并从 `motion/react` 与 React 导入中移除 `animate`、`useInView`、`useEffect`、`useRef`、`useState`。

- [ ] **Step 2: 增加工作方式数据**

```tsx
const workflow = [1, 2, 3, 4].map((n) => ({
  step: String(n).padStart(2, '0'),
  title: t(`about.workflow.step${n}.title` as keyof Dictionary),
  desc: t(`about.workflow.step${n}.desc` as keyof Dictionary),
}));
```

- [ ] **Step 3: 在首屏 section 内增加锚点**

```tsx
<span id="about-hero" className="block scroll-mt-32"></span>
```

- [ ] **Step 4: 重写名片信息与单段正文**

名片展示 `about.title`、`about.tagline`、`about.location` 和 `about.current`。关于我继续使用：

```tsx
<p className="text-slate-300 text-lg leading-loose font-medium [text-indent:2em] mb-8">
  {t('about.me.paragraph')}
</p>
```

- [ ] **Step 5: 用工作方式替换统计卡片**

工作方式使用 `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`，每张卡展示 `step`、`title` 和 `desc`，继续使用 `motion.div` 与 `edge-lit-card`。

- [ ] **Step 6: 运行类型检查**

```powershell
npm run lint
```

Expected: PASS。

### Task 3：把技能区改为能力地图

**Files:**

- Modify: `app/[lang]/about/AboutClient.tsx`

- [ ] **Step 1: 删除独立工具箱**

删除 `toolbox` 数组和工具箱面板，不再单独渲染技术标签。

- [ ] **Step 2: 增加能力地图数据**

```tsx
const capabilities = [
  {
    icon: Sparkles,
    title: t('about.capabilities.direction.title'),
    items: [
      t('about.capabilities.direction.item1'),
      t('about.capabilities.direction.item2'),
      t('about.capabilities.direction.item3'),
    ],
  },
  {
    icon: Wrench,
    title: t('about.capabilities.deliver.title'),
    items: [
      t('about.capabilities.deliver.item1'),
      t('about.capabilities.deliver.item2'),
    ],
  },
  {
    icon: Code,
    title: t('about.capabilities.management.title'),
    items: [
      t('about.capabilities.management.item1'),
      t('about.capabilities.management.item2'),
      t('about.capabilities.management.item3'),
    ],
  },
];
```

如果 `Users` 不再使用，从 `lucide-react` 导入中删除。

- [ ] **Step 3: 用能力地图标题和说明替换旧技能标题**

```tsx
<SectionTitle>{t('about.capabilities.title')}</SectionTitle>
<p className="text-slate-400 text-base leading-relaxed mb-8">
  {t('about.capabilities.subtitle')}
</p>
```

- [ ] **Step 4: 删除旧字段引用并检查**

```powershell
rg -n "about\.skills|about\.toolbox|toolbox" app/[lang]/about/AboutClient.tsx lib/i18n.ts
```

Expected: 无输出。

### Task 4：将时间线升级为阶段式成长轨迹

**Files:**

- Modify: `app/[lang]/about/AboutClient.tsx`

- [ ] **Step 1: 扩展时间线映射**

```tsx
const timeline = [1, 2, 3, 4].map((n) => ({
  year: t(`about.timeline.e${n}.year` as keyof Dictionary),
  title: t(`about.timeline.e${n}.title` as keyof Dictionary),
  desc: t(`about.timeline.e${n}.desc` as keyof Dictionary),
  takeaway: t(`about.timeline.e${n}.takeaway` as keyof Dictionary),
}));
```

- [ ] **Step 2: 在描述下方增加获得与改变**

```tsx
<div className="mt-4 flex items-start gap-2 border-t border-white/5 pt-4">
  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lobster"></span>
  <p className="text-slate-300 text-sm font-medium leading-relaxed">{item.takeaway}</p>
</div>
```

- [ ] **Step 3: 检查中英文阶段完整**

```powershell
rg -n "about\.timeline\.e[1-4]\.(year|title|desc|takeaway)" lib/i18n.ts
```

Expected: 中英文各 16 条。

### Task 5：保留“兴趣与探索”并升级内容

**Files:**

- Modify: `lib/i18n.ts`

- [ ] **Step 1: 标题保持“兴趣与探索”**

中文为 `兴趣与探索`，英文为 `Interests & Exploration`。

- [ ] **Step 2: 使用 Task 1 的新四项内容替换旧方向**

组件结构保持不变，继续使用现有编号、图标和“探索中”状态。

- [ ] **Step 3: 检查旧方向已移除**

```powershell
rg -n "分布式系统|开源学习|Distributed Systems|Open Source Learning" lib/i18n.ts
```

Expected: 无输出。

### Task 6：完善合作邀请和“联系我”回跳

**Files:**

- Modify: `app/[lang]/about/AboutClient.tsx`

- [ ] **Step 1: 增加合作方向与工作方式**

```tsx
<div className="grid gap-2 text-sm text-slate-300 max-w-2xl mb-8 relative z-10">
  <p>{t('about.cta.fit')}</p>
  <p className="text-slate-500">{t('about.cta.work')}</p>
</div>
```

- [ ] **Step 2: 主按钮改为回跳锚点**

将 `href="mailto:aremeny888@163.com"` 改为 `href="#about-hero"`，将 `Mail` 图标改为 `ArrowUp`，文案保持 `t('about.cta.button')`。

- [ ] **Step 3: 次按钮保持不变**

继续链接到 `/${lang}/practice`。

- [ ] **Step 4: 运行类型检查**

```powershell
npm run lint
```

Expected: PASS。

### Task 7：完整构建与浏览器验收

- [ ] **Step 1: 运行生产构建**

```powershell
npm run build
```

Expected: `Compiled successfully`。

- [ ] **Step 2: 验证中文桌面页**

使用 Playwright CLI 打开 `http://localhost:3000/cn/about`，视口设为 `1365x900`，检查：

```json
{
  "hasRole": true,
  "hasTagline": true,
  "hasWorkflow": true,
  "hasCapabilities": true,
  "hasFakeStats": false,
  "contactHref": "#about-hero",
  "overflow": false
}
```

- [ ] **Step 3: 验证“联系我”回跳**

点击“联系我”后，`location.hash` 必须为 `#about-hero`，`scrollY` 接近页面顶部。

- [ ] **Step 4: 验证 390px 移动端**

视口为 `390x844` 时，`innerWidth` 与 `scrollWidth` 均为 `390`，工作方式和能力地图内容存在，控制台错误为 0。

- [ ] **Step 5: 验证英文页**

打开 `http://localhost:3000/en/about`，确认以下文本存在：

- `Data Science and Big Data Technology`
- `Draw the Blueprint`
- `Capability Map`
- `Growth Path`
- `Interests & Exploration`
- `Contact Me`

页面无横向溢出，控制台错误为 0。

---

## E. 最终验收标准

- [ ] 首屏显示姓名、专业、定位、当前关注方向和地点。
- [ ] 社交入口保持可用。
- [ ] “关于我”保持单段正文和 `2em` 首行缩进。
- [ ] 页面不再出现 `3+ / 20+ / 5+ / 10+` 等未验证数字。
- [ ] 工作方式展示四个连续步骤。
- [ ] 能力地图明确区分关注方向、可交付结果和管理能力。
- [ ] 原独立工具箱区域已删除，工具只作为执行资源，不进入能力主叙事。
- [ ] 成长轨迹使用四个阶段，并为每个阶段展示获得与改变。
- [ ] 探索区标题保持“兴趣与探索”。
- [ ] 探索内容为 AI 智能体、Agent 工程化、氛围编程、个人助理 Agent。
- [ ] “联系我”按钮滚动回 `#about-hero`。
- [ ] “先看看我的实践”继续进入实践页。
- [ ] 中文与英文键完全对应，页面切换语言无缺失文案。
- [ ] 桌面端 `1365px` 和移动端 `390px` 均无横向溢出。
- [ ] 浏览器控制台无错误。
- [ ] `npm run lint` 和 `npm run build` 均通过。
- [ ] 不修改或回退工作区内与本任务无关的既有改动。

## F. 推荐实施顺序

1. 完成 Task 1，锁定全部中英文内容字段。
2. 完成 Task 2，重构首屏、关于我和工作方式。
3. 完成 Task 3，把技能区改为能力地图。
4. 完成 Task 4、Task 5，升级成长轨迹和兴趣探索。
5. 完成 Task 6，接入“联系我”回跳。
6. 完成 Task 7，执行构建、桌面、移动端和英文页验证。
7. 最后逐项检查“E. 最终验收标准”，再决定是否提交。

## G. 方案自检

- 规格覆盖：个人名片、关于我、工作方式、能力地图、成长轨迹、兴趣与探索、合作邀请均有对应任务。
- 内容覆盖：A4 的全部中文文案均进入 Task 1，并有对应英文。
- 决策覆盖：数字统计、管理能力、时间线和 CTA 均按 A3 的新要求设计。
- 范围控制：没有实践切片、没有新增依赖、没有新建 CMS、没有修改服务端实践数据接口。
- 接口一致：组件只消费 `about.*` i18n 字段，不在组件内重复维护中英文长文案。
