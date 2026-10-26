# ZHANG.LOG

Zhang（张）的个人作品集网站 —— 一名大学生开发者的数字名片与内容主页。

深色主题，中英双语，内容由 MDX 驱动。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Next.js 16（App Router） |
| UI | React 19 + TypeScript |
| 样式 | Tailwind CSS v4 |
| 动画 | framer-motion（motion/react） |
| 内容 | MDX + @next/mdx（mdxRs 编译器） |
| 图标 | lucide-react |

## 特性

- **中英双语**：通过 URL 语言段 `/cn`、`/en` 支持，全站按语言静态预渲染
- **内容驱动**：博客文章与项目全部由 `content/` 下的 MDX 编写，脚本自动生成数据
- **深色主题**：以 Lobster 橙为主色、青色点缀的暗色设计
- **动效**：Hero Z 形背景、仪表盘终端动效等使用 framer-motion 过渡动画
- **博客分类筛选**：文章列表带可用的分类筛选标签页
- **列表筛选与排序**：博客和项目列表支持关键词搜索、标签/分类筛选和多种排序方式
- **标签本地化**：中文页面翻译语义标签，AI、Go、TypeScript 等技术名词保留原文
- **长文目录**：正文自动生成章节目录、标题锚点和当前章节高亮；桌面为右侧 sticky 目录，小屏为右侧刻度条 + 底部抽屉（实践详情与 OpenClaw 文档页共用）
- **全站惯性滚动**：Lenis 始终启用惯性滚动，章节跳转可以立即打断当前滚动
- **本地图片资源**：博客、项目封面和头像统一使用 `public/images/` 下的本地资源
- **移动端信息密度**：间距、卡片内边距与字号以小屏为基准（`p-4 md:p-6` 式写法），表格与代码块在小屏降到 12px 并铺满正文宽度
- **正文排版**：段落默认首行缩进 2 字符，可用 `<Indent>` / `<NoIndent>` 逐段覆盖
- **边框高光卡片**：主要内容卡片使用主题橙色边缘高光增强层次感
- **响应式仪表盘**：大屏显示终端风格状态面板，小屏自动隐藏

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（http://localhost:3000）
npm run dev

# 生成内容数据（改动 content/ 后必须先执行）
npm run generate

# 生产构建（不会自动生成内容数据，先跑上面的 generate）
npm run build

# 启动生产服务器
npm start

# 类型检查（lint 脚本内容就是 tsc --noEmit）
npm run lint
```

## 添加内容

所有内容以 MDX 形式保存在 `content/` 目录，是内容的唯一入口。新增文章或项目：

1. 在 `content/blog/`（文章）或 `content/practice/`（实践）中创建带 YAML frontmatter 的 MDX 文件
2. 运行 `npm run generate` 重新生成内容数据
3. 下次构建时页面会自动拾取，无需其他接线

**博客 frontmatter 字段：** `slug`、`title`、`date`、`category`、`image`、`tags`

**实践 frontmatter 字段：** `slug`、`title`、`date`、`readTime`、`image`、`icon`、`tags`、`scenario`、`featured`

图片资源约定：博客图片放在 `public/images/blogs/<slug>.png`，实践图片放在
`public/images/practice/<slug>.png`，头像使用 `public/images/avatars/avatar.png`。
内容生成脚本会根据 slug 自动写入相对地址，新增或替换图片后运行 `npm run generate`。

项目详情页的目录由正文中的 `h2` / `h3` 自动生成，不需要手工维护导航链接。MDX
标题会自动获得锚点，目录会根据滚动位置高亮当前章节。

## 项目文件结构

```text
zhang.log/
├── app/                          # App Router 路由与页面
│   ├── [lang]/                   # 语言段（cn / en），所有页面按语言静态预渲染
│   │   ├── layout.tsx            # 根布局（generateStaticParams 返回两种语言）
│   │   ├── page.tsx              # 首页：Hero + 精选实践 bento 网格 + 最新文章
│   │   ├── HomeClient.tsx        # 首页动画客户端组件（'use client'）
│   │   ├── about/                # 关于页
│   │   │   ├── page.tsx
│   │   │   └── AboutClient.tsx
│   │   ├── agents/               # 我的 Agents 页（Agent 方法、技能与边界）
│   │   │   ├── page.tsx
│   │   │   └── AgentsClient.tsx
│   │   ├── blogs/                # 博客页面路由
│   │   │   ├── page.tsx          # 文章列表（分类筛选标签页）
│   │   │   ├── BlogClient.tsx
│   │   │   └── [slug]/page.tsx   # 文章详情（generateStaticParams）
│   │   ├── practice/             # 实践列表页路由
│   │   │   ├── page.tsx          # 实践列表（搜索 / 筛选 / 排序 / 分页）
│   │   │   ├── PracticeClient.tsx
│   │   │   └── [slug]/page.tsx   # 实践详情（generateStaticParams）
│   │   └── openclaw/             # OpenClaw 网关文档页
│   │       ├── page.tsx
│   │       ├── OpenClawClient.tsx
│   │       └── sections/         # 章节组件（蓝图 / 结构 / 快速开始 / 配置 / 经验 / 维护）
│   ├── globals.css               # 全局样式与 Tailwind v4 主题色
│   ├── mdx.d.ts                  # MDX 模块类型声明
│   └── icon.png                  # 站点图标
├── components/                   # 共享组件
│   ├── BackToTop.tsx             # 回到顶部按钮
│   ├── CodeBlock.tsx             # 代码块（语言标签、复制按钮）
│   ├── Footer.tsx
│   ├── ImageLightbox.tsx         # 正文图片灯箱
│   ├── ListFilters.tsx           # 列表搜索、筛选和排序
│   ├── Navbar.tsx
│   ├── Pagination.tsx            # 列表分页（页码窗口、当前页/收拢省略号）
│   ├── ParallaxImage.tsx         # 视差图片（滚动上浮/下沉、防露底板）
│   ├── ParallaxSection.tsx       # 贯穿视差容器（滚动整段浮动）
│   ├── PracticeIcon.tsx          # frontmatter icon 值 → lucide 图标
│   ├── PracticeTableOfContents.tsx # 长文自动目录（实践详情 + OpenClaw 页共用）
│   ├── SmoothScroll.tsx          # Lenis 惯性滚动
│   ├── ZoomableImage.tsx         # 可缩放正文图片
│   └── useSectionScrollSpy.ts    # 目录章节滚动监听 hook
├── content/                      # 内容源（MDX / Markdown，唯一内容入口）
│   ├── agents/                   # Agent 方法与边界（global-agents.md + 英文 sidecar）
│   ├── blog/                     # 博客文章（主稿 + .en.mdx sidecar）
│   └── practice/                 # 实践（主稿 + .en.mdx sidecar，YAML frontmatter 驱动）
├── docs/                         # 设计与规范文档
│   └── mdx-spec.md               # MDX 编写规范
├── lib/                          # 数据与业务逻辑
│   ├── content.ts                # 内容读取接口（导入 content-data.json）
│   ├── i18n.ts                   # 中英文案（cnContent / enContent）
│   ├── i18n-context.tsx          # 共享组件的客户端语言上下文
│   ├── scenarios.ts              # 实践场景 key 的唯一来源
│   ├── tag-display.ts            # 标签展示语言映射
│   ├── mdx-registry.ts           # 生成：中英文 MDX 正文静态导入注册表
│   ├── use-parallax.ts           # 视差数值 hook（供 ParallaxImage / Section 用）
│   ├── utils.ts                  # cn() 工具（clsx + tailwind-merge）
│   ├── data/content-data.json    # 生成：内容元数据
│   └── generated/                # 生成：去除 frontmatter 的中英文 MDX 正文副本
│       ├── blog/
│       └── practice/
├── scripts/
│   └── generate-content-data.js  # 生成内容数据（JSON + registry + 干净正文）
├── public/
│   ├── images/                   # 本地图片资源
│   │   ├── avatars/              # 作者头像
│   │   ├── backgrounds/          # 背景素材
│   │   ├── blogs/                # 博客封面，按 slug 命名
│   │   ├── icons/                # 站点图标
│   │   ├── method/               # 方法卡配图
│   │   ├── practice/             # 实践封面，按 slug 命名
│   │   └── openclaw_map.png      # OpenClaw 结构图
│   └── videos/                   # 视频资源（home_video.mp4）
├── DESIGN.md                     # 视觉设计系统规范（Google Stitch design.md 格式）
├── AGENTS.md         # 给编码 Agent 的行为准则
├── proxy.ts                      # 路由中间件（非语言路径重定向到 /cn）
├── mdx-components.tsx            # MDX 渲染组件映射
├── next.config.ts                # Next.js 配置（mdxRs、远程图片白名单）
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

> 标注「生成」的文件由 `npm run generate` 产出，已提交到仓库，请勿手工编辑。

## 国际化

所有 UI 文案集中在 [lib/i18n.ts](lib/i18n.ts) 的 `cnContent` / `enContent` 中，英文结构由 `Widen` 类型约束，缺键或多余键都会在 `tsc` 阶段报错。文章与提示词使用同名 `.en.mdx` / `.en.md` sidecar：生成器只读取需要翻译的元信息字段（博客 `title`；实践 `title` / `readTime` / `scenario`），日期、封面、tags、icon、featured 等共享字段继续以中文主稿为准；英文正文缺失时回退中文。新增 UI 文案时需在 `cnContent` 和 `enContent` 同步添加同一个键。
