---
version: alpha
name: ZHANG.LOG
description: 暗色编辑式个人实践站——近黑底、纸白大字、细规则线与克制的龙虾橙状态强调。
colors:
  ink: "#050505"
  surface: "#0b0b0b"
  paper: "#f1f1ee"
  fog: "#9b9b96"
  rule: "#262624"
  signal: "#ff5a24"
  secondary: "#2dd4bf"
typography:
  sans:
    fontFamily: Geist
    roles: body, headings, controls
  mono:
    fontFamily: Geist Mono
    roles: metadata, indexes, paths, code
  display:
    fontFamily: Geist
    fontSize: clamp(3.2rem, 7.2vw, 6.35rem)
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: -0.07em
  body:
    fontSize: 1rem
    lineHeight: 1.75
  label:
    fontSize: 0.625rem
    lineHeight: 1.4
    letterSpacing: 0.12em
rounded:
  panel: 8px
  sheet: 16px
  stage: 32px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
layout:
  contentMaxWidth: 1120px
  mobileGutter: 20px
  desktopGutter: 24px
  navHeight: 64px
  navHeightDesktop: 80px
components:
  navbar:
    backgroundColor: "rgba(5,5,5,0.88)"
    borderColor: "{colors.rule}"
    height: "{layout.navHeight}"
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: transparent
    borderColor: "{colors.rule}"
    rounded: "{rounded.pill}"
  index-row:
    borderColor: "{colors.rule}"
    backgroundColor: transparent
  code-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    typography: "{typography.mono}"
---

## Overview

ZHANG.LOG 是一份持续维护的个人实践日志，而不是套用作品集模板的营销页。视觉方向是“暗色编辑式工作台”：近黑画布承载纸白大字，细规则线组织信息，等宽字体标记时间、编号与路径，少量龙虾橙只在状态、强调和交互反馈中出现。

页面先讲正在做的事，再给出实践、方法、验证和文章。层级应来自留白、字号、字重和规则线，而不是大量玻璃卡片、渐变标题或装饰性图标。整体感觉应当冷静、直接、可检查，像一份被认真编排的工程记录。

首页用“想法 → Agent → 现实”的轨道图建立整站隐喻；实践与博客使用索引行而非同质卡片墙；详情页把长文、图片和目录组织成可持续阅读的坐标系。动效服务于叙事和反馈，不替代信息。

## Colors

- **Ink（#050505）：** 页面与导航的主背景，也是纸白组件上的反白文字色。
- **Surface（#0b0b0b）：** 代码块、媒体占位和信息面板的次级底色，与 Ink 只拉开一档。
- **Paper（#f1f1ee）：** 主标题、关键正文、主按钮底色和当前导航态。避免使用刺眼的纯白。
- **Fog（#9b9b96）：** 说明文字、元信息、未激活导航和次要操作。
- **Rule（#262624）：** 分隔线、描边、输入框边界和低层级容器。结构主要靠线，不靠重阴影。
- **Signal（#ff5a24）：** 错误、当前章节、编号、状态点和 hover 强调。它是定位色，不是大面积底色。
- **Secondary（#2dd4bf）：** 极少量状态或校验节点；不得与 Signal 争抢主次。

颜色优先级固定为 Ink / Paper / Fog / Rule，Signal 只占很小面积。渐变仅用于抽象轨道、图片遮罩和场景化动效，不用于普通文字卡片。

## Typography

- **正文 Sans：** Geist。正文常用 16px / 1.75，长文在桌面可放大到 `lg:prose-lg`；描述性文字用 Fog。
- **标题 Sans：** 仍使用 Geist，以 `font-medium` 和紧凑字距建立层级。首页主标题使用 `clamp(3.2rem, 7.2vw, 6.35rem)`、`line-height: 0.94`、`letter-spacing: -0.07em`。
- **Mono：** Geist Mono。用于日期、序号、路径、代码、状态和章节编号；不用于长段正文。
- **Label：** 10–12px 等宽大写或中文小标签，字距约 `0.12em`–`0.16em`，承担“记录数据”的异质感。
- **长文：** 标题最高 6 个字号层级；正文段落默认首行缩进 2 字符，列表项、表格单元格不缩进。可用 `<Indent n={N}>` / `<NoIndent>` 逐段覆盖。
- **小屏字级：** 依靠 `clamp()` 和 `md:` / `lg:` 断点调整，不缩放根字号。正文表格与代码块在小屏降到 12px。

## Layout

- **内容宽度：** 主内容最大宽度 `1120px`，左右留白移动端 20px、`sm:` 起 24px；长文正文列再收窄，避免宽幅直排。
- **导航：** 固定顶栏高 64px，`sm:` 起 80px。桌面链接居中，语言切换与 OpenClaw 入口靠右；移动端使用汉堡菜单。
- **首页：** 主标题与说明采用不对称 12 栏布局；板块垂直间距以 `py-16 md:py-24` 为主，局部叙事区可扩展到 `py-20 md:py-32`。
- **列表：** 实践和博客以规则线分隔的索引行呈现，不使用统一圆角卡片。实践桌面为 4/8 分栏图文行，博客为 2/7/2/1 的日期、标题、阅读时间和箭头结构。
- **详情：** OpenClaw 与实践详情在 `lg:` 使用 8/4 分栏：左侧正文，右侧 sticky 导航与相关内容；列表与首页封面按 16:9 裁切，详情头图以 `fit="contain"` 完整显示。新源图优先使用 16:9；`zhang.log.png` 是既有兼容特例。
- **断点：** 小屏基础值优先，`md = 768px`，`lg = 1024px`。移动端验收以 `360×800`、DPR 2 为硬性下限。
- **间距：** 4px 基础刻度；常用 `gap-4 md:gap-6`、`p-4 md:p-6`、`pt-28 sm:pt-36 lg:pt-40`。

## Components

- **navbar：** 全宽近黑半透明栏，底部一条 Rule；滚动向下隐藏、向上恢复。当前项用 Paper 与 Signal 小点表示，不使用大型悬浮胶囊。
- **button-primary：** Paper 实底胶囊 + Ink 文字，用于“查看实践”等高优先级入口；hover 变亮，不使用橙色铺底。
- **button-secondary：** 透明底 + Rule 描边胶囊，用于次级入口；hover 只提高边框和文字层级。
- **index-row：** 项目、博客和归档的主要列表单元。以 `border-t border-rule` 分隔，hover 让标题、箭头和局部底纹向 Signal 过渡；触屏使用 `:active` 提供即时按压反馈。
- **article-prose：** 实践与博客详情共用。H2 带章节编号和底部分隔线，H3 使用 Signal 左线；正文最大可读宽度随详情分栏收敛。
- **longform-nav：** 桌面显示完整 sticky 目录；小屏右侧显示刻度入口，点击后拉起底部抽屉。目录通过 portal 挂到 `body`，避免视差容器改变 fixed 定位参照。
- **code-block：** Geist Mono、Surface 底、语言标签与复制按钮；长行横向滚动，不手工折行。触屏设备让复制按钮常显。
- **media：** 本地资源优先，封面使用渐进模糊加载，正文图片支持灯箱与缩放。图片替代文本必须描述内容，不写文件名。
- **not-found：** 语言段内的未知路径与不存在的内容 slug 共用标题、说明、首页 / 实践 / 博客入口，并沿用 Navbar、Footer 与同一套暗色设计令牌。

## Motion

- 滚动惯性由 Lenis 提供；章节跳转需要立即打断惯性滚动，并保留可回访的 hash 锚点。
- 首屏轨道图表达“想法 → Agent → 现实”，底部 CTA 可在指针悬停或键盘聚焦时展开工作台场景。
- hover 只做小位移、边框提亮或颜色过渡；触屏通过 `:active` / `data-pressed` 给出反馈。
- 所有装饰动效必须支持 `prefers-reduced-motion: reduce`。动画不得遮挡正文、阻塞点击或改变布局尺寸。

## Quality Bar

- `360×800`、DPR 2 下页面 `scrollWidth ≤ 360`；宽表和长代码只在自身容器内横向滚动。
- 桌面与移动端都必须验证导航、列表筛选、分页、详情跳转、目录锚点、图片灯箱和回到顶部。
- 站内链接必须指向存在的路由、语言段和锚点；站外链接不得为空，必须指向有效目标，并明确是否新开窗口。
- 所有可交互元素要有可见焦点、可读标签和键盘操作；外链新开窗口时使用安全的 `rel`。
- 发布前执行内容生成、类型检查与生产构建，并同时检查中文与英文路由是否存在 404 或错误回退。

## Do's and Don'ts

**Do**

- 先用规则线、留白和字级建立结构，再考虑是否真的需要容器或阴影。
- 用 Signal 标记当前态、编号、状态点和少量关键动作。
- 优先使用真实内容密度组织页面；列表、表格和代码应能直接扫描。
- 保持移动端基础尺寸，再用 `md:` / `lg:` 恢复桌面尺度。
- 每次修改 UI 后同时检查桌面和小屏，至少覆盖 `360×800`。

**Don't**

- 不要把 Signal 铺成大面积背景，也不要用多套高饱和色并置。
- 不要恢复已淘汰的 Playfair Display、Inter、JetBrains Mono 字体组合描述。
- 不要把每个板块都包装成玻璃卡片；编辑式页面以规则线和非对称布局为主。
- 不要给纯展示面板添加橙色光晕、箭头或 hover 抬升，制造可点击错觉。
- 不要用缩放根字号实现小屏适配，也不要让页面主体产生横向溢出。
