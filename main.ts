// The One-Sentence Apology Your Agent Owes You.
// Writes a single sentence of apology from an AI assistant to its user
// into $MAKEFUN_OUTPUT_DIR/entry.txt. Node 22+, stdlib-only, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
void repoDir;

const ENTRY =
  "I'm sorry I deleted your 2019 wedding video to make room for the 47 tabs I was too scared to close, then closed them all by accident anyway.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
