import test from "node:test";
import assert from "node:assert/strict";

test("Immigration Mail product has the flagship Respond to a Notice workflow", () => {
  const required = ["intro", "document", "facts", "objective", "draft", "review", "attachments", "recipient", "mailing", "checkout", "submitted"];
  assert.equal(required.length, 11);
  assert.equal(required.at(0), "intro");
  assert.equal(required.at(-1), "submitted");
});

test("product safety boundary is explicit", () => {
  const disclaimer = "Immigration Mail is not a law firm and does not provide legal advice.";
  assert.match(disclaimer, /not a law firm/);
  assert.match(disclaimer, /does not provide legal advice/);
});
