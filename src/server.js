import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const INDEX_HTML = new URL('../public/index.html', import.meta.url);
const MAX_BODY_BYTES = 10_000;
const MAX_NOTE_CHARS = 500;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(body === undefined ? '' : JSON.stringify(body));
}

async function readJson(req) {
  // A JSON content type forces a CORS preflight, which stops other sites from posting here.
  if (!req.headers['content-type']?.startsWith('application/json')) {
    throw new HttpError(415, 'content-type must be application/json');
  }
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new HttpError(413, 'body too large');
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw new HttpError(400, 'invalid JSON');
  }
}

function validateText(text) {
  if (typeof text !== 'string' || text.trim() === '') throw new HttpError(400, 'text is required');
  if (text.length > MAX_NOTE_CHARS) throw new HttpError(400, `text exceeds ${MAX_NOTE_CHARS} characters`);
  return text.trim();
}

/** Builds the HTTP server. Each call gets its own in-memory store. */
export function createApp() {
  // ponytail: in-memory on purpose, a demo target needs no database; swap for SQLite if notes must survive restarts
  const notes = [];
  let nextId = 1;

  async function route(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const noteMatch = url.pathname.match(/^\/api\/notes\/(\d+)$/);

    if (req.method === 'GET' && url.pathname === '/') {
      const html = await readFile(INDEX_HTML);
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(html);
    }

    if (req.method === 'GET' && url.pathname === '/api/notes') {
      const q = url.searchParams.get('q') ?? '';
      return sendJson(res, 200, notes.filter((note) => note.text.includes(q)));
    }

    if (req.method === 'POST' && url.pathname === '/api/notes') {
      const { text } = await readJson(req);
      const note = { id: nextId++, text: validateText(text) };
      notes.push(note);
      return sendJson(res, 201, note);
    }

    if (req.method === 'DELETE' && noteMatch) {
      const index = notes.findIndex((note) => note.id === Number(noteMatch[1]));
      if (index === -1) throw new HttpError(404, 'note not found');
      notes.splice(index, 1);
      return sendJson(res, 204);
    }

    throw new HttpError(404, 'not found');
  }

  return createServer((req, res) => {
    route(req, res).catch((err) => {
      if (err instanceof HttpError) return sendJson(res, err.status, { error: err.message });
      console.error(err);
      sendJson(res, 500, { error: 'internal error' });
    });
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  createApp().listen(port, '127.0.0.1', () => console.log(`Notes app on http://localhost:${port}`));
}
