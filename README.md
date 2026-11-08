# Claude Code Playbook

A small notes app with a full Claude Code setup. Open it, try each feature, copy what you like.

Unofficial community project, MIT licensed.

## Start

Needs Node.js 20+.

```bash
curl -fsSL https://claude.ai/install.sh | bash
git clone https://github.com/soyeb-jim285/claude-code-playbook.git
cd claude-code-playbook
npm run check:setup
claude
```

Accept the trust dialog. Without it, this repo's permissions and MCP approval are ignored.

Then do the [guided tour](docs/12-guided-tour.md).

## Guides

| # | Guide | Learn |
|---|---|---|
| 01 | [Getting started](docs/01-getting-started.md) | Install, daily commands |
| 02 | [CLAUDE.md and rules](docs/02-claude-md-and-rules.md) | Project instructions |
| 03 | [Memory](docs/03-memory.md) | What Claude remembers |
| 04 | [Permissions](docs/04-permissions-and-settings.md) | What Claude may do |
| 05 | [Skills](docs/05-skills.md) | Build reusable procedures |
| 06 | [Plugins](docs/06-plugins.md) | Install brainstorming and more |
| 07 | [Agents](docs/07-agents.md) | Add and build agents |
| 08 | [Hooks](docs/08-hooks.md) | Run scripts automatically |
| 09 | [MCP and Playwright](docs/09-mcp-and-playwright.md) | Control a browser |
| 10 | [Workflows](docs/10-workflows.md) | Run many agents with code |
| 11 | [Automation](docs/11-automation.md) | Scripts, CI, worktrees |
| 12 | [Guided tour](docs/12-guided-tour.md) | Try everything |

## Files

```text
claude-code-playbook/
├── CLAUDE.md                  Project instructions
├── CLAUDE.local.md.example    Template for personal notes
├── .mcp.json                  Playwright server
├── .claude/
│   ├── settings.json          Permissions and hooks
│   ├── rules/                 Instructions for certain files
│   ├── skills/
│   │   ├── add-endpoint/      Step-by-step procedure
│   │   ├── preflight/         Uses live git and test output
│   │   └── deep-dive/         Runs in a subagent
│   ├── agents/
│   │   ├── code-reviewer.md   Read-only reviewer
│   │   ├── test-writer.md     Writes tests, has memory
│   │   └── ui-verifier.md     Tests in a real browser
│   ├── hooks/
│   │   ├── guard-bash.mjs     Blocks risky commands
│   │   └── check-js.mjs       Checks edited JS
│   └── workflows/audit-app.js Multi-agent audit
├── docs/                      Guides
├── examples/
│   ├── memory/                Sample memory files
│   ├── plugin/                Sample plugin
│   └── agent-sdk/             Standalone agent
├── scripts/check-setup.sh     Validates the setup
├── src/server.js              API
├── public/index.html          UI
└── test/server.test.js        Tests
```

## What goes where

| Need | Use |
|---|---|
| Always-on instructions | `CLAUDE.md` |
| Instructions for some files | `.claude/rules/` |
| Repeatable procedure | Skill |
| Specialist worker | Subagent |
| Must happen every time | Hook |
| Outside tool | MCP server |
| Share with other repos | Plugin |
