# 05 Skills

A skill is a saved procedure. Claude uses it when relevant, or you run `/name`.

## Where

```text
~/.claude/skills/<name>/SKILL.md    You, all projects
.claude/skills/<name>/SKILL.md      This project
```

## Build one

`.claude/skills/explain-route/SKILL.md`:

```markdown
---
name: explain-route
description: Explains one API route. Use when asked what an endpoint does.
---

Explain the route for $ARGUMENTS in src/server.js.
```

Run it:

```text
> /explain-route POST /api/notes
```

`description` tells Claude when to use it.

## Examples here

| Skill | Shows | Run |
|---|---|---|
| `add-endpoint` | Steps plus a checklist file | `/add-endpoint PATCH /api/notes/:id edit text` |
| `preflight` | Manual only, live command output | `/preflight` |
| `deep-dive` | Runs in a subagent | `/deep-dive how notes are deleted` |

## Useful fields

| Field | Does |
|---|---|
| `disable-model-invocation: true` | Only you can run it |
| `allowed-tools` | Tools allowed without asking |
| `context: fork` | Runs in a subagent |
| `agent` | Which subagent to use |
| `argument-hint` | Shows expected arguments |

## Useful tokens

| Token | Becomes |
|---|---|
| `$ARGUMENTS` | Text after the command |
| `$0`, `$1` | One argument |
| `` !`git status` `` | Command output |

Next: [Plugins](06-plugins.md)
