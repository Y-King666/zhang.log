# 内容站维护指南

本文面向项目维护者和贡献者，说明本地开发、内容更新、构建、发布、回滚与巡检流程。项目概览见 [README.md](../README.md)，内容字段规范见 [MDX 规范](mdx-spec.md)，视觉规范见 [DESIGN.md](../DESIGN.md)。

## 1. 基本原则

- 修改前先查看工作区状态，避免覆盖现有改动。
- 内容源文件是唯一事实来源，生成文件由脚本重建。
- 不提交密钥、账号 ID、聊天目标、个人绝对路径或本地环境文件。
- 环境配置只在本地保存；仓库中仅提交 `.env.example` 一类模板。
- 文档、生成物和实际代码应在同一次改动中保持一致。

## 2. 环境准备

运行环境以 [README.md](../README.md) 中的版本要求为准。

```bash
npm install
npm run dev
```

需要本地环境变量时，从模板创建私有配置文件：

```bash
cp .env.example .env
```

Windows PowerShell 可使用：

```powershell
Copy-Item .env.example .env
```

填写本地值后确认 `.env` 已被 `.gitignore` 排除。不要把真实 Token、数据库密码、账号 ID 或个人目录写进示例文件。

## 3. 日常开发流程

```bash
git status --short --branch
npm run generate
npm run lint
npm run build
npm start
```

注意：

- `npm run lint` 当前执行 TypeScript 类型检查。
- `npm run build` 会通过 `prebuild` 自动运行内容生成。
- 不要同时运行会争用同一构建目录的开发服务和生产构建。
- 依赖发生变化时，同步提交 `package.json` 与锁文件。

## 4. 内容更新

博客和实践正文位于 `content/`。新增或修改内容后：

1. 更新对应的 MDX 主稿和英文 sidecar。
2. 将封面图放入 `public/images/` 下的对应目录。
3. 运行 `npm run generate`。
4. 检查首页、列表页、详情页和语言切换。
5. 验证站内链接、外部链接、目录锚点和图片。

字段、标签、日期和正文组件的完整约束见 [MDX 规范](mdx-spec.md)。

以下文件由生成器维护，不应手工编辑：

- `lib/data/content-data.json`
- `lib/generated/**`
- `lib/mdx-registry.ts`

## 5. UI 与国际化

- 中英文 UI 文案集中维护在 `lib/i18n.ts`。
- 新增文案时同步更新中文和英文对象。
- 语言路由、重定向和 404 行为修改后，需要分别验证中文和英文路径。
- UI 或交互变更需要同时检查桌面与移动端布局。

## 6. 构建验收

提交前至少执行：

```bash
npm run generate
npm run lint
npm run build
git diff --check
```

检查项：

- 内容生成成功，registry 中没有已删除条目的残留。
- TypeScript 和框架构建通过。
- 首页、列表、详情、语言切换和 404 正常。
- 搜索、筛选、排序、分页、图片和目录交互正常。
- 移动端没有横向溢出，关键按钮可点击。
- 中英文内容、封面和站内链接保持一致。

## 7. 图片与静态资源

- 优先使用仓库内的本地资源。
- 删除未被引用的旧图片、视频和临时导出文件。
- 新图片保持清晰，同时控制文件体积。
- 修改静态文件名后，检查内容数据、正文链接和缓存配置。
- 大文件不应直接提交；需要时使用适合项目的对象存储或发布流程。

## 8. 链接维护

发布前搜索空链接和占位链接：

```bash
rg -n 'href=""|href="#"|src=""' app components content
```

同时检查：

- 站内链接是否包含正确的语言前缀。
- 外部链接是否使用完整的 `https://` 地址。
- 外部链接是否启用安全的 `noopener noreferrer`。
- 删除内容后是否仍有旧 slug 引用。
- 标题修改后，目录锚点是否仍能跳转。

## 9. 配置与密钥

- 仓库只提交配置模板，不提交真实 `.env`。
- 示例值使用 `your_user`、`your_password`、`<token>` 等通用占位符。
- 不在源代码、文档、截图或提交信息中保存凭据。
- 如果密钥曾进入 Git 历史，应立即轮换，并按项目安全流程清理历史。
- 发布前检查暂存内容，避免误提交日志、数据库导出、备份和本地状态文件。

## 10. Git 提交流程

```bash
git status --short --branch
git add -A
git diff --cached --check
git commit -m "<type>: <summary>"
git push origin main
```

提交信息建议使用以下前缀：

- `feat`：新功能
- `fix`：缺陷修复
- `content`：文章、项目或翻译内容
- `docs`：文档与规范
- `perf`：性能优化
- `chore`：依赖、配置与清理

## 11. 部署

项目可通过支持 Git 集成的静态托管或 Next.js 平台发布。部署前确认：

1. 本地构建通过。
2. 目标分支和提交正确。
3. 平台已配置所需环境变量。
4. 构建命令和输出目录与项目配置一致。
5. 部署完成后验证首页、详情页、资源加载和中英文 404。

不要把托管平台的账号 ID、项目 ID、访问 Token 或个人域名硬编码到文档中。需要示例时使用：

```text
https://example.com
```

## 12. 回滚与故障处理

代码回滚优先使用可审计的 revert：

```bash
git revert <commit-sha>
git push origin main
```

如果线上部署异常：

1. 暂停继续发布。
2. 在部署平台选择最近一次稳定版本回滚。
3. 在 Git 中创建对应 revert，保持代码与线上一致。
4. 修复后重新执行完整构建与验收。

构建失败时依次检查：

- 内容 frontmatter、日期、标签和图片路径。
- MDX 语法、组件名称和代码围栏。
- TypeScript 类型、国际化 key 和导入路径。
- Next.js 服务端/客户端边界和路由冲突。
- 部署平台的依赖安装、Node.js 版本和环境变量。

## 13. 定期巡检

建议每次集中更新后执行一次：

1. 工作区与远端分支是否同步。
2. 依赖是否需要安全更新。
3. 首页、列表、详情和 404 是否正常。
4. 中英文内容是否成对。
5. 图片、目录和链接是否有效。
6. 生成物是否与内容源一致。
7. 移动端是否无横向溢出。
8. 部署是否成功，线上是否显示预期提交。
9. README、设计规范、MDX 规范和实际代码是否一致。

## 14. 相关文档

- [项目概览与快速开始](../README.md)
- [视觉设计规范](../DESIGN.md)
- [MDX 内容规范](mdx-spec.md)
