// A standalone read-only agent built with the Agent SDK.
// Usage: node review.mjs [file-to-review, relative to the repo root]
import { query } from '@anthropic-ai/claude-agent-sdk';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const target = process.argv[2] ?? 'src/server.js';

const conversation = query({
  prompt: `Review ${target} and list its three most serious problems with file:line.`,
  options: {
    cwd: repoRoot,
    settingSources: ['project'], // load this repo's CLAUDE.md and .claude/ config
    allowedTools: ['Read', 'Grep', 'Glob'],
    permissionMode: 'dontAsk', // anything not in allowedTools is denied without a prompt
    maxTurns: 10,
  },
});

for await (const message of conversation) {
  if (message.type === 'result') {
    console.log(message.subtype === 'success' ? message.result : `Agent stopped: ${message.subtype}`);
    process.exitCode = message.subtype === 'success' ? 0 : 1;
  }
}
