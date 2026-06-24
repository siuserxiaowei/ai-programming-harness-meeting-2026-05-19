# AI 编程与 Harness 工程研讨会公开专题站

<!-- SIUSER-REPO-GUIDE:START -->
## 项目介绍 / Project Introduction

### 中文
AI 编程 Harness 会议归档：记录 Codex、Claude Code、agent workflow 和测试体系相关讨论。

### English
AI programming harness meeting archive covering Codex, Claude Code, agent workflows, and testing systems.

## 使用方式 / Usage

### 中文
1. 优先打开在线入口或本地静态服务查看最终页面。
2. 内容型仓库通常从 `README.md`、`docs/`、`data/` 或 `content/` 开始阅读。
3. 更新资料后，重新生成或刷新静态页面，并检查链接、图片和文字是否正常。

### English
1. Start with the live link or a local static server to view the final page.
2. For content repositories, begin with `README.md`, `docs/`, `data/`, or `content/`.
3. After updating material, regenerate or refresh the static page and check links, images, and copy.

## 入口与元信息 / Entry Points & Metadata

- GitHub 仓库 / Repository: https://github.com/siuserxiaowei/ai-programming-harness-meeting-2026-05-19
- Live / 在线入口：https://siuserxiaowei.github.io/ai-programming-harness-meeting-2026-05-19/
- 默认分支 / Default branch: `main`
- 主要语言 / Primary language: `JavaScript`
- 可见性 / Visibility: `public`
- 仓库类型 / Repository type: `source`

## 本地运行 / Local Run

```bash
git clone https://github.com/siuserxiaowei/ai-programming-harness-meeting-2026-05-19.git
cd ai-programming-harness-meeting-2026-05-19
python3 -m http.server 8000
```

## 仓库结构 / Repository Map

| 路径 / Path | 中文说明 | English |
| --- | --- | --- |
| `README.md` | 项目入口说明，先读这里。 | Main project entry point and orientation. |
| `docs` | 文档或 GitHub Pages 输出目录。 | Documentation or GitHub Pages output. |
| `scripts` | 构建、同步、生成或维护脚本。 | Build, sync, generation, or maintenance scripts. |
| `sources` | 项目文件或目录。 | Project file or directory. |
| `.gitignore` | 项目文件或目录。 | Project file or directory. |

## 维护备注 / Maintenance Notes

- 中文：当项目目标、在线入口、运行命令或目录结构变化时，同步更新本说明。
- English: Keep this guide updated when the project purpose, live link, run commands, or structure changes.
- 中文：修改代码、数据或生成页面后，优先运行相关构建、测试或校验命令。
- English: After changing code, data, or generated pages, run the relevant build, test, or validation command.

## 安全与隐私 / Safety & Privacy

- 中文：不要提交 API key、token、密码、cookie、私有链接或内部账号资料。
- English: Do not commit API keys, tokens, passwords, cookies, private URLs, or internal account data.
- 中文：公开 GitHub Pages 前，确认资料已脱敏并允许公开。
- English: Before publishing GitHub Pages output, confirm the material is redacted and cleared for public release.
<!-- SIUSER-REPO-GUIDE:END -->



<!-- SIUSER-SEO-INTRO:START -->

## 项目介绍 / Project Introduction

**中文介绍**：AI 编程 Harness 会议资料，整理 Codex、Claude Code、Agent 工作流、验证机制与工程化落地思路。

**English**: Meeting notes for AI programming harness workflows, covering Codex, Claude Code, agent workflows, verification, and engineering implementation.

**SEO 关键词 / SEO Keywords**: AI programming, Codex, Claude Code, agent workflow, software testing, AI 编程

<!-- SIUSER-SEO-INTRO:END -->

这是一份基于 2026-05-19「自动化开发工具使用经验讨论」飞书智能纪要、文字记录、妙记 AI 产物和用户摘要整理的公开专题站。

在线页面：

```text
https://siuserxiaowei.github.io/ai-programming-harness-meeting-2026-05-19/
```

## 内容结构

- `docs/index.html`：总览、核心判断、会议地图、阅读入口。
- `docs/paradigm.html`：AI 编程范式转变，从副驾到管理者。
- `docs/operating-system.html`：多 Agent 协作系统，看板、Worktree、PR、Review、Token 与增删比。
- `docs/spec-playbook.html`：Meta Spec、分层 Spec、资源感知、前后端工程规范。
- `docs/toolchain.html`：模型选择、前端设计工具、后端脚手架、行业趋势。
- `docs/timeline.html`：按飞书妙记时间戳组织的章节复盘。
- `docs/qa.html`：问答与分歧。
- `docs/transcript.html`：公开逐字稿整理版。
- `docs/appendix.html`：术语表、行动清单、指标表、来源说明。
- `sources/`：飞书拉取结果、妙记产物和逐字稿导出。

## 来源说明

- 飞书智能纪要：`ZJubd5uCPopKKzxRbu9ckkLpnFe`
- 飞书文字记录：`XYKndOXkqoyleSx7TmycZVmUnuQ`
- 飞书妙记：`obcnps9561u841udh1852g3b`
- 用户补充本地逐字稿：`sources/local-named-transcript.txt`

原始资料中出现的飞书内部临时下载链接已移除；公开页面保留会议正文、观点、时间戳和逐字稿内容。

## 重新生成

```bash
node scripts/fetch-sources.mjs
node scripts/build-site.mjs
```

<!-- SIUSER-CONTACT:START -->

## 联系我 / Contact

想交流 AI 工具、内容自动化、SEO、私域增长或项目合作，可以扫码加我微信。

For collaboration on AI tools, content automation, SEO, private-domain growth, or product experiments, scan the WeChat QR code below.

<img src="https://raw.githubusercontent.com/siuserxiaowei/siuserxiaowei/main/assets/contact/wechat-qrcode.jpg" width="180" alt="WeChat QR code / 微信二维码" />

**关键词 / Keywords**: AI programming, Codex, Claude Code, agent workflow, AI tools, AI automation, GitHub Pages, SEO

<!-- SIUSER-CONTACT:END -->
