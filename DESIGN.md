---
version: alpha
name: ZHANG.LOG
description: 深色主题的个人作品集内容站——Lobster 橙主色、青色点缀、交互卡与展示卡分层、MDX 驱动的阅读体验。
colors:
  primary: "#ff4500"
  secondary: "#2dd4bf"
  on-dark: "#f8fafc"
  background-dark: "#0a0a0a"
  surface: "#121212"
  muted: "#94a3b8"
typography:
  body:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.7
  display:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: 900
    lineHeight: 1.1
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 700
    letterSpacing: 0.2em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.85rem
rounded:
  chip: 16px
  card: 24px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
components:
  display-card:
    backgroundColor: "#0b0d0d"
    borderColor: "rgba(255,255,255,0.08)"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  interactive-card:
    backgroundColor: "#040707"
    borderColor: "rgba(255,255,255,0.16)"
    accent: "{colors.primary}"
    rounded: "{rounded.card}"
  card:
    backgroundColor: "{colors.background-dark}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
    typography: "{typography.body}"
  navbar:
    backgroundColor: "rgba(10,10,10,0.9)"
    rounded: "{rounded.pill}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    padding: "{spacing.sm}"
  chip:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xs}"
  badge:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  code-block:
    typography: "{typography.mono}"
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.chip}"
---

## Overview

深色主题的数字名片与内容引擎。它把博客、实践、关于页收进一条由 MDX 驱动的叙事线上，视觉上追求"高级感来自对比、节奏与留白，而非装饰堆砌"——冷峻的深色底、单一而强烈的暖橙强调、玻璃磨砂与边缘高光勾勒层级。

整体气质：一个运行在暗处、以技术编号与终端质感点缀的个人工作站。动效克制但无处不在（Lenis 惯性滚动、视差浮动、hover 微光）。

阅读体验：滚动与章节坐标系`lenis` 提供平滑滚动惯性，`useSectionScrollSpy` 与 `PracticeTableOfContents` 为长文建立章节坐标：右侧目录随阅读进度高亮，小屏收敛为一条波形刻度（点击展开底部抽屉目录；目录节点挂载到 `body`，避免被视差容器的 `transform` 改变 `fixed` 定位参照）。配合 `motion` 的区块过渡，方向是让滚动本身成为内容的一部分，为深技术长文提供导航、节奏与坐标感。

视觉语言：冷暖、对比与层级以"lobster"暖橙为强调色，深色底统一全站气质；rounded 卡片与 edge-lit 描边勾勒层级，粗字重标题建立视觉锚点。视觉不抢内容，而是服务于阅读与识别——高级感来自对比、节奏与留白，而非装饰的堆砌。

卡片语义必须与交互能力一致：可点击跳转或执行动作的卡片才使用 `edge-lit-card` 的玻璃突出色高光；仅用于展示信息的卡片使用 `display-card`，不得借用可点击卡片的橙色边角、光晕或悬浮提示。

## Colors

深色底 + 单一暖橙强调，青色只做极少量点缀。

- **Primary（#ff4500，Lobster 橙）：** 唯一驱动"互动"的颜色。用于 CTA、当前激活态、编号/序号、hover 变亮、强调下划线。**不要**用在大面积文字或整块背景——它是"聚光灯"，不是"墙面"。
- **Secondary（#2dd4bf，teal 青）：** 次级点缀，用于徽章、状态标记、少量渐变收尾。使用频率远低于主色，避免喧宾夺主。
- **Background-dark（#0a0a0a）：** 页面基底（项目强制深色）。表格/卡片内衬可用更深一档的 `surface`（#121212）。
- **On-dark（#f8fafc）与 muted（#94a3b8）：** 深底上的文字层级——正文用 on-dark，次要说明/描述用 muted，更弱的元信息退到 slate-600。
- **Border（rgba(255,255,255,0.08)）：** 分隔线、卡片描边。多个 border tone（0.05/0.1/0.2）区分层，但总体都极淡。

背景磨砂颗粒（body::before，opacity 0.03 的 SVG 噪点）只做背景肌理，绝不盖住前景图文。主色在深底上对比强烈（约 15:1），用于 CTA 非常醒目，但作为正文色时要注意不刺眼。

注意：CTA 白字（#f8fafc）on 主色（#ff4500）对比约 3.3:1，低于 WCAG AA 的 4.5:1——这是强引导短文本的取舍；若需严格合规，可加深按钮背景或改用更亮的 on-color。

## Typography

三套字体各司其职，标题靠"字重层级"而非"字体家族变化"建立视觉锚点：

- **Body（Inter）：** 正文字体，正文 1rem/1.7。描述性文字常降到 slate-500。
- **Display（Playfair Display）：** 衬线展示字体，用于大标题 / hero 强调。配合 `font-black`（900）建立层级；`tracking-tight` 收敛大字距，视觉更稳重。
- **Mono（JetBrains Mono）：** 技术语汇，专门用于代码块、编号（01—04）、终端风格状态面板、路径/文件名等，营造"工程系统"质感。
- **Label-caps：** 大量 `text-[10px] uppercase tracking-widest` 的小号大写标签，用于章节眉题、元信息行、统计标题，字距拉宽（0.2em）制造精致感。
- **正文缩进与小屏字号：** 文章正文段落首行缩进 2 字符（`.prose p { text-indent: 2em }`，2em 跟随字号；列表项内的段落与表格单元格不缩进），单段可用 `<Indent n={N}>` / `<NoIndent>` 覆盖。代码块与表格在小屏降到 0.75rem（12px），并铺满正文宽度。

## Layout

- **语言段路由** `app/[lang]`（cn / en）承载多语言，页面按语言静态预渲染；`generateStaticParams` 返回两语言。
- **卡片网格**：实践/博客列表用 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 的分栏网格；间距小屏 `gap-4`，`md:` 起 `gap-6`（1.5rem）。
- **详情分栏**：实践详情用 `grid-cols-12`——左侧 `col-span-8` 正文、右侧 `col-span-4` sticky 目录边栏。
- **间距基准** 4px（Tailwind 默认刻度），常用 `p-4 md:p-6`、`mb-8 md:mb-16`、`gap-4 md:gap-6`。
- **移动端优先（mobile-first）**：间距、内边距、圆角与字号一律以小屏（小于 768px）为基准值，用 `md:`（768px）恢复桌面值，例如 `p-4 md:p-6`、`rounded-2xl md:rounded-3xl`、`text-base md:text-lg`。需要连续变化的间距可用 `clamp()`；不要用缩放根字号来做紧凑——那会连带改变图标、头像和按钮尺寸。
- **可读宽度**：正文区维持 `max-w-4xl`/`max-w-2xl` 左右的窄列，避免长文宽直排。

## Elevation & Depth

深度主要由磨砂、描边、光晕与 inset 阴影营造，而非厚重投影：

- **玻璃磨砂**（backdrop-blur 16px + saturate 180%）：导航胶囊、浮动面板。
- **边缘高光**（edge-lit-card）：卡片用双背景（padding-box + border-box）叠出"上白下橙"的渐变描边，内嵌顶部 1px 亮线 + 底部暗线，营造轻浮雕。
- **展示卡**（display-card）：静态信息卡使用哑光石墨渐变底、低对比描边、右下渐隐点阵和顶部短刻度线；不出现橙色边角光、外发光、缩放或上浮，避免被误认为可点击入口。
- **inset 高光/阴影**：表面 1px 内高光（inset 0 1px 0 white/16）+ 底部暗线，替代大外投影。
- **Lobster 光晕**：激活项、CTA 用 `shadow-[0_0_10px_rgba(255,69,0,0.4)]` 类柔光，hover 时增强。hover 交互倾向 "上浮 + 位移 + 描边变亮"（如 `whileHover={{ x: 10 }}`、`group-hover:scale-110`）。

## Shapes

- **大圆角**：卡片 `rounded-3xl`（24px，小屏收敛为 `rounded-2xl` 16px）、图标容器 `rounded-2xl`（16px）、胶囊/导航/徽章 `rounded-full`——整体走"圆润 + 胶囊"路线。
- **细描边**：边框多用 `border-white/10` 之内的极淡浅色，弱化成内嵌结构线而不是封闭轮廓。
- **直线分割**：信息行用 `border-t border-white/10` 做硬分割，与圆软形体形成对比。

## Components

- **card（edge-lit-card）：** 列表卡片。`background-dark` 底 + 渐变描边 + 内嵌高光；内含图标容器（rounded-2xl + white/5 底）、小号大写标签、标题（hover 变 Lobster）、描述与元信息。
- **display-card：** 纯展示卡片。用于结构说明、配置摘要、经验案例等不可跳转内容；采用哑光石墨底、细点阵肌理、内嵌描边与顶部短刻度线，不设置橙色边角、外发光或 hover 抬升。
- **interactive-card（edge-lit-card）：** 仅用于可点击跳转或执行动作的卡片。可使用渐变描边、橙色边角、hover 提亮、位移与视觉反馈；不得用于纯信息展示。
- **navbar（glass-glow）：** 顶部居中的磨砂胶囊，滚动时隐藏/恢复；含语言切换（cn/en pill）、桌面链接 + 渐变 "我的 Agents" 按钮、移动端汉堡菜单（下拉时按钮保持可见）。
- **button-primary：** 橙→红渐变胶囊（`from-orange-500 to-red-500`），带 Lobster 光晕；仅用于强引导（如进入 Agents）。
- **chip：** 标签/分类徽章，`white/5` 底 + 大圆角 + 小号大写文字；用于顶部标签行、分类筛选按钮。
- **code-block：** 代码块，JetBrains Mono、深色曲面底、复制按钮；`[&_code]:font-mono` 强制等宽。小屏降为 0.75rem、内边距收敛，复制按钮在触屏（`pointer-coarse` / `max-sm`）常显——触屏没有 hover；长行横向滚动，不手工折行。
- **panel（display-panel）：** 信息/状态面板，浅渐变底 + 内嵌高光，可折叠（`[open]` 时背景提亮）。

## Do's and Don'ts

**Do**
- 用主色（Lobster 橙）只做强调、CTA、当前态、编号；其余交给中性灰阶。
- 深底为主时，文字层级用 on-dark / muted / slate-600 三级递进，保证可读对比。
- 圆角、描边、间距优先取 token 值（rounded.card/chiP/pill、spacing.*、colors.*），而非临时色值。
- 动效以"轻"为准：滚动/视差/光晕做氛围，不拖慢阅读；大标题用 font-black 建立锚点。
- 在实现卡片前先判断它是否可点击；展示型内容默认使用 `display-card`，只有真实交互入口才使用 `interactive-card` / `edge-lit-card`。

**Don't**
- 不要把 primary 铺成大面积背景或长段正文——会刺眼且失去"聚光灯"作用。
- 不要用多套高饱和色并置；secondary 只做极少量点缀。
- 不要在正文上方堆透明噪点或磨砂覆盖前景（body::before 固定 z-index: -1，别挪上来）。
- 不要用生硬纯白大字直排；长文必须收窄列宽。
- 不要给不可跳转、不可执行的展示卡片添加橙色边角光、玻璃悬浮、hover 抬升或箭头，以免暗示不存在的交互。
