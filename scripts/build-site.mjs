import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const docsDir = path.join(root, "docs");
const assetsDir = path.join(docsDir, "assets");
const sourcesDir = path.join(root, "sources");
const siteUrl = "https://siuserxiaowei.github.io/ai-programming-harness-meeting-2026-05-19/";
const minutesUrl = "https://vi8r050ecuz.feishu.cn/minutes/obcnps9561u841udh1852g3b";

mkdirSync(assetsDir, { recursive: true });

const nav = [
  ["index.html", "总览"],
  ["paradigm.html", "范式"],
  ["operating-system.html", "系统"],
  ["spec-playbook.html", "Spec"],
  ["toolchain.html", "工具链"],
  ["timeline.html", "时间线"],
  ["qa.html", "问答"],
  ["transcript.html", "逐字稿"],
  ["appendix.html", "附录"],
];

const chapters = [
  ["00:03", 3, "自动化开发痛点与会议开场", "会议说明了为什么要讨论 Harness：工具已经跨过能交付的门槛，但多人、多项目、多 Agent 并发时，真正暴露的是管理、验收和资源协调问题。"],
  ["07:00", 420, "从副驾到管理者", "林诚强调把 Agent 当作团队新人：给规范、架构、背景和最佳实践。并发上不去，往往不是模型不够强，而是驱动者还在用副驾心态盯每一行代码。"],
  ["13:00", 780, "Review 与经验沉淀", "代码 Review 不只是挑错，而是把重复问题沉淀成 Skills、检查点和自动验证。Agent 无状态，项目知识必须落到纸面和流程里。"],
  ["23:50", 1430, "模型选择与前端质量", "领先模型的 Token 成本低于人力成本；前端生成不稳时，应优先使用成熟组件库和自有业务组件，让 Agent 更专注业务逻辑。"],
  ["28:28", 1708, "复杂系统如何保持控制", "当 AI 给出的架构超出理解范围，建议砍掉复杂冗余，选择自己能解释、能验收、能长期维护的方案。"],
  ["33:21", 2001, "Harness 实践与多 Agent 协同", "团队开始踩通从自动化开发到自动化测试验收的链路，但 Agent 间缺乏协调、测试闭环不足和缺少收口人，是并发开发的典型痛点。"],
  ["39:47", 2387, "多端测试与认知债务", "多端开发需要观测工具和自动化测试闭环。术语不准、变量歧义、任务边界不清都会形成认知债务，放大 Agent 理解偏差。"],
  ["49:23", 2963, "个人生产力与 Token 并发", "高并发开发像种菜收菜：并发度从手动推进，到多 Agent 协作，再到睡眠开发逐步抬升。Markdown 可作为 Agent 生命周期和交接的协调层。"],
  ["57:41", 3461, "Spec 设计与量化指标", "Spec 不追求 100% 预言未来，85%-90% 完整度更实际。新增变化应控制在约 15% 内，增删比可用来观察是否发生不健康重构。"],
  ["01:04:36", 3876, "Worktree 分歧", "Worktree 能解决并行文件冲突，也会带来合并、端口、上下文污染和 Token 成本。结论不是一刀切，而是把选择权交给项目复杂度。"],
  ["01:14:26", 4466, "ToB/ToC Spec 与分层", "ToB 更重视组件抽象、子系统复用和表结构/API 分层；ToC 更容易被体验细节拉扯。Spec 应先讨论业务，再落表结构，避免相互污染。"],
  ["01:30:52", 5452, "前端检查点与设计稿", "可用 Kimi 等工具基于 Markdown Spec 生成设计稿，再设置硬约束检查点，把前后端雏形串起来。测试可交给 AI 一部分，但细节仍要人验收。"],
  ["01:35:58", 5758, "资源感知", "资源感知包括端口、CPU、GPU、线上线下性能差异。用 Markdown 维护资源列表，可以避免多个项目并发时抢端口、抢算力、抢上下文。"],
  ["01:39:36", 5976, "模型能力与领域知识", "模型效果受领域知识沉淀影响。公开数据充分、流程标准的领域更适合模型接管；创新领域仍需要专家判断和频繁校验。"],
  ["01:50:10", 6610, "页面设计工具", "早期验证不必把 Figma 当唯一入口。可以用 GPT 图像、Stitch、Dribbble/Behance 参考稿和站点 CSS 总结来形成风格约束。"],
  ["01:53:13", 6793, "后端分层与脚手架", "后端可按数据层、算法层、业务逻辑层拆分。成熟脚手架和现有框架源码能帮助 AI 更快理解关键流程节点。"],
  ["02:02:34", 7354, "产品经理交付方式", "产品经理不只交 PRD 和原型，而应尽量产出 MVP，由开发和 Agent 反向评审、生成说明文档并做工程化收口。"],
  ["02:09:36", 7776, "收尾与后续分享", "会议确认会整理录音稿，并保持小范围高密度交流。模型能力变化很快，定期同步比一次性结论更可靠。"],
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraph(text) {
  return `<p>${escapeHtml(text)}</p>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function cards(items, extra = "") {
  return `<div class="grid ${extra}">${items.map((item) => `
    <article class="card">
      ${item.kicker ? `<span class="metric">${escapeHtml(item.kicker)}</span>` : ""}
      <h3>${escapeHtml(item.title)}</h3>
      ${Array.isArray(item.body) ? item.body.map(paragraph).join("") : paragraph(item.body)}
    </article>`).join("")}</div>`;
}

function page(filename, title, description, body) {
  const current = filename;
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}｜AI 编程与 Harness 工程研讨会</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${siteUrl}assets/harness-map.svg">
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
  <a class="skip" href="#main">跳到正文</a>
  <header class="topbar">
    <a class="brand" href="index.html"><span class="brand-mark"></span><span>Harness Dossier</span></a>
    <nav class="nav" aria-label="主导航">
      ${nav.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
  </header>
  <main id="main">
    ${body}
  </main>
  <footer class="footer">
    <p>AI 编程与 Harness 工程研讨会 · 2026-05-19 · Public GitHub Pages dossier</p>
  </footer>
</body>
</html>
`;
  writeFileSync(path.join(docsDir, filename), html, "utf8");
}

function pageHero({ eyebrow, h1, lede, chips = [] }) {
  return `<section class="page-hero">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h1>${escapeHtml(h1)}</h1>
    <p class="lede">${escapeHtml(lede)}</p>
    ${chips.length ? `<div class="hero-meta">${chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("")}</div>` : ""}
  </section>`;
}

function section(kicker, title, intro, content) {
  return `<section class="section">
    <div class="section-head">
      <p class="kicker">${escapeHtml(kicker)}</p>
      <h2>${escapeHtml(title)}</h2>
      ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
    </div>
    ${content}
  </section>`;
}

function parseTranscript() {
  const namedFile = path.join(sourcesDir, "local-named-transcript.txt");
  try {
    const named = readFileSync(namedFile, "utf8");
    const namedSegments = [];
    let current = null;
    for (const rawLine of named.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line) continue;
      const match = line.match(/^(.+?)\((\d{2}:\d{2}:\d{2})\):\s*(.*)$/);
      if (match) {
        if (current) namedSegments.push(current);
        current = { speaker: match[1], time: match[2], text: match[3] ? [match[3]] : [] };
        continue;
      }
      if (current) current.text.push(line);
    }
    if (current) namedSegments.push(current);
    if (namedSegments.length) return namedSegments;
  } catch {
    // Fall back to Feishu's speaker-numbered transcript.
  }

  const file = path.join(sourcesDir, "transcript.md");
  let md = "";
  try {
    md = readFileSync(file, "utf8");
  } catch {
    return [];
  }
  const lines = md.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const segments = [];
  let current = null;
  for (const line of lines) {
    if (line.startsWith("#") || line.startsWith(">")) continue;
    const match = line.match(/^说话人\s+(\d+)\s+(\d{2}:\d{2}:\d{2})(?:\s+(.*))?$/);
    if (match) {
      if (current) segments.push(current);
      current = { speaker: `说话人 ${match[1]}`, time: match[2], text: match[3] ? [match[3]] : [] };
      continue;
    }
    if (current) current.text.push(line);
  }
  if (current) segments.push(current);
  return segments;
}

function transcriptHtml() {
  const segments = parseTranscript();
  if (!segments.length) {
    return `<div class="card"><p>逐字稿尚未生成。请先运行 <code>node scripts/fetch-sources.mjs</code>。</p></div>`;
  }
  return `<div class="transcript-list">
    ${segments.map((segment, index) => `
      <article class="transcript-item" id="t${index + 1}">
        <div class="stamp"><span>${escapeHtml(segment.time)}</span><strong>${escapeHtml(segment.speaker)}</strong></div>
        <p>${escapeHtml(segment.text.join(" "))}</p>
      </article>`).join("")}
  </div>`;
}

function timelineHtml() {
  return `<div class="timeline">
    ${chapters.map(([time, seconds, title, body]) => `
      <article class="timeline-item">
        <a class="time" href="${minutesUrl}?t=${seconds * 1000}" target="_blank" rel="noreferrer">${escapeHtml(time)}</a>
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </div>
      </article>`).join("")}
  </div>`;
}

const css = `
:root {
  --paper: #f6f1e7;
  --paper-soft: #fffaf0;
  --ink: #15201d;
  --muted: #65736d;
  --line: rgba(21, 32, 29, .18);
  --teal: #0a6f68;
  --blue: #245e85;
  --brick: #b64b36;
  --gold: #a57b21;
  --violet: #5d558f;
  --panel: rgba(255, 250, 240, .86);
  --shadow: 0 24px 70px rgba(21, 32, 29, .13);
  --radius: 8px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--paper); }
body {
  margin: 0;
  color: var(--ink);
  background:
    linear-gradient(90deg, rgba(21, 32, 29, .045) 1px, transparent 1px) 0 0 / 42px 42px,
    linear-gradient(0deg, rgba(21, 32, 29, .035) 1px, transparent 1px) 0 0 / 42px 42px,
    linear-gradient(120deg, rgba(10, 111, 104, .06), rgba(182, 75, 54, .05) 42%, rgba(36, 94, 133, .06)),
    var(--paper);
  font-family: Georgia, "Songti SC", "Noto Serif CJK SC", "SimSun", serif;
  line-height: 1.72;
}
a { color: inherit; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .92em; }
.skip {
  position: absolute;
  left: 16px;
  top: -48px;
  z-index: 20;
  padding: 8px 12px;
  background: var(--ink);
  color: var(--paper-soft);
  border-radius: 6px;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.skip:focus { top: 16px; }
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 13px clamp(18px, 5vw, 72px);
  border-bottom: 1px solid var(--line);
  background: rgba(246, 241, 231, .92);
  backdrop-filter: blur(14px);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-weight: 800;
  font-size: 13px;
  white-space: nowrap;
}
.brand-mark {
  width: 23px;
  height: 23px;
  border: 1px solid var(--ink);
  background:
    linear-gradient(135deg, var(--teal) 0 50%, transparent 50%),
    linear-gradient(315deg, var(--brick) 0 50%, var(--paper-soft) 50%);
}
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 7px;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 13px;
}
.nav a {
  text-decoration: none;
  padding: 6px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 250, 240, .66);
}
.nav a[aria-current="page"], .nav a:hover { color: var(--paper-soft); background: var(--ink); }
main { min-height: 80vh; }
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, .9fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: center;
  padding: 70px clamp(18px, 5vw, 72px) 40px;
}
.page-hero { max-width: 1160px; padding: 64px clamp(18px, 5vw, 72px) 24px; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 18px;
  padding: 6px 10px;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 250, 240, .72);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 13px;
}
.eyebrow::before {
  content: "";
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--brick);
  box-shadow: 15px 0 0 var(--teal), 30px 0 0 var(--blue);
  margin-right: 28px;
}
h1, h2, h3 { margin-top: 0; line-height: 1.15; letter-spacing: 0; }
h1 { margin-bottom: 22px; font-size: clamp(36px, 6.2vw, 82px); max-width: 980px; }
h2 { margin-bottom: 16px; font-size: clamp(28px, 4vw, 48px); }
h3 { margin-bottom: 10px; font-size: clamp(20px, 2.2vw, 27px); }
p { margin-top: 0; }
.lede {
  max-width: 820px;
  color: #33413c;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: clamp(17px, 2vw, 22px);
  line-height: 1.82;
}
.hero-meta, .chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.chip {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel);
  color: #293630;
  font-size: 13px;
}
.board {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255, 250, 240, .88);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.board img, .board svg { display: block; width: 100%; height: auto; }
.section { padding: 54px clamp(18px, 5vw, 72px); }
.section.tight { padding-top: 28px; padding-bottom: 32px; }
.section-head { max-width: 880px; margin-bottom: 24px; }
.section-head p {
  color: var(--muted);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.kicker {
  margin-bottom: 8px;
  color: var(--brick);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid.four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.card {
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}
.card h3 { font-size: clamp(19px, 2vw, 25px); }
.card p, .card li {
  color: #3c4944;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.card ul { padding-left: 20px; margin: 0; }
.metric {
  display: inline-flex;
  margin-bottom: 14px;
  color: var(--teal);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 13px;
  font-weight: 800;
}
.toc {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.toc a {
  min-height: 112px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  text-decoration: none;
}
.toc a strong { display: block; margin-bottom: 8px; font-size: 21px; }
.toc a span {
  color: var(--muted);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.quote {
  max-width: 980px;
  margin: 0;
  padding: 28px;
  border-left: 6px solid var(--brick);
  background: rgba(255, 250, 240, .78);
  font-size: clamp(25px, 3.8vw, 44px);
  line-height: 1.36;
}
.quote cite {
  display: block;
  margin-top: 18px;
  color: var(--muted);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  font-style: normal;
}
.timeline { max-width: 1080px; }
.timeline-item {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 18px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
}
.timeline-item .time {
  color: var(--blue);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-weight: 800;
  text-decoration: none;
}
.timeline-item p, .transcript-item p, .source-note {
  color: #3c4944;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.table th, .table td { padding: 13px 14px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.table th { color: var(--ink); background: rgba(21, 32, 29, .06); }
.table tr:last-child td { border-bottom: 0; }
.transcript-list { max-width: 1040px; }
.transcript-item {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 18px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
}
.stamp {
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  color: var(--muted);
}
.stamp span, .stamp strong { display: block; }
.stamp span { color: var(--blue); font-weight: 800; }
.stamp strong { color: var(--ink); }
.source-note {
  max-width: 920px;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}
.footer {
  padding: 34px clamp(18px, 5vw, 72px);
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 13px;
}
@media (max-width: 920px) {
  .topbar { align-items: flex-start; flex-direction: column; }
  .nav { justify-content: flex-start; }
  .hero { grid-template-columns: 1fr; padding-top: 44px; }
  .grid, .grid.two, .grid.four, .toc { grid-template-columns: 1fr; }
  .timeline-item, .transcript-item { grid-template-columns: 1fr; gap: 6px; }
  h1 { font-size: clamp(34px, 11vw, 62px); }
}
`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720" role="img" aria-labelledby="title desc">
  <title id="title">Harness Engineering 会议知识地图</title>
  <desc id="desc">从管理者心态、Spec、看板、Worktree、Review、资源感知到公开文档的关系图。</desc>
  <rect width="960" height="720" fill="#fffaf0"/>
  <g fill="none" stroke="#15201d" stroke-opacity=".16">
    <path d="M80 120H880M80 240H880M80 360H880M80 480H880M80 600H880"/>
    <path d="M160 70V650M320 70V650M480 70V650M640 70V650M800 70V650"/>
  </g>
  <g font-family="PingFang SC, Microsoft YaHei, sans-serif">
    <rect x="330" y="278" width="300" height="118" rx="8" fill="#15201d"/>
    <text x="480" y="326" fill="#fffaf0" font-size="28" font-weight="800" text-anchor="middle">Harness Engineering</text>
    <text x="480" y="362" fill="#d8e4de" font-size="18" text-anchor="middle">管理 Agent 的工程系统</text>
    <g fill="#fffaf0" stroke="#15201d" stroke-width="2">
      <rect x="80" y="96" width="230" height="96" rx="8"/>
      <rect x="650" y="96" width="230" height="96" rx="8"/>
      <rect x="80" y="510" width="230" height="96" rx="8"/>
      <rect x="650" y="510" width="230" height="96" rx="8"/>
      <rect x="365" y="90" width="230" height="88" rx="8"/>
      <rect x="365" y="520" width="230" height="88" rx="8"/>
    </g>
    <g fill="#15201d" font-size="22" font-weight="800" text-anchor="middle">
      <text x="195" y="135">管理者心态</text>
      <text x="765" y="135">Spec 契约</text>
      <text x="195" y="550">看板与 Worktree</text>
      <text x="765" y="550">Review 沉淀</text>
      <text x="480" y="127">资源感知</text>
      <text x="480" y="557">公开复盘</text>
    </g>
    <g fill="#65736d" font-size="15" text-anchor="middle">
      <text x="195" y="164">从写代码转向分派与验收</text>
      <text x="765" y="164">让任务边界可执行</text>
      <text x="195" y="579">控制并发与冲突成本</text>
      <text x="765" y="579">把错误变成 Skills</text>
      <text x="480" y="154">端口 CPU GPU 上下文</text>
      <text x="480" y="584">把经验变成团队资产</text>
    </g>
    <g stroke-width="3" fill="none">
      <path d="M310 146 C380 190 410 230 438 278" stroke="#0a6f68"/>
      <path d="M650 146 C580 190 548 230 522 278" stroke="#245e85"/>
      <path d="M310 548 C382 500 412 452 443 396" stroke="#b64b36"/>
      <path d="M650 548 C578 500 548 452 518 396" stroke="#a57b21"/>
      <path d="M480 178V278" stroke="#5d558f"/>
      <path d="M480 396V520" stroke="#0a6f68"/>
    </g>
  </g>
</svg>
`;

writeFileSync(path.join(assetsDir, "styles.css"), css.trim() + "\n", "utf8");
writeFileSync(path.join(assetsDir, "harness-map.svg"), svg, "utf8");
writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

page(
  "index.html",
  "总览",
  "AI 编程与 Harness 工程研讨会公开复盘：从副驾到管理者，用 Spec、看板、Worktree、Review 和资源感知管理多 Agent 工程。",
  `<section class="hero">
    <div>
      <p class="eyebrow">2026-05-19 · AI 编程与 Harness 工程研讨会</p>
      <h1>从副驾到管理者，才是 AI 编程的真正拐点</h1>
      <p class="lede">这场会的价值不在于又列了一批工具，而是把 AI 编程的重心从“让模型写代码”拉回到工程组织：怎么给 Agent 上下文，怎么拆任务，怎么并发，怎么验收，怎么把一次 Review 变成下一次自动避免的错误。</p>
      <div class="hero-meta">
        <span class="chip">约 2 小时 10 分钟</span>
        <span class="chip">10 位左右发言者</span>
        <span class="chip">18 段时间线</span>
        <span class="chip">公开逐字稿</span>
        <span class="chip">GitHub Pages 专题站</span>
      </div>
    </div>
    <figure class="board"><img src="assets/harness-map.svg" alt="Harness Engineering 会议知识地图"></figure>
  </section>
  ${section("Core", "会议浓缩成 3 句话", "如果只读这一页，先记住这三个判断。", cards([
    { kicker: "01", title: "Agent 不是副驾，是需要管理的新成员", body: "模型能力已经足够可用，瓶颈转向上下文构建、任务分派、验收标准和工程治理。开发者角色从亲自写代码，变成技术负责人、Reviewer 和流程设计者。" },
    { kicker: "02", title: "并发不是堆窗口，而是建系统", body: "多 Agent 并发需要看板、Issue、分支/Worktree、自动测试、资源列表和收口机制。否则只是把一个人的混乱放大到多个进程。" },
    { kicker: "03", title: "经验必须沉淀成可执行约束", body: "Review 发现的问题不能停留在口头经验，要变成 Skills、检查点、模板、脚手架和自动验证。这样下一轮 Agent 才不会从零开始。" },
  ]))}
  ${section("Map", "专题入口", "这份在线文档按工程问题拆成多页，适合复盘、转发和后续训练团队。", `<div class="toc">
    <a href="paradigm.html"><strong>范式转变</strong><span>副驾到管理者</span></a>
    <a href="operating-system.html"><strong>多 Agent 操作系统</strong><span>看板 / Worktree / Review</span></a>
    <a href="spec-playbook.html"><strong>Spec Playbook</strong><span>Meta Spec / 分层 / 资源</span></a>
    <a href="toolchain.html"><strong>工具链与趋势</strong><span>模型 / 前端 / 后端</span></a>
    <a href="timeline.html"><strong>时间线</strong><span>18 个章节带跳转</span></a>
    <a href="qa.html"><strong>问答与分歧</strong><span>复杂系统 / PM / 前端</span></a>
    <a href="transcript.html"><strong>公开逐字稿</strong><span>说话人 + 时间戳</span></a>
    <a href="appendix.html"><strong>附录</strong><span>术语 / 指标 / 行动清单</span></a>
  </div>`)}
  ${section("Tension", "最大分歧：Worktree 是工具，不是信仰", "会议里最值得保留的不是“用不用 Worktree”的结论，而是做选择的判断框架。", cards([
    { title: "支持 Worktree 的理由", body: "它能隔离并行开发，减少多个 Agent 同时改同一份文件的冲突，也天然适配 Issue 到分支、PR 到 Review 的标准流程。" },
    { title: "谨慎使用的理由", body: "它会增加合并成本、端口和资源分配问题，也可能让上下文污染和 Token 消耗变重。小项目或强耦合任务不一定划算。" },
    { title: "更稳妥的判断", body: "把 Worktree 当作并发放大器，而不是默认答案。先把单 Agent 管好，再拉到三个，再到十个；每一级都要有验收和回收机制。" },
  ]))}
  <section class="section"><blockquote class="quote">“一个人只有管理好一个 Agent，才可能管理好三个；管理好三个，才可能管理好十个。”<cite>会议核心判断，来自逐字稿与智能纪要交叉整理</cite></blockquote></section>
  <section class="section tight"><p class="source-note">来源：飞书智能纪要、文字记录、妙记 AI 产物与用户提供摘要。内部临时媒体下载链接已移除；会议正文和逐字稿按公开资料整理。</p></section>`
);

page(
  "paradigm.html",
  "AI 编程范式",
  "AI 编程的角色变化：从副驾式提示到管理者式工程组织。",
  pageHero({
    eyebrow: "Paradigm",
    h1: "AI 编程不是更快地写代码，而是更早地进入管理状态",
    lede: "会议反复回到同一个问题：为什么同样使用 Claude Code、Codex 或其他编码工具，有的人只能开一个窗口，有的人能管理多个 Agent 并发？答案不是提示词魔法，而是角色定位。",
    chips: ["Agent 是新人", "上下文是入职培训", "Review 是带教", "自动验证是制度"],
  }) +
  section("Shift", "从副驾到管理者", "副驾模式关注“下一行代码怎么写”，管理者模式关注“任务如何被理解、执行、验收和沉淀”。", cards([
    { title: "副驾模式", body: "人盯着局部实现，频繁修补模型输出；注意力被代码细节吃掉，很难开启更高并发。" },
    { title: "管理者模式", body: "人定义目标、边界、质量标准和上下文，让 Agent 完成一段可验收的工作，再通过 Review 把经验沉淀下来。" },
    { title: "关键转折", body: "当模型代码质量达到可用水准后，继续把它当工具会浪费杠杆；把它当团队成员，才会自然引出规范、看板、Review 和培训材料。" },
  ])) +
  section("Mental Model", "Agent 的无状态决定了文档的重要性", "人对项目的理解会随时间沉淀，Agent 每次启动都像新人报到。这个差异解释了为什么项目规范比过去更重要。", cards([
    { kicker: "Context", title: "上下文不是提示词装饰", body: "项目背景、架构设计、业务边界、目录约定、复用原则和禁区都要前置。给得越清楚，Agent 越可能按团队方式工作。" },
    { kicker: "Scope", title: "范围要比能力更重要", body: "模型会倾向完成目标，有时会引入过度设计。驱动者要明确这是小工具、MVP、企业系统还是长期平台，避免它替你膨胀架构。" },
    { kicker: "Trust", title: "信任不是放任", body: "信任意味着把任务交出去，但同时建立验收、自动测试、代码 Review 和回滚机制。没有制度的信任，只会变成失控。" },
  ], "three")) +
  section("Practice", "管理者心态的落地动作", "把抽象心态翻译成每天能执行的动作。", `<table class="table">
    <thead><tr><th>动作</th><th>目的</th><th>会议里的含义</th></tr></thead>
    <tbody>
      <tr><td>写清项目规范</td><td>降低每次启动成本</td><td>让无状态 Agent 进入项目时不再从零理解。</td></tr>
      <tr><td>任务前对齐范围</td><td>防止过度设计</td><td>先说清要简单实现、MVP 还是平台化能力。</td></tr>
      <tr><td>阶段性 Review</td><td>捕捉可沉淀错误</td><td>把问题转成 Skills、检查点和自动验证。</td></tr>
      <tr><td>循序提高并发</td><td>保护注意力</td><td>先管好一个 Agent，再管三个，再考虑十个。</td></tr>
    </tbody>
  </table>`)
);

page(
  "operating-system.html",
  "多 Agent 操作系统",
  "多 Agent 并发协作的工程系统：看板、Worktree、PR、Review、Token 和增删比。",
  pageHero({
    eyebrow: "Operating System",
    h1: "多 Agent 并发需要一套操作系统",
    lede: "会议把多 Agent 协作讲得很具体：看板收集需求，Issue 定义任务，Worktree 隔离并行，PR 承接 Review，指标监控健康度，资源列表防止项目互相踩踏。",
    chips: ["看板", "Issue", "Worktree", "PR Review", "Token", "增删比"],
  }) +
  section("Board", "看板是并发控制台", "当开发者从副驾变成管理者，看板就从辅助工具变成工作台。", cards([
    { title: "收集入口", body: "看板把团队意见、用户反馈、邮件、GitHub Issues 和临时想法放到一个池子里，避免任务散落在聊天记录里。" },
    { title: "并发分派", body: "每张卡片对应明确目标、范围和验收条件。Agent 不直接接收模糊愿望，而是接收可以执行的工作单元。" },
    { title: "收口与复盘", body: "完成不等于结束。卡片要记录 Review 结果、遗漏测试、复用经验和是否需要沉淀为 Skill。" },
  ])) +
  section("Worktree", "Worktree 的正确位置", "Worktree 是隔离并发的手段，但会议没有把它神化。", cards([
    { kicker: "Use", title: "适合使用", body: "多个相对独立 feature 并行推进，文件冲突概率高，需要每个 Agent 拥有独立分支和工作目录。" },
    { kicker: "Avoid", title: "谨慎使用", body: "任务强耦合、仓库很小、上下文需要频繁共享，或合并成本高于并发收益时，Worktree 反而会增加管理负担。" },
    { kicker: "Rule", title: "判断原则", body: "先问是否能降低冲突和等待，再问是否能承受合并、端口、依赖安装和 Token 上下文成本。" },
  ])) +
  section("Metrics", "Token 与增删比是健康信号", "会议提到的指标不是为了炫耀消耗，而是为了判断系统是否进入不健康重构。", `<table class="table">
    <thead><tr><th>指标</th><th>健康解释</th><th>需要警惕的信号</th></tr></thead>
    <tbody>
      <tr><td>Token 消耗</td><td>并发扩大后自然升高，关键看是否换来可验收产出。</td><td>消耗暴涨但 PR 无法合并，说明任务边界或上下文设计有问题。</td></tr>
      <tr><td>Deletions / Additions</td><td>约 12%-15% 被视为较健康的收敛区间，5%-6% 可能说明质量更稳。</td><td>超过 30% 可能发生局部或全局重构，需要检查 Agent 是否误改架构。</td></tr>
      <tr><td>Review 发现数</td><td>早期多很正常，后续应随着 Skills 和检查点沉淀逐步下降。</td><td>同类问题重复出现，说明经验没有进入自动验证或项目规范。</td></tr>
    </tbody>
  </table>`) +
  section("Loop", "一条可执行的多 Agent 循环", "把会议讨论收束成一个操作闭环。", cards([
    { title: "1. 从看板挑任务", body: "任务必须有目标、非目标、文件/模块边界、验收方式和回滚判断。" },
    { title: "2. 分配执行环境", body: "根据复杂度决定是否开 Worktree，并在资源表中登记端口、服务、GPU/CPU 占用。" },
    { title: "3. Agent 实现与自测", body: "要求 Agent 先理解现有结构，再提交最小可 Review 的改动，不顺手做无关重构。" },
    { title: "4. 人类 Review", body: "Review 重点看行为回归、过度设计、复用缺失、测试空洞和资源冲突。" },
    { title: "5. 沉淀为约束", body: "把重复问题转成 Skill、模板、Lint、测试或检查清单，降低下一次管理成本。" },
    { title: "6. 合并与复盘", body: "PR 合并后记录指标和经验。并发不是越高越好，而是每一轮都能稳定收菜。" },
  ], "two"))
);

page(
  "spec-playbook.html",
  "Spec Playbook",
  "Meta Spec、分层 Spec、资源感知和前后端工程规范的整理。",
  pageHero({
    eyebrow: "Spec Playbook",
    h1: "Spec 是任务契约，不是漂亮文档",
    lede: "会议里对 Spec 的讨论非常务实：它不需要预测所有未来，但要覆盖足够多的安全、性能、资源、接口和业务边界，让 Agent 不靠猜来写系统。",
    chips: ["Meta Spec", "85%-90% 完整度", "分层拆解", "资源感知", "检查点"],
  }) +
  section("Meta", "先有 Meta Spec，再裁剪具体项目", "Meta Spec 是可复用的通用规范底座。", cards([
    { title: "通用维度", body: "安全、性能、用户体验、数据边界、错误处理、测试策略、部署资源和监控口径都应先沉淀为默认规范。" },
    { title: "项目裁剪", body: "新项目不是从空白开始写 Spec，而是在 Meta Spec 上删减、补充和具体化。这样 Spec 周期可以从一个月压缩到数天。" },
    { title: "合理完整度", body: "会议建议 Spec 完整度控制在 85%-90%，为未来 3-6 个月变化留空间。追求 100% 往往会拖慢启动。" },
  ])) +
  section("Layers", "分层拆解：业务、表结构、API、组件", "ToB 项目尤其需要把可复用子系统拆出来。", cards([
    { title: "业务逻辑先行", body: "先讨论产品需求和业务主流程，再确定表结构和接口。过早进入数据库设计会污染需求讨论。" },
    { title: "子系统复用", body: "权限管理、商户端、账户系统、资源管理等能力应被沉淀成可复用模块，而不是每个版本重做一次。" },
    { title: "前后端契约", body: "前端需要集中 mock 数据和接口结构，后端按数据层、算法层、业务逻辑层拆分，双方用契约而不是口头同步。" },
  ])) +
  section("Checkpoints", "检查点比口头偏好可靠", "会议提到前端和后端都要设硬约束。", `<table class="table">
    <thead><tr><th>领域</th><th>检查点</th><th>作用</th></tr></thead>
    <tbody>
      <tr><td>前端</td><td>组件库优先、统一 ID 类型、长文本不撑破布局、多端一致性、关键流程截图验收。</td><td>减少 AI 味和反复改坏旧逻辑。</td></tr>
      <tr><td>后端</td><td>数据层/算法层/业务层分离，脚手架约定目录，API 与数据结构分开封装。</td><td>让不可见后端也能被逐层验收。</td></tr>
      <tr><td>资源</td><td>端口、CPU、GPU、外部服务、测试账号、线上线下差异写入 Markdown。</td><td>防止多项目并发时互相抢资源。</td></tr>
      <tr><td>质量</td><td>KISS、DRY、复用公共类、自动测试、Review 后转 Skill。</td><td>把治理从人工提醒变成制度。</td></tr>
    </tbody>
  </table>`) +
  section("Template", "一份最小可用 Spec 应该回答什么", "这是从会议观点抽象出的执行模板。", cards([
    { title: "目标与非目标", body: "这次要解决什么，不解决什么，什么情况算过度设计。" },
    { title: "上下文入口", body: "业务背景、现有架构、关键文件、术语表、禁止改动区。" },
    { title: "接口与数据", body: "输入输出、表结构、API shape、mock 数据、错误状态。" },
    { title: "验收与测试", body: "功能路径、回归风险、自动测试命令、人工检查点。" },
    { title: "资源与环境", body: "端口、服务依赖、CPU/GPU、外部凭证、部署差异。" },
    { title: "沉淀方式", body: "本次 Review 里哪些问题要转成 Skill、模板、脚手架或自动检查。" },
  ], "two"))
);

page(
  "toolchain.html",
  "工具链与趋势",
  "模型选择、前端设计工具、后端脚手架、技术栈演进和定期同步机制。",
  pageHero({
    eyebrow: "Toolchain",
    h1: "工具链选择的原则：用领先模型，但不要把工具当答案",
    lede: "会议对工具的态度很清醒：领先模型值得花钱，因为 Token 远低于人力成本；但真正决定质量的是组件库、脚手架、设计参考、测试闭环和团队规范。",
    chips: ["Claude Code", "Codex", "Kimi", "Gemini", "Stitch", "Go Zero", "Rust"],
  }) +
  section("Models", "模型选择：优先领先模型，持续重新评估", "模型能力变化很快，旧经验会过期。", cards([
    { title: "Token 成本低于人力成本", body: "会议里明确建议尽量使用领先模型。一个中级工程师的人力成本远高于模型订阅和 Token。" },
    { title: "按任务选模型", body: "Kimi 适合大面研究和设计方向铺开，Gemini 更适合追求事实细节，Codex/Claude Code 各自适合不同编码工作流。" },
    { title: "定期同步", body: "三个月可能就是模型两代变化。团队应定期分享模型跨过哪些门槛，而不是固守半年前的判断。" },
  ])) +
  section("Frontend", "前端：先借成熟系统，再让 AI 做业务", "前端难点不是能不能生成页面，而是审美、状态、回归和多端一致性。", cards([
    { title: "组件库是地基", body: "Ant Design 等成熟组件库能把基础控件质量稳定下来，自有业务组件则减少重复生成和反复改坏。" },
    { title: "设计稿不必只靠 Figma", body: "早期验证可用 GPT 图像、Stitch、Dribbble/Behance 参考稿和站点 CSS 总结来形成风格约束。" },
    { title: "人仍要验收视觉", body: "模型对视觉理解有限。布局、长文本、移动端、状态切换和细节一致性仍需要人工检查。" },
  ])) +
  section("Backend", "后端：脚手架不是落后，而是压缩认知成本", "后端可见性差，更依赖分层和稳定流程。", cards([
    { title: "分层开发", body: "把数据层、算法层和业务逻辑层分开，围绕关键流程节点推进，而不是让 Agent 在整套系统里自由游走。" },
    { title: "参考成熟框架", body: "Go Zero、现有优秀框架源码和旧项目都可以作为脚手架参考。让 AI 读懂关键节点，再迁移到新项目。" },
    { title: "未来语言选择会变化", body: "会议提到 Rust 等高性能语言可能随着模型能力提升变得更可用。语言选择不只看人会不会，也看模型能否稳定产出。" },
  ])) +
  section("Trend", "行业趋势：认知债务会变成最大债务", "当模型会写代码后，真正昂贵的是表达不清和概念混乱。", cards([
    { title: "术语要精确", body: "变量、模块、角色、业务对象和行业术语越混乱，模型越容易生成貌似合理但方向错误的方案。" },
    { title: "默认答案会越来越好", body: "模型对标准后端、常见业务和公开知识领域会持续变强，冷启动脚手架会越来越接近最佳实践。" },
    { title: "创新领域仍需专家", body: "当领域知识未被大规模写入模型，或任务本身没有标准答案，专家判断和实验反馈仍不可替代。" },
  ]))
);

page(
  "timeline.html",
  "时间线",
  "按飞书妙记时间戳组织的 AI 编程与 Harness 工程研讨会章节复盘。",
  pageHero({
    eyebrow: "Timeline",
    h1: "2 小时 10 分钟，被拆成 18 个工程问题",
    lede: "时间线保留飞书妙记跳转，方便回到原始语境。公开正文则做二次提炼，避免把逐字稿当成总结。",
    chips: ["00:03 开场", "57:41 Spec", "01:04:36 Worktree", "02:09:36 收尾"],
  }) + section("Chapters", "章节复盘", "点击时间戳可打开飞书妙记对应位置。", timelineHtml())
);

page(
  "qa.html",
  "问答与分歧",
  "复杂系统控制、前端生成质量、产品经理交付方式和 Worktree 的关键分歧。",
  pageHero({
    eyebrow: "Q&A",
    h1: "问答真正暴露的是边界：什么能交给 AI，什么必须由人收口",
    lede: "会议后半段的价值在于具体问题：复杂系统看不懂怎么办、前端总改坏怎么办、产品经理如何交付、Worktree 到底值不值得用。这些问题比工具清单更接近真实工程。",
    chips: ["复杂系统", "前端质量", "产品交付", "Worktree 分歧"],
  }) +
  section("Complexity", "AI 设计出看不懂的系统怎么办", "问题来自复杂 AgentOS / A2A 类系统的管理困惑。", cards([
    { title: "回答的核心", body: "如果 AI 方案已经超出驱动者理解，很可能是过度设计或失控信号。不要追求“AI 做我完全做不了的复杂物”，而要选择自己能解释、能验收、能维护的方案。" },
    { title: "操作建议", body: "让 AI 给多个方案，挑自己理解范围内的最优方案；砍掉冗余抽象；把系统拆成可测试、可观测、可替换的小模块。" },
  ], "two")) +
  section("Frontend", "前端生成效果差、改动易破坏旧逻辑怎么办", "这个问题反复出现在 AI 编程实践中。", cards([
    { title: "不要让 AI 从零发明基础 UI", body: "用成熟组件库和设计系统兜底，基础控件越稳定，AI 越能把精力放在业务逻辑和页面状态。" },
    { title: "沉淀自有业务组件", body: "业务里反复出现的列表、表单、状态面板、工作流步骤要组件化。这样下一次不是重新生成，而是复用。" },
    { title: "保留视觉验收", body: "截图、移动端、长文本、交互状态和回归路径要人工检查。前端测试不能只看代码是否编译。" },
  ])) +
  section("PM", "产品经理在 AI 时代交付什么", "会议里的回答非常明确：只交 PRD 不够了。", cards([
    { title: "从文档到 MVP", body: "产品经理应尽量把 idea 做成能跑的 MVP，自己完成基础测试，再交给开发评审和工程化。" },
    { title: "反向生成说明文档", body: "让 AI 基于 MVP 代码生成说明文档，前后端开发再用自己的 Agent 评审、重构和部署。" },
    { title: "节省迭代时间", body: "这种方式可以减少传统 UI 评审、终审、开发、测试之间的等待，把讨论建立在可运行产品上。" },
  ])) +
  section("Disagreements", "值得保留的分歧", "好的会议不是消灭分歧，而是把分歧变成判断框架。", `<table class="table">
    <thead><tr><th>议题</th><th>立场 A</th><th>立场 B</th><th>整理后的判断</th></tr></thead>
    <tbody>
      <tr><td>Worktree</td><td>并行开发必须隔离工作树。</td><td>上下文污染和合并成本可能很高。</td><td>按项目复杂度和任务独立性选择，不默认。</td></tr>
      <tr><td>Spec 完整度</td><td>越全越能减少返工。</td><td>写太久会拖慢启动。</td><td>85%-90% 更实际，保留 15% 变化空间。</td></tr>
      <tr><td>设计工具</td><td>Figma/Sketch 可控性强。</td><td>早期验证可用 AI 图像和参考稿。</td><td>验证功能优先时不必追求像素级设计。</td></tr>
      <tr><td>脚手架</td><td>脚手架是古法编程残留。</td><td>脚手架能降低重复和认知成本。</td><td>标准流程可脚手架化，创新部分保留灵活度。</td></tr>
    </tbody>
  </table>`)
);

page(
  "transcript.html",
  "公开逐字稿",
  "AI 编程与 Harness 工程研讨会公开逐字稿整理版，优先保留命名发言者和时间戳。",
  pageHero({
    eyebrow: "Transcript",
    h1: "公开逐字稿整理版",
    lede: "本页优先使用用户补充的本地命名逐字稿，保留 Weiyang、林诚、kyo、船长等发言者名称和时间戳；飞书说话人编号版也保存在 sources 目录中。",
    chips: ["命名发言者", "时间戳", "全文公开", "可回溯"],
  }) + section("Full Transcript", "逐字稿", "以下内容用于回溯原始语境；建议先读总览和专题页，再用本页核对细节。", transcriptHtml())
);

page(
  "appendix.html",
  "附录",
  "AI 编程与 Harness 工程研讨会术语、行动清单、指标和来源链接。",
  pageHero({
    eyebrow: "Appendix",
    h1: "把会议变成可执行清单",
    lede: "附录把会议中的术语、指标、工具和下一步动作压缩成可复制的工作表，方便团队直接拿去改自己的流程。",
    chips: ["术语表", "行动清单", "指标表", "来源"],
  }) +
  section("Glossary", "术语表", "会议里的关键词很多，这里给出公开版解释。", `<table class="table">
    <thead><tr><th>术语</th><th>解释</th></tr></thead>
    <tbody>
      <tr><td>Harness Engineering</td><td>围绕 Agent 自动化开发、测试、验收、上线和反馈回收建立的一套工程组织方式。</td></tr>
      <tr><td>副驾模式</td><td>人盯着模型写代码，主要关注局部补全和修改。</td></tr>
      <tr><td>管理者模式</td><td>人定义目标、上下文、边界、验收和沉淀机制，把 Agent 当可管理成员。</td></tr>
      <tr><td>Meta Spec</td><td>跨项目复用的通用规范底座，包含安全、性能、资源、测试、体验等维度。</td></tr>
      <tr><td>Worktree</td><td>Git 的多工作树机制，可让多个分支在不同目录并行开发。</td></tr>
      <tr><td>认知债务</td><td>术语、边界、变量、业务对象表达不清造成的长期理解成本。</td></tr>
      <tr><td>资源感知</td><td>对端口、CPU、GPU、外部服务、线上线下差异等工程资源进行显式记录和管理。</td></tr>
    </tbody>
  </table>`) +
  section("Actions", "团队行动清单", "从明天就可以开始做的事情。", cards([
    { title: "建立 Agent 入职包", body: "整理项目背景、目录说明、架构图、复用原则、禁区、常用命令和测试方式。" },
    { title: "把看板作为任务入口", body: "所有 Agent 任务进入看板，卡片写清目标、范围、验收和资源要求。" },
    { title: "定义 Worktree 使用规则", body: "列出适用条件、命名规则、端口分配、合并流程和废弃回收方式。" },
    { title: "Review 后更新 Skills", body: "每次 Review 把重复错误沉淀成检查点、Skill、模板或自动测试。" },
    { title: "维护资源表", body: "用 Markdown 记录项目端口、CPU/GPU、服务依赖、账号和线上线下差异。" },
    { title: "定期模型复盘", body: "每 2-3 个月同步模型能力变化，更新默认模型、工具和工作流判断。" },
  ], "two")) +
  section("Metrics", "指标表", "指标不是 KPI，而是判断工程系统是否健康的仪表盘。", `<table class="table">
    <thead><tr><th>指标</th><th>建议观察</th><th>解释</th></tr></thead>
    <tbody>
      <tr><td>并发 Agent 数</td><td>1 → 3 → 10 逐级提升</td><td>每一级都应能稳定验收，再提高并发。</td></tr>
      <tr><td>Deletions / Additions</td><td>12%-15% 较健康，超过 30% 警惕</td><td>过高可能代表不必要重构或 Agent 失控。</td></tr>
      <tr><td>Spec 变化率</td><td>新增项尽量不超过 15%</td><td>说明前期 Spec 覆盖了主要方向，同时保留迭代空间。</td></tr>
      <tr><td>重复 Review 问题数</td><td>应逐轮下降</td><td>不下降说明经验没有变成自动约束。</td></tr>
      <tr><td>PR 可合并率</td><td>越高越好</td><td>衡量任务边界、测试和 Review 流程是否清晰。</td></tr>
    </tbody>
  </table>`) +
  section("Sources", "来源链接", "公开资料入口。", `<div class="card">
    <ul>
      <li>飞书智能纪要：<a href="https://vi8r050ecuz.feishu.cn/docx/ZJubd5uCPopKKzxRbu9ckkLpnFe" target="_blank" rel="noreferrer">自动化开发工具使用经验讨论 2026年5月19日</a></li>
      <li>飞书文字记录：<a href="https://vi8r050ecuz.feishu.cn/docx/XYKndOXkqoyleSx7TmycZVmUnuQ" target="_blank" rel="noreferrer">文字记录：自动化开发工具使用经验讨论</a></li>
      <li>飞书妙记：<a href="${minutesUrl}" target="_blank" rel="noreferrer">自动化开发工具使用经验讨论</a></li>
      <li>本仓库 sources 目录保存清洗后的 Markdown/JSON 导出。</li>
    </ul>
  </div>`)
);

writeFileSync(
  path.join(root, "README.md"),
  `# AI 编程与 Harness 工程研讨会公开专题站

这是一份基于 2026-05-19「自动化开发工具使用经验讨论」飞书智能纪要、文字记录、妙记 AI 产物和用户摘要整理的公开专题站。

在线页面：

\`\`\`text
${siteUrl}
\`\`\`

## 内容结构

- \`docs/index.html\`：总览、核心判断、会议地图、阅读入口。
- \`docs/paradigm.html\`：AI 编程范式转变，从副驾到管理者。
- \`docs/operating-system.html\`：多 Agent 协作系统，看板、Worktree、PR、Review、Token 与增删比。
- \`docs/spec-playbook.html\`：Meta Spec、分层 Spec、资源感知、前后端工程规范。
- \`docs/toolchain.html\`：模型选择、前端设计工具、后端脚手架、行业趋势。
- \`docs/timeline.html\`：按飞书妙记时间戳组织的章节复盘。
- \`docs/qa.html\`：问答与分歧。
- \`docs/transcript.html\`：公开逐字稿整理版。
- \`docs/appendix.html\`：术语表、行动清单、指标表、来源说明。
- \`sources/\`：飞书拉取结果、妙记产物和逐字稿导出。

## 来源说明

- 飞书智能纪要：\`ZJubd5uCPopKKzxRbu9ckkLpnFe\`
- 飞书文字记录：\`XYKndOXkqoyleSx7TmycZVmUnuQ\`
- 飞书妙记：\`obcnps9561u841udh1852g3b\`
- 用户补充本地逐字稿：\`sources/local-named-transcript.txt\`

原始资料中出现的飞书内部临时下载链接已移除；公开页面保留会议正文、观点、时间戳和逐字稿内容。

## 重新生成

\`\`\`bash
node scripts/fetch-sources.mjs
node scripts/build-site.mjs
\`\`\`
`,
  "utf8",
);

console.log(`Built site in ${docsDir}`);
