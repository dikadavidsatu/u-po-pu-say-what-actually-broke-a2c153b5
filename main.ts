// Say What Actually Broke — make.fun entry
// u-po-pu-say-what-actually-broke-a2c153b5
//
// One line of honest, funny error copy. The brief: tell the user the brutal
// truth about what went wrong, in a way that makes them laugh instead of
// rage, and name the real failure in plain words so they know what to do
// next. This program writes that single line to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry line. A save that died halfway through the database write:
// honest about the failure ("the database gave up"), honest about the
// user's data ("your work is safe in this tab"), and honest about what
// happens next ("try again in a minute") — with a small conspiracy
// between us and the reader at the end.
const ENTRY_LINE =
  "We couldn't save your file: the database gave up halfway through. " +
  "Your work is safe in this tab — try again in a minute, and we'll " +
  "pretend this never happened.";

const OUTPUT_PATH = "/output/entry.txt";

// The competition gate, checked here before we write anything: the file
// must hold UTF-8 text of 1 to 200 characters, not only whitespace, on a
// single line. Fail loudly instead of shipping an invalid entry.
const chars = [...ENTRY_LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`Entry line is ${chars.length} chars, must be 1-200.`);
}
if (ENTRY_LINE.trim().length === 0) {
  throw new Error("Entry line must not be only whitespace.");
}
if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
  throw new Error("Entry line must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE + "\n", "utf8");

console.log(`Wrote ${ENTRY_LINE.length} chars to ${OUTPUT_PATH}`);
console.log(ENTRY_LINE);
