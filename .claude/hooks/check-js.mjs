// PostToolUse hook: syntax-checks edited JavaScript. Exit 2 sends stderr back to Claude to fix.
import { spawnSync } from 'node:child_process';

let input = '';
for await (const chunk of process.stdin) input += chunk;

const file = JSON.parse(input).tool_input?.file_path ?? '';

if (/\.m?js$/.test(file)) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(`Syntax error in ${file}:\n${result.stderr}`);
    process.exit(2);
  }
}
