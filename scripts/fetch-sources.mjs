import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcesDir = path.join(root, "sources");
const minutesToken = "obcnps9561u841udh1852g3b";
const localNamedTranscriptPath =
  "/Users/siuserxiaowei/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_276exkqyuyd422_20a2/temp/RWTemp/2026-05/85d568c4934dc4bb8b4599af8c403969/20260519152735-Weiyang预定的会议-逐字稿文本-1(1).txt";

const docs = [
  {
    key: "smart-summary",
    label: "飞书智能纪要",
    token: "ZJubd5uCPopKKzxRbu9ckkLpnFe",
    url: "https://vi8r050ecuz.feishu.cn/docx/ZJubd5uCPopKKzxRbu9ckkLpnFe?from=from_copylink",
  },
  {
    key: "transcript",
    label: "飞书文字记录",
    token: "XYKndOXkqoyleSx7TmycZVmUnuQ",
    url: "https://vi8r050ecuz.feishu.cn/docx/XYKndOXkqoyleSx7TmycZVmUnuQ?from=from_copylink",
  },
];

mkdirSync(sourcesDir, { recursive: true });

function runLark(args) {
  return execFileSync("lark-cli", args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 80 * 1024 * 1024,
    stdio: ["ignore", "pipe", "inherit"],
  });
}

function scrubEphemeralLinks(value) {
  return value
    .replace(/!\[[^\]]*\]\(https:\/\/internal-api-drive-stream\.feishu\.cn\/[^)\s]+authcode\/\?code=[^)]+\)/g, "> [内部临时媒体链接已移除]")
    .replace(/https:\/\/internal-api-drive-stream\.feishu\.cn\/[^)\s]+authcode\/\?code=[^\s)"]+/g, "[内部临时媒体链接已移除]");
}

function writeJson(filePath, data) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

for (const doc of docs) {
  const output = runLark([
    "docs",
    "+fetch",
    "--api-version",
    "v2",
    "--doc",
    doc.url,
    "--doc-format",
    "markdown",
    "--format",
    "json",
    "--as",
    "user",
  ]);
  const json = JSON.parse(output);
  const content = scrubEphemeralLinks(json.data?.document?.content ?? "");
  if (json.data?.document) {
    json.data.document.content = content;
  }
  writeJson(path.join(sourcesDir, `${doc.key}.json`), json);
  writeFileSync(path.join(sourcesDir, `${doc.key}.md`), `${content.trim()}\n`, "utf8");
}

const minutesOutput = runLark([
  "vc",
  "+notes",
  "--minute-tokens",
  minutesToken,
  "--output-dir",
  "sources/minutes",
  "--overwrite",
  "--format",
  "json",
  "--as",
  "user",
]);
const minutesJson = JSON.parse(minutesOutput);
writeJson(path.join(sourcesDir, "minutes-artifacts.json"), minutesJson);

const transcriptFiles = [];
for (const note of minutesJson.data?.notes ?? []) {
  const file = note.artifacts?.transcript_file;
  if (file) transcriptFiles.push(file);
}

if (existsSync(localNamedTranscriptPath)) {
  const namedTranscript = scrubEphemeralLinks(readFileSync(localNamedTranscriptPath, "utf8"));
  writeFileSync(path.join(sourcesDir, "local-named-transcript.txt"), namedTranscript.trim() + "\n", "utf8");
}

writeFileSync(
  path.join(sourcesDir, "source-index.md"),
  [
    "# 来源索引",
    "",
    "本目录保存公开专题站生成所需的飞书来源导出。内部临时媒体 authcode 链接已移除，只保留会议内容本身。",
    "",
    "## 飞书链接",
    "",
    "- 智能纪要：https://vi8r050ecuz.feishu.cn/docx/ZJubd5uCPopKKzxRbu9ckkLpnFe",
    "- 文字记录：https://vi8r050ecuz.feishu.cn/docx/XYKndOXkqoyleSx7TmycZVmUnuQ",
    "- 妙记：https://vi8r050ecuz.feishu.cn/minutes/obcnps9561u841udh1852g3b",
    "",
    "## 本地文件",
    "",
    "- `smart-summary.md` / `smart-summary.json`：飞书智能纪要导出。",
    "- `transcript.md` / `transcript.json`：飞书文字记录导出。",
    existsSync(localNamedTranscriptPath) ? "- `local-named-transcript.txt`：用户补充的本地命名逐字稿，含 Weiyang、林诚、kyo、船长等发言者名称。" : "",
    "- `minutes-artifacts.json`：妙记 AI 产物索引。",
    ...transcriptFiles.map((file) => `- \`${file}\`：妙记逐字稿导出。`),
    "",
    "## 清洗规则",
    "",
    "- 移除了 `internal-api-drive-stream.feishu.cn/...authcode` 临时媒体下载链接。",
    "- 未对会议正文、时间戳、说话人编号做保密处理。",
    "",
  ].join("\n"),
  "utf8",
);

console.log(`Fetched ${docs.length} docs and minutes artifacts into ${sourcesDir}`);
