# AI 编程与 Harness 工程研讨会公开专题站

<!-- SIUSER-REPO-GUIDE:START -->
## Repository Guide

### What This Repository Does

AI 编程 Harness 会议：围绕 Codex / Claude Code / agent workflow / testing 的项目。

English summary: ai-programming-harness-meeting-2026-05-19 for ai-programming-harness-meeting-2026-05-19 for Codex, Claude Code, agent workflow, testing.

### Online Entry Points

- GitHub repository: https://github.com/siuserxiaowei/ai-programming-harness-meeting-2026-05-19
- Live / GitHub Pages: https://siuserxiaowei.github.io/ai-programming-harness-meeting-2026-05-19/
- Default branch: `main`
- Primary language: `JavaScript`

### How To Read / Learn This Repository

1. 先读本 README，确认项目目标、在线入口和本地运行方式。
2. 打开上方 Live / GitHub Pages 链接，先从最终效果理解项目。
3. 优先阅读线上页面或 `index.html`，再看 `data/`、`assets/`、`scripts/` 等生成材料。
4. 如果要修改内容，先小范围改动，再运行本 README 中的验证命令。

### Clone This Repository

```bash
git clone https://github.com/siuserxiaowei/ai-programming-harness-meeting-2026-05-19.git
cd ai-programming-harness-meeting-2026-05-19
```

### Run Or View Locally

```bash
python3 -m http.server 8000
```

然后打开 `http://127.0.0.1:8000/`。

### Repository Map

| Path | Purpose |
| --- | --- |
| `README.md` | 项目入口说明，先读这里。 |
| `docs/` | 文档或 GitHub Pages 输出目录。 |
| `scripts/` | 构建、同步、生成或维护脚本。 |
| `sources/` | 项目目录。 |

### Maintenance Notes

- Keep this README in sync when the project purpose, live link, or run commands change.
- Prefer small, focused commits when changing code, data, or generated pages.
- Run the relevant build or validation command before publishing changes.
- If this is a generated/static archive, update the source data first, then regenerate the public files.

### Privacy And Safety

- Do not commit API keys, tokens, passwords, cookies, private URLs, or internal account data.
- Keep private source material out of public GitHub Pages output unless it has been explicitly cleared for publication.
- When in doubt, run a quick secret scan such as `rg -n "token|secret|password|access_key|authorization"` before pushing.
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
