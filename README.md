# AI 编程与 Harness 工程研讨会公开专题站

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
