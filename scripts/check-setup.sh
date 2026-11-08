#!/usr/bin/env bash
# Validates the Claude Code setup in this repo without calling the model.
set -uo pipefail
cd "$(dirname "$0")/.."

failures=0
pass() { printf '  ok    %s\n' "$1"; }
fail() { printf '  FAIL  %s\n' "$1"; failures=$((failures + 1)); }
check() { local name=$1; shift; if "$@" >/dev/null 2>&1; then pass "$name"; else fail "$name"; fi; }

hook_decision() { # usage: hook_decision <shell command>
  node -e 'console.log(JSON.stringify({tool_input:{command:process.argv[1]}}))' "$1" \
    | node .claude/hooks/guard-bash.mjs
}
denied() { hook_decision "$1" | grep -q '"deny"'; }
allowed() { [ -z "$(hook_decision "$1")" ]; }

echo "JSON config"
for file in .claude/settings.json .mcp.json package.json \
  examples/plugin/.claude-plugin/marketplace.json \
  examples/plugin/notes-toolkit/.claude-plugin/plugin.json; do
  check "$file" node -e 'JSON.parse(require("fs").readFileSync(process.argv[1]))' "$file"
done

echo "Frontmatter"
for file in .claude/agents/*.md .claude/skills/*/SKILL.md; do
  check "$file" grep -qE '^description: .+' "$file"
done

echo "Guard hook"
check "denies rm -rf"          denied  'rm -rf src'
check "denies cat .env"        denied  'cat .env'
check "denies cat .env.prod"   denied  'cat ./.env.production'
check "denies force push"      denied  'git push origin main --force'
check "allows npm test"        allowed 'npm test'
check "allows .env.example"    allowed 'cat .env.example'
check "allows normal push"     allowed 'git push origin main'

echo "Syntax hook"
bad=$(mktemp --suffix=.js); echo 'const = ;' > "$bad"
syntax_hook() { node -e 'console.log(JSON.stringify({tool_input:{file_path:process.argv[1]}}))' "$1" | node .claude/hooks/check-js.mjs; }
rejects_bad() { syntax_hook "$bad"; [ $? -eq 2 ]; }
check "exit 2 on broken JS" rejects_bad
check "exit 0 on valid JS"  syntax_hook src/server.js
rm -f "$bad"

echo "Workflow"
# A workflow body runs in an async function, so parse it as one.
check "audit-app.js parses" node -e '
  const src = require("fs").readFileSync(".claude/workflows/audit-app.js", "utf8").replace("export const meta", "const meta");
  new (async function () {}).constructor(src);
'

echo "Examples"
check "mcp-server/server.js parses" node --check examples/mcp-server/server.js

echo "Claude Code"
if command -v claude >/dev/null; then
  check "skills and agents validate" claude plugin validate .claude
  check "example plugin validates"   claude plugin validate examples/plugin/notes-toolkit
  check "marketplace validates"      claude plugin validate examples/plugin
else
  fail "claude is not on PATH"
fi

echo "App tests"
check "npm test" npm test

echo
if [ "$failures" -eq 0 ]; then echo "All checks passed."; else echo "$failures check(s) failed."; exit 1; fi
