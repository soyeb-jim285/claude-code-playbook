// PreToolUse hook: denies risky shell commands before they run.
// ponytail: regex guardrail, catches honest mistakes only; use the sandbox for real isolation
let input = '';
for await (const chunk of process.stdin) input += chunk;

const command = JSON.parse(input).tool_input?.command ?? '';

const RULES = [
  [/\brm\s+-[a-z]*(r[a-z]*f|f[a-z]*r)/i, 'recursive force delete is blocked in this project'],
  [/(^|[\s'"\/=<])\.env(?!\.example)(\.[\w-]+)?($|[\s'";|&>])/, '.env files hold secrets and may not be read from the shell'],
  [/\bgit\s+push\b.*(\s--force\b|\s-f\b)/, 'force pushes are blocked in this project'],
];

const match = RULES.find(([pattern]) => pattern.test(command));

if (match) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: match[1],
    },
  }));
}
