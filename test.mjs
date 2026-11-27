// TDD-lite tests for the one-sentence apology entry.
// Run: node test.mjs  (expects main.ts to exist and write entry.txt)
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

// 1. main.ts exists
check("main.ts exists", existsSync(join(repoDir, "main.ts")));

// 2. stdlib-only: no imports outside node:*
const src = existsSync(join(repoDir, "main.ts"))
  ? readFileSync(join(repoDir, "main.ts"), "utf8")
  : "";
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
check(
  "stdlib-only imports",
  imports.every((i) => i.startsWith("node:")),
  imports.join(", ") || "(none)",
);

// 3. run twice into temp dirs, outputs identical (deterministic) and valid
function runOnce() {
  const out = mkdtempSync(join(tmpdir(), "apology-out-"));
  const r = spawnSync(process.execPath, ["main.ts"], {
    cwd: repoDir,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: out },
    encoding: "utf8",
  });
  const file = join(out, "entry.txt");
  const text = existsSync(file) ? readFileSync(file, "utf8") : null;
  rmSync(out, { recursive: true, force: true });
  return { status: r.status, text, stderr: r.stderr };
}
const a = runOnce();
const b = runOnce();
check("program exits 0", a.status === 0, `status=${a.status} stderr=${a.stderr}`);
check("entry.txt written", a.text !== null);
check("deterministic output", a.text === b.text);
if (a.text !== null) {
  const len = [...a.text].length;
  check("1-200 chars", len >= 1 && len <= 200, `${len} chars`);
  check("not only whitespace", a.text.trim().length > 0);
  check("single sentence (one terminal period, no newline)", /^[^.!?\n]*[.!?]$/.test(a.text.trim()), JSON.stringify(a.text));
  console.log(`ENTRY: ${JSON.stringify(a.text)} (${len} chars)`);
}

process.exit(failures ? 1 : 0);
