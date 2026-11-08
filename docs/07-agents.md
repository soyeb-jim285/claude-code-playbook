# 07 Agents

A subagent is a helper with its own context and tools. It returns a summary.

## Where

```text
.claude/agents/<name>.md     This project
~/.claude/agents/<name>.md   You, all projects
```

## Add an existing agent

```bash
cp security-auditor.md .claude/agents/
claude plugin install code-simplifier@claude-plugins-official
```

Read an agent's file before you add it.

## Build one

`.claude/agents/docs-writer.md`:

```markdown
---
name: docs-writer
description: Updates docs after code changes.
tools: Read, Grep, Glob, Edit
model: sonnet
---

Fix only what the code proves is out of date.
Return the files you changed.
```

Restart, then use it:

```text
> use the docs-writer subagent to update the README
```

Or ask Claude: `create a subagent that reviews SQL migrations`.

## Examples here

| Agent | Shows |
|---|---|
| `code-reviewer` | Read-only tools |
| `test-writer` | Memory |
| `ui-verifier` | Browser through MCP |

## Useful fields

| Field | Does |
|---|---|
| `name`, `description` | Required |
| `tools` | Allowed tools |
| `model` | `sonnet`, `opus`, `haiku`, or `inherit` |
| `memory` | `user`, `project`, or `local` |
| `mcpServers` | MCP servers it can use |
| `isolation: worktree` | Private git checkout |
| `maxTurns` | Stops long runs |

## Tips

- One job per agent.
- Give only the tools it needs.
- Say exactly what it should return.

## Whole session as an agent

```bash
claude --agent code-reviewer
```

## Standalone agent (Agent SDK)

Use Claude's agent loop in your own program.

```bash
cd examples/agent-sdk
npm install
node review.mjs public/index.html
```

Code: [review.mjs](../examples/agent-sdk/review.mjs)

Next: [Hooks](08-hooks.md)
