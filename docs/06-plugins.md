# 06 Plugins

A plugin bundles skills, agents, hooks, and MCP servers.

> **Warning:** plugins run code as you. Read third-party plugins before installing.

## Commands

```bash
claude plugin install <name>@<marketplace>
claude plugin list
claude plugin update <name>
claude plugin uninstall <name>
claude plugin marketplace add owner/repo
```

Restart Claude Code after installing.

## Brainstorming (Superpowers)

```bash
claude plugin install superpowers@claude-plugins-official
```

```text
> /superpowers:brainstorming add tags to notes
> /superpowers:writing-plans
> /superpowers:subagent-driven-development
```

Also includes `test-driven-development`, `systematic-debugging`, and `verification-before-completion`.

## Other good plugins

```bash
claude plugin install code-review@claude-plugins-official
claude plugin install code-simplifier@claude-plugins-official
claude plugin install security-guidance@claude-plugins-official
claude plugin install skill-creator@claude-plugins-official
claude plugin install frontend-design@claude-plugins-official
claude plugin install context7@claude-plugins-official
```

Every plugin uses context. Remove what you do not use.

## Build a plugin

```text
examples/plugin/
├── .claude-plugin/marketplace.json
└── notes-toolkit/
    ├── .claude-plugin/plugin.json
    ├── skills/todo-scan/SKILL.md
    └── agents/doc-checker.md
```

Try it:

```bash
claude plugin validate examples/plugin
claude --plugin-dir examples/plugin/notes-toolkit
```

```text
> /notes-toolkit:todo-scan
```

Share it: push to GitHub, then others run `claude plugin marketplace add you/repo`.

Next: [Agents](07-agents.md)
