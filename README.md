# ZHANG.LOG

Zhang（张）的个人作品集网站 —— 一名大学生开发者的数字名片与内容主页。

深色主题，中英双语，内容由 MDX 驱动。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Next.js 16（App Router） |
| UI | React 19 + TypeScript |
| 样式 | Tailwind CSS v4 |
| 动画 | motion（motion/react） |
| 内容 | MDX + @next/mdx（mdxRs 编译器） |
| 图标 | lucide-react |

## 特性

- **中英双语**：通过 URL 语言段 `/cn`、`/en` 支持；主要内容页按语言静态生成，未知路径由动态 catch-all 按需渲染
- **本地化 404**：未知路径与不存在的内容 slug 均返回 HTTP 404，并按中英文路由显示对应页面
- **内容驱动**：博客文章与项目全部由 `content/` 下的 MDX 编写，脚本自动生成数据
- **深色主题**：以 Ink / Paper 中性层级为基底，Signal 橙作状态强调，青绿色极少量点缀
- **动效**：首屏轨道图、项目索引反馈与底部 CTA 场景使用 motion 过渡动画
- **博客分类筛选**：文章列表带可用的分类筛选标签页
- **列表筛选与排序**：博客和项目列表支持关键词搜索、标签/分类筛选、多种排序方式与分页；搜索同时匹配原标签和本地化显示标签
- **空场景处理**：没有对应实践的场景卡不提供跳转，并显示“暂无项目 / No entries yet”
- **标签本地化**：英文页面把中文语义标签映射为英文，AI、Go、TypeScript 等技术名词保留原文
- **长文目录**：正文自动生成章节目录、标题锚点和当前章节高亮；桌面为右侧 sticky 目录，小屏为右侧刻度条 + 底部抽屉（实践详情与 OpenClaw 文档页共用）
- **全站惯性滚动**：Lenis 始终启用惯性滚动，章节跳转可以立即打断当前滚动
- **本地图片资源**：博客、项目封面和头像统一使用 `public/images/` 下的本地资源
- **移动端信息密度**：间距、内边距与字号以小屏为基准；正文表格与代码块在小屏降到 12px，宽表与长代码行使用横向滚动
- **正文排版**：段落默认首行缩进 2 字符，可用 `<Indent>` / `<NoIndent>` 逐段覆盖
- **编辑式层级**：以纸白大字、细规则线和留白组织内容，信号橙只用于状态、强调与交互反馈
- **渐进图片**：封面使用模糊占位与本地渐进加载，正文图片支持灯箱和缩放查看

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（http://localhost:3000）
npm run dev

# 生成内容数据（改动 content/ 后必须先执行）
npm run generate

# 生产构建（prebuild 会自动运行 generate）
npm run build

# 启动生产服务器
npm start

# 类型检查（lint 脚本内容就是 tsc --noEmit）
npm run lint
```

## 添加内容

所有内容以 MDX 形式保存在 `content/` 目录，是内容的唯一入口。新增文章或项目：

1. 在 `content/blog/`（文章）或 `content/practice/`（实践）中创建带受约束 frontmatter 的 MDX 文件
2. 运行 `npm run generate` 重新生成内容数据
3. 下次构建时页面会自动拾取，无需其他接线

**博客 frontmatter 字段：** `slug`、`title`、`date`、`readTime`、`category`、`image`、`tags`

**实践 frontmatter 字段：** `slug`、`title`、`date`、`readTime`、`image`、`icon`、`tags`、`scenario`、`featured`

frontmatter 由内容生成器按行解析，属于受约束的简化格式；字段顺序、数组与注释规则以
[docs/mdx-spec.md](docs/mdx-spec.md) 为准。
正文组件与渲染限制（如 `ExtLink`、`Indent` / `NoIndent`、原生 HTML 行为）同样以该规范为准。

图片资源约定：博客图片放在 `public/images/blogs/<slug>.png`，实践图片放在
`public/images/practice/<slug>.png`，头像使用 `public/images/avatars/avatar.png`。
内容生成脚本会根据 slug 自动写入相对地址，新增或替换图片后运行 `npm run generate`。

项目详情页的目录由正文中的 `h2` / `h3` 自动生成，不需要手工维护导航链接。MDX
标题会自动获得锚点，目录会根据滚动位置高亮当前章节。

## 项目文件结构

以下只列核心目录与入口文件，生成物统一放在 `lib/generated/` 和 `lib/data/` 中。

```text
zhang.log/
├── app/                          # App Router 路由与页面
│   ├── [lang]/                   # 语言段（cn / en），所有页面按语言静态预渲染
│   │   ├── layout.tsx            # 根布局、字体、导航、页脚与全局 Provider
│   │   ├── not-found.tsx         # 语言段内 notFound() 的本地化 404
│   │   ├── [...rest]/page.tsx    # 未匹配路径进入 notFound()，交给语言段 404
│   │   ├── page.tsx              # 首页数据装配
│   │   ├── HomeClient.tsx        # 首页视觉、轨道图和客户端交互
│   │   ├── about/                # 关于页
│   │   │   ├── page.tsx
│   │   │   └── AboutClient.tsx
│   │   ├── agents/page.tsx       # 兼容入口：重定向到首页 #agent-experience
│   │   ├── blogs/                # 博客页面路由
│   │   │   ├── page.tsx
│   │   │   ├── BlogClient.tsx
│   │   │   └── [slug]/page.tsx   # 文章详情（generateStaticParams）
│   │   ├── practice/             # 实践列表页路由
│   │   │   ├── page.tsx
│   │   │   ├── PracticeClient.tsx
│   │   │   └── [slug]/page.tsx   # 实践详情（generateStaticParams）
│   │   └── openclaw/             # OpenClaw 网关文档页
│   │       ├── page.tsx
│   │       ├── OpenClawClient.tsx
│   │       └── sections/         # 蓝图、结构、快速开始、配置、经验、场景与维护
│   ├── globals.css               # 全局样式与 Tailwind v4 主题色
│   ├── mdx.d.ts                  # MDX 模块类型声明
│   └── icon.png                  # 站点图标
├── components/                   # 核心共享组件
│   ├── AgentExperience.tsx       # 首页 Agent 方法、工具与经验展示
│   ├── AutoHideScrollbar.tsx     # 滚动时显现、静止时隐藏的自定义滚动条
│   ├── BackToTop.tsx             # 回到顶部按钮
│   ├── CodeBlock.tsx             # 代码语言标签、复制与横向滚动
│   ├── Footer.tsx                # 全站页脚与社交入口
│   ├── ImageLightbox.tsx         # 图片灯箱
│   ├── ListFilters.tsx           # 列表搜索、筛选和排序控件
│   ├── Navbar.tsx                # 桌面 / 移动导航与语言切换
│   ├── NotFoundView.tsx          # notFound() 回退共用的 404 内容
│   ├── Pagination.tsx            # 列表分页
│   ├── ParallaxImage.tsx         # 图片视差与渐进加载封装
│   ├── ParallaxSection.tsx       # 页面区块视差
│   ├── PracticeIcon.tsx          # 实践图标映射
│   ├── PracticeTableOfContents.tsx # 长文目录：桌面侧栏 + 小屏抽屉
│   ├── ProgressiveImage.tsx      # 本地封面渐进加载
│   ├── SmoothScroll.tsx          # Lenis 惯性滚动
│   ├── useSectionScrollSpy.ts    # 章节滚动高亮
│   ├── WorkspaceFileMap.tsx      # OpenClaw Workspace 文件关系图
│   └── ZoomableImage.tsx         # 正文图片灯箱与缩放
├── content/                      # 内容源（MDX / Markdown，唯一内容入口）
│   ├── agents/                   # 全局 Agent 提示词（中文主稿 + 英文 sidecar）
│   ├── blog/                     # 博客文章（主稿 + .en.mdx sidecar）
│   ├── openclaw/workspace/       # OpenClaw 六份工作区 Markdown 源
│   └── practice/                 # 实践（主稿 + .en.mdx sidecar，受约束 frontmatter 驱动）
├── docs/                         # 项目规范
│   ├── maintenance.md            # 日常维护、发布与巡检
│   └── mdx-spec.md               # MDX 编写规范
├── lib/                          # 数据与业务逻辑
│   ├── agent-content.ts          # 首页 Agent 精选工具数据
│   ├── content.ts                # 内容读取接口（导入 content-data.json）
│   ├── i18n.ts                   # 中英文案（cnContent / enContent）
│   ├── i18n-context.tsx          # 共享组件的客户端语言上下文
│   ├── mdx-registry.ts           # 生成：中英文 MDX 正文静态导入注册表
│   ├── scenarios.ts              # 实践场景 key 的唯一来源
│   ├── tag-display.ts            # 标签展示语言映射
│   ├── utils.ts                  # cn() 工具（clsx + tailwind-merge）
│   ├── data/content-data.json    # 生成：内容元数据
│   └── generated/                # 生成：去除 frontmatter 的中英文 MDX 正文副本
├── scripts/generate-content-data.js # 生成 JSON、registry 与无 frontmatter 正文
├── public/images/                # 头像、站点图标、博客 / 实践封面与 OpenClaw 素材
├── README.md                     # 项目入口、开发流程与内容约定
├── DESIGN.md                     # 视觉设计系统规范（Google Stitch design.md 格式）
├── edgeone.json                  # EdgeOne 缓存与部署配置
├── AGENTS.md                     # 给编码 Agent 的行为准则
├── proxy.ts                      # 路由中间件（非语言路径重定向到 /cn）
├── mdx-components.tsx            # MDX 渲染组件映射
├── next.config.ts                # Next.js 配置（mdxRs、本地图片）
├── postcss.config.mjs
├── tsconfig.json / next-env.d.ts
└── package.json / package-lock.json
```

> 标注「生成」的文件由 `npm run generate` 产出，已提交到仓库，请勿手工编辑。

## 国际化

所有 UI 文案集中在 [lib/i18n.ts](lib/i18n.ts) 的 `cnContent` / `enContent` 中，英文结构由 `Widen` 类型约束，缺键或多余键都会在 `tsc` 阶段报错。文章与提示词使用同名 `.en.mdx` / `.en.md` sidecar：生成器只读取需要翻译的元信息字段（博客 `title`；实践 `title` / `readTime` / `scenario`），日期、封面、tags、icon、featured 等共享字段继续以中文主稿为准。当前 7 篇博客与 4 个实践均已提供英文全文，英文正文缺失时仍会回退中文。新增 UI 文案时需在 `cnContent` 和 `enContent` 同步添加同一个键。

## 维护

日常构建、发布、回滚和巡检流程见 [docs/maintenance.md](docs/maintenance.md)。

## 生产地址

[https://www.yking666.pro](https://www.yking666.pro)
