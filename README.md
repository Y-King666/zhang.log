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
- **项目详情目录**：项目正文自动生成章节目录、标题锚点和当前章节高亮，支持移动端折叠
- **全站惯性滚动**：Lenis 始终启用惯性滚动，章节跳转可以立即打断当前滚动
- **本地图片资源**：博客、项目封面和头像统一使用 `public/images/` 下的本地资源
- **边框高光卡片**：主要内容卡片使用主题橙色边缘高光增强层次感
- **响应式仪表盘**：大屏显示终端风格状态面板，小屏自动隐藏

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（http://localhost:3000）
npm run dev

# 生产构建（会先执行内容数据生成）
npm run build

# 启动生产服务器
npm start

# 类型检查 / Lint
npm lint
```

## 添加内容

所有内容以 MDX 形式保存在 `content/` 目录，是内容的唯一入口。新增文章或项目：

1. 在 `content/blog/`（文章）或 `content/projects/`（项目）中创建带 YAML frontmatter 的 MDX 文件
2. 运行 `npm run generate` 重新生成内容数据
3. 下次构建时页面会自动拾取，无需其他接线

**博客 frontmatter 字段：** `slug`、`title`、`date`、`category`、`image`、`tags`

**项目 frontmatter 字段：** `slug`、`title`、`date`、`readTime`、`role`、`image`、`tags`、`featured`

图片资源约定：博客图片放在 `public/images/blogs/<slug>.png`，项目图片放在
`public/images/projects/<slug>.png`，头像使用 `public/images/avatars/avatar.png`。
内容生成脚本会根据 slug 自动写入相对地址，新增或替换图片后运行 `npm run generate`。

项目详情页的目录由正文中的 `h2` / `h3` 自动生成，不需要手工维护导航链接。MDX
标题会自动获得锚点，目录会根据滚动位置高亮当前章节。

## 项目文件结构

```text
zhang.log/
├── app/                          # App Router 路由与页面
│   ├── [lang]/                   # 语言段（cn / en），所有页面按语言静态预渲染
│   │   ├── layout.tsx            # 根布局（generateStaticParams 返回两种语言）
│   │   ├── page.tsx              # 首页：Hero + 精选项目 bento 网格 + 最新文章
│   │   ├── HomeClient.tsx        # 首页动画客户端组件（'use client'）
│   │   ├── about/                # 关于页
│   │   │   ├── page.tsx
│   │   │   └── AboutClient.tsx
│   │   ├── blogs/                # 博客页面路由
│   │   │   ├── page.tsx          # 文章列表（分类筛选标签页）
│   │   │   ├── BlogClient.tsx
│   │   │   └── [slug]/page.tsx   # 文章详情（generateStaticParams）
│   │   ├── projects/             # 项目
│   │   │   ├── page.tsx          # 项目列表
│   │   │   ├── ProjectsClient.tsx
│   │   │   └── [slug]/page.tsx   # 项目详情（generateStaticParams）
│   │   └── openclaw/             # OpenClaw 网关文档页
│   │       ├── page.tsx
│   │       └── OpenClawClient.tsx
│   ├── globals.css               # 全局样式与 Tailwind v4 主题色
│   └── mdx.d.ts                  # MDX 模块类型声明
├── components/                   # 共享组件
│   ├── Footer.tsx
│   ├── ListFilters.tsx            # 列表搜索、筛选和排序
│   ├── Navbar.tsx
│   ├── ProjectTableOfContents.tsx # 项目详情自动目录
│   └── SmoothScroll.tsx            # Lenis 惯性滚动
├── content/                      # 内容源（MDX，唯一内容入口）
│   ├── blog/                     # 博客文章（6 篇）
│   └── projects/                 # 项目（3 个）
├── lib/                          # 数据与业务逻辑
│   ├── content.ts                # 内容读取接口（导入 content-data.json）
│   ├── i18n.ts                   # 中英文案（translations 对象）
│   ├── tag-display.ts            # 标签展示语言映射
│   ├── mdx-registry.ts           # 生成：MDX 正文静态导入注册表
│   ├── utils.ts                  # cn() 工具（clsx + tailwind-merge）
│   ├── data/content-data.json    # 生成：内容元数据
│   └── generated/                # 生成：去除 frontmatter 的 MDX 正文副本
│       ├── blog/
│       └── projects/
├── scripts/
│   └── generate-content-data.js  # 生成内容数据（JSON + registry + 干净正文）
├── public/images/                # 本地图片资源
│   ├── avatars/                  # 作者头像
│   ├── blogs/                    # 博客封面，按 slug 命名
│   └── projects/                 # 项目封面，按 slug 命名
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

所有文案集中在 [lib/i18n.ts](lib/i18n.ts) 的 `translations` 对象中（`cn` / `en` 两个键）。新增文案时需在两个语言对象中添加同一个键。
