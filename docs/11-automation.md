# 11 Automation

## Run from scripts

```bash
claude -p "summarize this repo"
git diff | claude -p "review this diff"
claude -p "fix failing tests" --allowedTools "Read,Edit,Bash(npm test)" --max-turns 10
claude -p "list routes" --output-format json
```

See what a project loads:

```bash
claude -p "ok" --model haiku --max-turns 1 --output-format stream-json --verbose \
  | jq 'select(.type == "system" and .subtype == "init") | {agents, skills, mcp_servers}'
```

## GitHub Actions

Run `/install-github-app`, then mention `@claude` in a PR or issue.

Keep your API key in GitHub secrets. On public repos, limit who can trigger it.

## Parallel work

Each worktree is a separate checkout.

```bash
claude --worktree feature-tags
claude -w bugfix-search
```

## Background

```bash
claude --bg "write tests for delete"
claude agents
```

## Agent teams (experimental)

Agents that talk to each other. Add to settings:

```json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```

```text
> create an agent team: one for the API, one for the UI, one for tests
```

## Repeat work

```text
> /loop 5m check whether the deploy finished
> /schedule every weekday at 9am, review open PRs
```

Next: [Guided tour](12-guided-tour.md)
