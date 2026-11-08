import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';

let server;
let base;

before(async () => {
  server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

const post = (text) =>
  fetch(`${base}/api/notes`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text }),
  });

test('creates a note and trims its text', async () => {
  const res = await post('  buy milk  ');
  assert.equal(res.status, 201);
  assert.equal((await res.json()).text, 'buy milk');
});

test('rejects blank notes', async () => {
  assert.equal((await post('   ')).status, 400);
});

test('rejects notes over the length limit', async () => {
  assert.equal((await post('x'.repeat(501))).status, 400);
});

test('rejects invalid JSON', async () => {
  const res = await fetch(`${base}/api/notes`, { method: 'POST', body: '{nope' });
  assert.equal(res.status, 400);
});

test('finds notes by exact substring', async () => {
  await post('call the dentist');
  const notes = await (await fetch(`${base}/api/notes?q=dentist`)).json();
  assert.deepEqual(notes.map((note) => note.text), ['call the dentist']);
});

test('deletes a note, then 404s on the second delete', async () => {
  const { id } = await (await post('temporary')).json();
  assert.equal((await fetch(`${base}/api/notes/${id}`, { method: 'DELETE' })).status, 204);
  assert.equal((await fetch(`${base}/api/notes/${id}`, { method: 'DELETE' })).status, 404);
});

test('serves the page', async () => {
  const res = await fetch(base);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /<title>Notes<\/title>/);
});
