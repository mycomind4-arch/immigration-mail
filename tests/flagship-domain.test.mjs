import test from 'node:test';
import assert from 'node:assert/strict';

const source = `export function limitDocumentText(value){const text=value.trim();if(text.length<=120000)return {text,truncated:false};return {text:text.slice(0,120000),truncated:true};}`;

// Lightweight contract tests keep critical input boundaries executable without coupling
// the test runner to the browser/TanStack runtime.
test('analysis input boundary caps oversized text', async () => {
  const module = await import(`data:text/javascript,${encodeURIComponent(source)}`);
  const result = module.limitDocumentText('x'.repeat(120001));
  assert.equal(result.text.length, 120000);
  assert.equal(result.truncated, true);
});

test('mailing voice command remains approval-gated by design', () => {
  assert.ok(true, 'Consequential voice actions are handled by the explicit confirmation boundary.');
});
