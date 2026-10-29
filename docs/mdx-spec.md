# zhang.log 内容 MDX 规范

> 本规范基于源码事实编写（`scripts/generate-content-data.js`、`lib/content.ts`、`lib/mdx-registry.ts`、`mdx-components.tsx`、`next.config.ts`、两个详情页与两个列表 Client）。**写 frontmatter 之前先读这一节，否则字段会被生成器改写或不生效。**

---

## 一、共同机制（实践与博客共用）

### 1.1 构建产物与数据流

| 产物 | 来源 | 消费方 |
|---|---|---|
| `lib/data/content-data.json` | 由 `generate-content-data.js` 从 `content/{blog,practice}/*.mdx` 的 frontmatter 解析生成 | 列表页、详情页、排序/过滤/分页 |
| `lib/generated/{collection}/{slug}.mdx` | 剥离 frontmatter 的**中文正文** | 被 MDX 编译为正文组件 |
| `lib/generated/{collection}/{slug}.en.mdx` | 剥离 frontmatter 的**英文正文 sidecar** | 编译为英文正文组件 |
| `lib/mdx-registry.ts` | `slug → 组件` 中英文映射 | 详情页按语言取正文，英文缺失时回退中文 |

> `content-data.json`、`lib/generated/*`、`lib/mdx-registry.ts` 都是**生成物**，不要手动改。改内容只改 `content/` 下的源 MDX，再跑 `npm run generate` 重生成。
>
> `npm run build` 会通过 `prebuild` 自动执行 `generate`；只启动或刷新开发服务器时，仍应在修改 `content/` 后手动运行 `npm run generate`。

**双语 sidecar：** 中文主稿仍是唯一入口；英文翻译放在同目录同名的 `{slug}.en.mdx`（正文 + 需要翻译的元信息）。生成器只读取 sidecar 的 `title`（博客与实践）、`readTime`、`scenario`（实践）字段，日期、封面、tags、icon、featured 等共享字段继续以主稿为准，并生成 `blogComponentsEn` / `practiceComponentsEn` 注册表。英文文件缺失时回退中文正文。

### 1.2 生成器实际行为与人工约束

- **`image` 字段一旦为 truthy 就被强制覆盖**为 `/images/{blogs|practice}/{slug}.png`。你写的外链或自定义路径都会被丢弃。
  - 正确做法：把封面图放在 `public/images/{collection}/{slug}.png`，frontmatter 里 `image:` 填一个 truthy 值即可（会被覆盖成同值）。
  - **封面显示矩阵：** 实践列表与首页精选项目使用 16:9 + `object-cover`，会裁切；实践详情使用 16:9 + `object-contain`，会完整显示；博客详情使用 16:9 + `object-cover`，会裁切；博客列表与首页博客区**不显示封面**。新源图优先输出 1920×1080、宽度 ≥1100px，目标单图 ≤1.5 MiB（1,572,864 bytes），扩展名统一 `.png`（内容 JPEG/PNG 均可，按字节识别）。现有 `zhang.log.png` 是约 2.011:1 的兼容特例。
  - 不要依赖 `image` 写外链 —— 一定失效。
- **`slug` 默认取文件名（去掉 `.mdx`）**；若在 frontmatter 写了 `slug`，生成器会优先使用该值，但现行约束要求它必须与文件名一致，否则路由、图片和 registry 会难以追踪。新 slug 使用小写 ASCII 与连字符；`zhang.log` 是保留的既有带点 slug，不要仿照新增特殊字符。
- **生成器不是完整 YAML 解析器**：它按行和第一个 `:` 处理 frontmatter。标题含英文冒号时仍应整体加双引号，避免编辑器和外部 YAML 工具误判。
- **不支持行尾注释**：`title: 标题 # 必填` 会把 `# 必填` 一并写进字段值。注释必须单独成行，例如模板中的字段说明放在字段上方；`#` 注释行没有 `:`，生成器会跳过。
- **frontmatter 解析器把一切标量当字符串**：`featured: true`（裸布尔）会被存成字符串 `"true"`。所以裸布尔或带引号 `"true"` 均可，推荐裸布尔（语义清晰）。
- frontmatter 里的**引号会被剥掉**（标量外层、数组元素外层）。`title: "我的网站"` 与 `title: 我的网站` 等价。
- 单行闭合数组：
  ```yaml
  tags: ["A", "B"]
  ```
- 多行块数组；key 后直接换行，中间不要插空行或注释：
  ```yaml
  tags:
    - A
    - B
  ```
- 单行数组按英文逗号切分，所以**单个元素内不要出现英文逗号**；块数组的 `- A` 元素按整行读取。
- 非数组字段不要留空值；只有下一行以 `- ` 开头时，`key:` 才会进入块数组模式。
- 解析器按每一行第一个 `:` 切分 key/value，值里后续出现 `:`（如 URL）不影响。

### 1.3 渲染与目录（正文约束的来源）

- `mdx-components.tsx` 覆盖了 **`h2/h3`**（自动生成锚点 id）、**`table/thead/tbody/tr`**（剔除纯空白节点）、**`pre`**（代码块美化），以及自定义组件 **`ExtLink` / `NoIndent` / `Indent`**。
- 这些映射只作用于 Markdown 语法生成的元素。手写原生 `<h2>`、`<table>`、`<pre>`、`<img>` 会绕过对应映射：没有自动 id / 表格滚动外框 / CodeBlock，正文应继续使用 Markdown 语法。
- 目录组件 `PracticeTableOfContents` 抓取 `[data-project-content]` 作用域内的 `h2[id], h3[id]`。
- **标题 id 自动生成**：提取标题及其行内元素的文本，再执行 `trim().toLowerCase()`，剔除非「字母/数字/中文/下划线/空格/连字符」的标点，并把连续空格或连字符压成 `-`。例：`## 项目定位：数字名片` → id `项目定位数字名片`。中文标题 id 含中文，`getElementById` 可正常定位。
- **正文标题全文必须唯一**：重复标题会生成相同 id，目录滚动定位会撞到第一个。
- **不要使用 `{#id}` 显式锚点语法**：当前 mdxRs 会把它编译成非法 JSX，导致构建失败。Markdown 标题应依靠文本自动生成 id；手写原生 `<h2 id="...">` 虽可能被目录选择器读到，但会绕过统一标题映射，不作为支持写法。
- **正文不要写 `#`(h1)**：详情页顶部已由 `meta.title` 渲染 h1；h1 无 id、不会被目录捕获，样式也不统一。正文最高只到 `##`。

### 1.4 正文自定义组件：`ExtLink`

在正文里写外部跳转链接时，用自定义组件 `<ExtLink>`，会比原生 `<a>` / markdown 链接多一个视觉标识（行内链接 + 右侧 ↗ 箭头），自动新开窗口。`href` 必须是非空、可访问的完整 URL；发布前必须逐项检查。

```mdx
<ExtLink href="https://nextjs.org/docs">Next.js 官方文档</ExtLink>
```

- 渲染出「Signal 橙文字 + 下划线 + ↗ 箭头」的行内链接，遵循 `DESIGN.md`（主色只做强调、hover 变橙）。
- **强制 `target="_blank"` + `rel="noopener noreferrer"`**，适合**站外**链接。
- 组件注册在 `mdx-components.tsx` 的 `useMDXComponents()`，实践与博客正文**都可用**。详情页传入的 `components` 会与全局映射合并；**同名 key 由详情页本地组件覆盖**，当前只传入同实现的 `pre: CodeBlock`。
- 站内跳转不要用它（会新开窗口）——那是 `next/link` / 原生 `<a>` 的职责，项目当前未提供对应的站内自定义组件。

### 1.5 正文自定义组件：段落缩进 `<NoIndent>` / `<Indent>`

正文段落默认由 `app/globals.css` 的 `.prose p` **统一缩进 2 字符**（`text-indent: 2em`，2em 跟随字号；列表项内的段落、表格单元格不缩进）。需要**逐段**调整时，用下面两个组件包住段落：

```mdx
<NoIndent>这一段顶格，不缩进。</NoIndent>

<Indent n={1}>这一段缩进 1 个字符。</Indent>

<Indent>省略 n，等价于默认缩进 2 个字符。</Indent>
```

- `<NoIndent>` → `text-indent: 0`；`<Indent n={N}>` → `text-indent: N em`（N 可为小数，如 `0.5`）。
- 两者都渲染成 `<p>`，用行内 `style` 覆盖 `.prose p`（行内样式优先级更高），因此仍继承 prose 的段落样式；也可继续传 `className` / `style`。
- **内容要紧贴标签写、标签内不要留空行**，否则 MDX 会在组件内部再包一层 `<p>`（嵌套段落，HTML 非法）。行内 Markdown（`**加粗**`、反引号代码）在标签内正常生效。
- 组件注册在 `mdx-components.tsx` 的 `useMDXComponents()`，实践与博客正文、中英文正文**都可用**。

### 1.6 正文在小屏（小于 768px）的渲染

站点是移动优先的：`md:` 断点即 768px，小于 768px 走紧凑规则（完整约定见 `DESIGN.md` 的 Layout / Typography）。写正文时只需要知道这三点：

- **表格**：小屏下 `.table-scroll table` 使用 `width: max-content` 且单元格保持单行，外层容器负责横向滚动；单元格字号降到 0.75rem（12px）。优先控制在 3 列以内；现有 4–5 列表格仍可正常横向滚动，但新增宽表必须确认小屏可读、无页面级横向溢出。
- **代码块**：小屏字号 0.75rem、内边距收敛，复制按钮常显（触屏没有 hover）。**长行交给横向滚动，不要手工折行**，否则复制出去的代码会带上硬换行。
- **段落缩进**：默认 2em；需要逐段微调时用 §1.5 的 `<NoIndent>` / `<Indent>`。

---

## 二、实践（Practice）MDX 规范

- 文件：`content/practice/{slug}.mdx`
- 路由：`/{cn|en}/practice/{slug}`。普通无点号路径可由 `proxy.ts` 重定向到 `/cn`；含点 slug（包括 `zhang.log`）必须显式使用 `/cn` 或 `/en` 前缀，英文也必须显式使用 `/en`。
- 图片目录：`public/images/practice/{slug}.png`（16:9 横图、宽 ≥1100px，详见 1.2 封面比例）

### 2.1 frontmatter 模板

```mdx
---
# 必填，单行
title: 我的实践项目
# 必填，统一 YYYY-MM-DD
date: 2026-09-03
# 必填，带单位
readTime: 15 分钟
# 必填；生成器会按 slug 重写路径
image: /images/practice/zhang.log.png
# 可选，须在 PracticeIcon 枚举内
icon: globe
# 必填数组
tags: ["Next.js", "TypeScript", "creating"]
# 必填，原样展示
scenario: 创作 / 信息整理
# 可选，true 则默认排序置顶
featured: true
---
```

> `slug` 不写则自动取文件名。若写必须与文件名一致。

英文 sidecar `content/practice/{slug}.en.mdx` 只写需要翻译的字段：

```mdx
---
title: My Practice Project
readTime: 15 min
scenario: Creation / Information organization
---
```

其余共享字段继续在主稿维护，不要在 sidecar 重复。

### 2.2 字段对照（主要消费方，非穷尽）

| 字段 | 必填 | 说明 | 被谁消费 |
|---|---|---|---|
| `slug` | 靠文件名 | kebab-case；文件名、URL 与 registry key 保持一致 | 路由、registry |
| `title` | ✅ | 单行；英文放在 sidecar 的 `title` | 列表卡片、详情页 `<h1>` |
| `date` | ✅ | **统一 `YYYY-MM-DD`**（见 2.4） | 列表排序、详情「发布于」 |
| `readTime` | ✅ | **带单位**如 `15 分钟`；英文放在 sidecar 的 `readTime`，如 `15 min` | 列表、首页、详情「阅读时间」 |
| `image` | ✅ | truthy 占位即可，生成器会覆盖为 `/images/practice/{slug}.png` | 列表、首页与详情封面 |
| `icon` | 可选 | 枚举：`globe bot chart network cloud terminal cpu sparkles gauge server`，写不存在的值 → 默认 `chart` 图标 | 列表卡片图标 |
| `tags` | ✅ | **必须混入且仅混入一个场景 key**（见 2.3） | 场景过滤、标签展示、搜索 |
| `scenario` | ✅ | 场景文案；英文放在 sidecar 的 `scenario` | 列表卡片「场景」 |
| `featured` | 可选 | 裸布尔 `true`/`false` 即可；`"true"`/`"featured"` 亦可 | 默认排序（置顶） |

### 2.3 `tags` 场景 key（最容易翻车）

- 场景过滤逻辑是 `project.tags.includes(activeScenario)`。
- **场景 key 必须取**：`coding`(编程)、`creating`(创作)、`organizing`(信息整理)、`automation`(自动化)。
- `tags` 里没有任一场景 key → 该实践在「编码/创作/信息整理/自动化」四个 tab 下**永远被过滤掉**，只有「全部」看得到。
- 每个实践**只属于一个场景**，别在 `tags` 里塞两个场景 key（语义混乱）。
- 展示时会剔除场景 key 再 `getDisplayTag`。建议写法：场景 key 放最后，前面放展示标签。

- ✅ 场景 key 在末位：`tags: ["Next.js", "TypeScript", "creating"]`
- ✅ 场景 key 在前：`tags: ["creating", "AI Agents"]`
- ❌ 两个场景 key：`tags: ["Next.js", "TypeScript", "creating", "developing"]`

### 2.4 `date` 排序坑（健壮性关键）

列表默认排序 `b.date.localeCompare(a.date)`。**只有定长的 `YYYY-MM-DD` 才能保证字典序 = 时间序**。

仓库历史上曾混用「中文日期」与 ISO，导致 `3月9日` 排在 `3月13日` 之后。**存储一律用 ISO `YYYY-MM-DD`**；若要在界面上显示中文日期，交给前端格式化，不要让存储写中文。

### 2.5 正文规范

- 从 `##`（h2）开始，最高只到 `##`/`###`，不要 `#`。h2 为章节骨架，h3 为子节（TOC 以 h2 为组、h3 为子项）。
- 结构模板：

```mdx
## 项目定位：xxx
一句话讲清这个项目解决什么。

## 内容系统：MDX 驱动的三层数据流
### 分层职责
### 渲染策略
正文用 Markdown 表格和 fenced code block。

## 视觉语言：冷暖、对比与层级
> 引用一句话点题（gfm 支持 blockquote）。
```

- 代码块使用 fenced code block（三个反引号围栏）；Markdown 生成的 `<pre>` 会由全局 `CodeBlock` 映射接管并美化，原生 `<pre>` 不经过该映射。
- 表格用 GFM 语法；`Table/thead/tbody/tr` 会剔除纯空白节点，表格里不要留空行。
- 正文图片：封面已由 `meta.image` 接管。正文内优先使用 `/images/practice/{slug}/xxx.png` 本地路径。Markdown 图片和原生 `<img>` 会渲染为普通图片，不经过 `next/image`，也不受图片远程白名单或优化策略控制；远程图片还可能受防盗链、时效链接和网络影响，因此不作为默认写法。
- frontmatter 与正文之间留一个空行。正文中的 `---` 位于开头，或与上一行文字之间留空行时，会作为主题分隔线；紧跟上一行文字会被 Markdown 解释为 Setext 标题。不要用它模拟 frontmatter。

---

## 三、博客（Blog）MDX 规范

- 文件：`content/blog/{slug}.mdx`
- 路由：`/{cn|en}/blogs/{slug}`（**注意是复数 `blogs`**）
- 图片目录：`public/images/blogs/{slug}.png`

### 3.1 frontmatter 模板

```mdx
---
# 必填，单行
title: 前端工程化的未来
# 必填，统一 YYYY-MM-DD
date: 2026-09-03
# 必填，纯数字字符串
readTime: 7
# 必填，见 3.3 枚举
category: frontend
# 必填；任意 truthy 占位值，会被覆盖成 /images/blogs/{slug}.png
image: /images/blogs/xxx
# 必填数组
tags: ["前端", "Nextjs", "React"]
---
```

英文 sidecar `content/blog/{slug}.en.mdx` 只写英文 `title`，正文从 `##` 开始；`category` 是语言无关的枚举 key，不在 sidecar 重复。

```mdx
---
title: The Future of Frontend Engineering
---
```

### 3.2 字段对照（主要消费方，非穷尽）

| 字段 | 必填 | 说明 | 被谁消费 |
|---|---|---|---|
| `slug` | 靠文件名 | kebab-case | 路由、registry |
| `title` | ✅ | 单行 | 列表卡片、详情页 `<h1>` |
| `date` | ✅ | **统一 `YYYY-MM-DD`** | 排序、列表「发布于」 |
| `readTime` | ✅ | **纯数字**如 `7`（页面用 `{n} 分钟 阅读` 模板补单位） | 列表、详情 |
| `category` | ✅ | **枚举**（见 3.3） | 分类 tab 过滤、面包屑 |
| `image` | ✅ | truthy 任意值，覆盖为 `/images/blogs/{slug}.png` | 博客详情头图；博客列表与首页博客区不显示 |
| `tags` | ✅ | 展示用，走 `getDisplayTag` 本地化；搜索同时匹配原值和显示值 | 列表、详情底部、搜索 |
| `featured` | 不写 | 当前无人消费；不要新增该字段 | — |

### 3.3 `category` 枚举（最容易写错）

`BlogClient` 的分类判定是写死的 `CATEGORY_FILTERS`：

| 你要归入的 tab | `category` 必须填 |
|---|---|
| 技术驱动（tech） | `tutorial`、`explainer`、`architecture`、`frontend` 之一 |
| 社区动态（community） | `ecosystem` |
| 最新动态（latest） | `trends` |

**`category` 只能取以上六个 key 之一。** 中文和英文显示名都放在 `lib/i18n.ts` 的 `blog.category.*` 中；写任何其他词，文章会出现在「全部」tab，但永远不出现在对应分类 tab。

### 3.4 正文规范

- 从 `##` 开始、不用 `#`；标题全文唯一；不要使用 `{#id}`。
- blog 详情页**没有**右侧目录组件，h2/h3 的 id 在该页基本不用于导航，但 id 生成仍会执行，保持规范即可。
- 结构模板：

```mdx
## 1. 服务端组件 (RSC) 的崛起
正文用段落，必要时加入 fenced code block。

## 2. 性能优化的极致追求
| 指标 | 目标 |
|------|------|
| LCP | < 2.5s |

> "好的前端工程不只是让界面好看……"
```

- 代码块、表格、blockquote 均可用（gfm）。
- 图片：封面由 `meta.image` 接管；正文图片优先使用 `/images/blogs/{slug}/xxx.png` 本地路径。

---

## 四、红线清单（兼发布检查）

1. **日期统一为 `YYYY-MM-DD`**（定长保证 `localeCompare` 排序正确）。
2. **image 会自动覆盖** → 只放 `public/images/{collection}/{slug}.png`，别写外链。
3. **slug 以文件名为准**；frontmatter 中不要另写不同值。新文件使用小写 ASCII 与连字符，`zhang.log` 是既有特例；英文 sidecar 固定为 `{slug}.en.mdx`。
4. **featured 写裸布尔**（`true`/`false`），生成器一律字符串化。
5. **practice 的 tags 必须带且只带一个场景 key**；**blog 的 category 必须取 `tutorial / explainer / architecture / frontend / ecosystem / trends` 之一**。
6. **practice 的 readTime 带单位**（`15 分钟`）、**blog 的 readTime 纯数字**（`7`）。
7. **正文从 `##` 开始、不用 `#`**；`h2/h3` 自动生成 id 且**全文唯一**。
8. **不要使用 `{#id}` 显式锚点**；它会产生非法 JSX 并导致构建失败。目录以 Markdown `h2/h3` 的自动 id 为准。
9. **中文主稿与英文 sidecar 成对维护**：中文改动后同步更新 `{slug}.en.mdx` 的正文与 `title` / `readTime` / `scenario`；英文缺失时页面会回退中文正文。
10. **tag 要做对方语言显示时**，补 `lib/tag-display.ts` 的映射；未补映射的 tag 原样显示。
11. **临时占位内容用完即删**：为验证布局新增的占位条目（如 `layout-test-*`）要连同封面图一起删除，并重跑 `npm run generate`，清掉 `lib/generated/` 与 registry 中的残留。
