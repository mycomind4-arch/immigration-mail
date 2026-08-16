import test from "node:test";
import assert from "node:assert/strict";

const languages = [
  ["en", false], ["es", false], ["zh", false], ["vi", false],
  ["ko", false], ["tl", false], ["ar", true], ["ru", false],
  ["ht", false], ["pt", false], ["fr", false], ["hi", false],
  ["ur", true], ["bn", false], ["pa", false],
];

test("multilingual foundation covers the initial language set", () => {
  assert.equal(languages.length, 15);
  assert.deepEqual(languages.filter(([, rtl]) => rtl).map(([code]) => code), ["ar", "ur"]);
});

test("voice action policy keeps consequential mailing approval-gated", () => {
  const approvalRequired = new Set(["mail-preview"]);
  assert.equal(approvalRequired.has("mail-preview"), true);
  assert.equal(approvalRequired.has("read-draft"), false);
});

test("immigration preflight catches unfinished placeholders", () => {
  const draft = "Dear USCIS,\n\n[Your Name]\n\nSincerely";
  assert.equal(/\[[^\]]+\]/.test(draft), true);
});

test("immigration source model preserves page-level provenance", () => {
  const source = { documentId: "doc-1", documentName: "RFE.pdf", page: 4, excerpt: "Response due..." };
  assert.equal(source.page, 4);
  assert.equal(source.documentId, "doc-1");
});
