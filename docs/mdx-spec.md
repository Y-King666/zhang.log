# zhang.log 内容 MDX 规范

> 本规范基于源码事实编写（`scripts/generate-content-data.js`、`lib/content.ts`、`lib/mdx-registry.ts`、`mdx-components.tsx`、`next.config.ts`、两个详情页与两个列表 Client）。**写 frontmatter 之前先读这一节，否则字段会被生成器改写或不生效。**

---

## 一、共同机制（实践与博客共用）

### 1.1 构建产物与数据流

| 产物 | 来源 | 消费方 |
|---|---|---|
| `lib/data/content-data.json` | 由 `generate-content-data.js` 从 `content/{blog,practice}/*.mdx` 的 frontmatter 解析生成 | 列表页、详情页、排序/过滤/分页 |
| `lib/generated/{collection}/{slug}.mdx` | 剥离 frontmatter 的**正文** | 被 MDX 编译为正文组件 |
| `lib/mdx-registry.ts` | `slug → 组件` 映射 | 详情页按 slug 取正文 |

> `content-data.json`、`lib/generated/*、lib/mdx-registry.ts` 都是**生成物**，不要手动改。改内容只改 `content/` 下的源 MDX，再跑 `npm run generate` 重生成。

### 1.2 生成器硬规则（无论写什么都会改写）

- **`image` 字段一旦为 truthy 就被强制覆盖**为 `/images/{blogs|practice}/{slug}.png`。你写的外链或自定义路径都会被丢弃。
  - 正确做法：把封面图放在 `public/images/{collection}/{slug}.png`，frontmatter 里 `image:` 填一个 truthy 值即可（会被覆盖成同值）。
  - 不要依赖 `image` 写外链 —— 一定失效。`next.config.ts` 的 `remotePatterns`（`lh3.googleusercontent.com` / `images.unsplash.com`）仅对正文内 `<img>` 有效，对 frontmatter 封面无效。
- **`slug` 默认取文件名（去掉 `.mdx`）**；若在 frontmatter 写了 `slug`，必须与文件名一致（否则路由与 registry 的 id 对不上）。slug 会进入 URL 和组件 import 名，**必须是 kebab-case、不含特殊字符**。
- **frontmatter 解析器把一切标量当字符串**：`featured: true`（裸布尔）会被存成字符串 `"true"`。所以裸布尔或带引号 `"true"` 均可，推荐裸布尔（语义清晰）。
- frontmatter 里的**引号会被剥掉**（标量外层、数组元素外层）。`title: "我的网站"` 与 `title: 我的网站` 等价。
- 数组只支持两种写法：
  ```yaml
  tags: ["A", "B"]       # 或
  tags:
    - A
    - B
  ```
- 解析器按每一行第一个 `:` 切分 key/value，值里含 `:`（如 URL）不影响。值里若以 `[` 开头会被当成数组，注意不要误用。值里有 `- ` 开头的行会被当作数组元素，注意不要出现在非数组上下文。

### 1.3 渲染与目录（正文约束的来源）

- `mdx-components.tsx` 只覆盖了 **`h2/h3`**（自动生成锚点 id）和 **`table/thead/tbody/tr`**（剔除纯空白节点）。其余元素走默认渲染。
- 目录组件 `PracticeTableOfContents` 抓取 `[data-project-content]` 作用域内的 `h2[id], h3[id]`。
- **标题 id 自动生成**：`trim().toLowerCase()`，剔除非「字母/数字/中文/空格/连字符」的标点，空格→`-`。例：`## 项目定位：数字名片` → id `项目定位数字名片`。中文标题 id 含中文，`getElementById` 可正常定位。
- **正文标题全文必须唯一**：重复标题会生成相同 id，目录滚动定位会撞到第一个。
- **禁用 `{#id}` 显式锚点语法** —— 会触发编译 500。
- **正文不要写 `#`(h1)**：详情页顶部已由 `meta.title` 渲染 h1；h1 无 id、不会被目录捕获，样式也不统一。正文最高只到 `##`。

### 1.4 正文自定义组件：`ExtLink`

在正文里写外部跳转链接时，用自定义组件 `<ExtLink>`，会比原生 `<a>` / markdown 链接多一个视觉标识（行内链接 + 右侧 ↗ 箭头），自动新开窗口。

```mdx
<ExtLink href="https://nextjs.org/docs">Next.js 官方文档</ExtLink>
```

- 渲染出「lobster 橙文字 + 下划线 + ↗ 箭头」的行内链接，遵循 `DESIGN.md`（主色只做强调、hover 变橙）。
- **强制 `target="_blank"` + `rel="noopener noreferrer"`**，适合**站外**链接。
- 组件注册在 `mdx-components.tsx` 的 `useMDXComponents()`，实践与博客正文**都可用**；详情页传入的 `components={{ pre: CodeBlock }}` 会与 `useMDXComponents()` **合并**，互不覆盖。
- 站内跳转不要用它（会新开窗口）——那是 `next/link` / 原生 `<a>` 的职责，项目当前未提供对应的站内自定义组件。

---

## 二、实践（Practice）MDX 规范

- 文件：`content/practice/{slug}.mdx`
- 路由：`/practice/{slug}`
- 图片目录：`public/images/practice/{slug}.png`

### 2.1 frontmatter 模板

```mdx
---
title: 我的实践项目         # 必填，单行
date: 2026-09-03            # 必填，统一 YYYY-MM-DD
readTime: 15 分钟           # 必填，带单位
icon: globe                 # 可选，须在 PracticeIcon 枚举内
tags: ["Next.js", "TypeScript", "creating"]   # 必填数组
scenario: 创作 / 信息整理    # 必填，原样展示
tools: ["Next.js", "MDX"]   # 必填数组
status: 持续迭代            # 可选（当前页面未渲染，仅作元信息）
result: 建立双语内容系统     # 可选（同上）
agent: 协助页面实现         # 可选（同上）
featured: true              # 可选，true 则默认排序置顶
---
```

> `slug` 不写则自动取文件名。若写必须与文件名一致。

### 2.2 字段对照（按页面实际消费分三级）

| 字段 | 必填 | 说明 | 被谁消费 |
|---|---|---|---|
| `slug` | 靠文件名 | kebab-case；URL/组件名/id 三处一致 | 路由、registry |
| `title` | ✅ | 单行 | 列表卡片、详情页 `<h1>` |
| `date` | ✅ | **统一 `YYYY-MM-DD`**（见 2.4） | 列表排序、详情「发布于」 |
| `readTime` | ✅ | **带单位**如 `15 分钟`（原样展示） | 详情「阅读时间」 |
| `icon` | 可选 | 枚举：`globe bot chart network cloud terminal cpu sparkles gauge server`，写不存在的值 → 默认 `chart` 图标 | 列表卡片图标 |
| `tags` | ✅ | **必须混入且仅混入一个场景 key**（见 2.3） | 场景过滤、标签展示 |
| `scenario` | ✅ | 场景文案，原样展示（不走本地化） | 列表卡片「场景」 |
| `tools` | ✅ | `join(' / ')` 展示 | 列表卡片「工具」 |
| `status` | 可选 | 目前未渲染（用于元信息/未来） | — |
| `result` | 可选 | 同上 | — |
| `agent` | 可选 | 同上 | — |
| `featured` | 可选 | 裸布尔 `true`/`false` 即可；`"true"`/`"featured"` 亦可 | 默认排序（置顶） |

### 2.3 `tags` 场景 key（最容易翻车）

- 场景过滤逻辑是 `project.tags.includes(activeScenario)`。
- **场景 key 必须取**：`coding`(编程)、`creating`(创作)、`organizing`(信息整理)、`automation`(自动化)。
- `tags` 里没有任一场景 key → 该实践在「编码/创作/信息整理/自动化」四个 tab 下**永远被过滤掉**，只有「全部」看得到。
- 每个实践**只属于一个场景**，别在 `tags` 里塞两个场景 key（语义混乱）。
- 展示时会剔除场景 key 再 `getDisplayTag`。建议写法：场景 key 放最后，前面放展示标签。

```yaml
tags: ["Next.js", "TypeScript", "creating"]   # ✓ 场景 key 在末位
tags: ["creating", "AI Agents"]                # ✓
tags: ["Next.js", "TypeScript", "creating", "developing"]   # ✗ 两个场景 key
```

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
正文用 Markdown 表格 / ```代码围栏```。

## 视觉语言：冷暖、对比与层级
> 引用一句话点题（gfm 支持 blockquote）。
```

- 代码块用 ``` 围栏，详情页用 `components={{ pre: CodeBlock }}` 接管 `<pre>`，会美化。
- 表格用 GFM 语法；`Table/thead/tbody/tr` 会剔除纯空白节点，表格里不要留空行。
- 正文图片：封面已由 `meta.image` 接管。正文内若放图，用 `/images/practice/{slug}/xxx.png` 本地路径，或用 `remotePatterns` 白名单外链（`lh3.googleusercontent.com` / `images.unsplash.com`）。
- frontmatter 与正文之间留一个空行，正文内不要再出现 `---`。

---

## 三、博客（Blog）MDX 规范

- 文件：`content/blog/{slug}.mdx`
- 路由：`/blogs/{slug}`（**注意是复数 `blogs`**）
- 图片目录：`public/images/blogs/{slug}.png`

### 3.1 frontmatter 模板

```mdx
---
title: 前端工程化的未来       # 必填，单行
date: 2026-09-03            # 必填，统一 YYYY-MM-DD
readTime: 7                 # 必填，纯数字字符串，如 "7"
category: 前端视野          # 必填，见 3.3 枚举
image: /images/blogs/xxx    # 填一个 truthy 值（会被覆盖成 /images/blogs/{slug}.png）
tags: ["前端", "Nextjs", "React"]   # 必填数组
---
```

### 3.2 字段对照

| 字段 | 必填 | 说明 | 被谁消费 |
|---|---|---|---|
| `slug` | 靠文件名 | kebab-case | 路由、registry |
| `title` | ✅ | 单行 | 列表卡片、详情页 `<h1>` |
| `date` | ✅ | **统一 `YYYY-MM-DD`** | 排序、列表「发布于」 |
| `readTime` | ✅ | **纯数字**如 `7`（列表用 `{n} 分钟 阅读` 模板补单位） | 列表 |
| `category` | ✅ | **枚举**（见 3.3） | 分类 tab 过滤、面包屑 |
| `image` | ✅ | truthy 任意值，覆盖为 `/images/blogs/{slug}.png` | 列表/详情封面 |
| `tags` | ✅ | 展示用，走 `getDisplayTag` 本地化 | 列表、详情底部 |
| `featured` | 可选 | 当前无人消费，可省略 | — |

### 3.3 `category` 枚举（最容易写错）

`BlogClient` 的分类判定是写死的 `CATEGORY_FILTERS`：

| 你要归入的 tab | `category` 必须填 |
|---|---|
| 技术驱动（tech） | `新手教程`、`技术科普`、`架构实践`、`前端视野` 之一 |
| 社区动态（community） | `生态治理` |
| 最新动态（latest） | `行业趋势` |

**`category` 只能取以上六个值之一。** 写任何其他词，文章会出现在「全部」tab，但永远不出现在对应分类 tab。

### 3.4 正文规范

- 从 `##` 开始、不用 `#`；标题全文唯一；禁用 `{#id}`。
- blog 详情页**没有**右侧目录组件，h2/h3 的 id 在该页基本不用于导航，但 id 生成仍会执行，保持规范即可。
- 结构模板：

```mdx
## 1. 服务端组件 (RSC) 的崛起
正文用段落，必要时 ```代码围栏```。

## 2. 性能优化的极致追求
| 指标 | 目标 |
|------|------|
| LCP | < 2.5s |

> "好的前端工程不只是让界面好看……"
```

- 代码块、表格、blockquote 均可用（gfm）。
- 图片：封面由 `meta.image` 接管；正文图片用 `/images/blogs/{slug}/xxx.png` 或白名单外链。

---

## 四、红线清单（兼发布检查）

1. **日期统一为 `YYYY-MM-DD`**（定长保证 `localeCompare` 排序正确）。
2. **image 会自动覆盖** → 只放 `public/images/{collection}/{slug}.png`，别写外链。
3. **slug 只认文件名**，写了必须与文件名一致，kebab-case。
4. **featured 写裸布尔**（`true`/`false`），生成器一律字符串化。
5. **practice 的 tags 必须带且只带一个场景 key**；**blog 的 category 必须取枚举六选一**。
6. **practice 的 readTime 带单位**（`15 分钟`）、**blog 的 readTime 纯数字**（`7`）。
7. **正文从 `##` 开始、不用 `#`**；`h2/h3` 自动生成 id 且**全文唯一**。
8. **禁用 `{#id}` 显式锚点**（编译 500）。
9. **正文是单一语言**：同一份 MDX 同时服务 `cn/en` 两个路由，无双语 frontmatter。展示层双语只靠 `lib/tag-display.ts` 的映射——想让某个 tag 在对方语言下显示成对应语言，必须去补映射。
