# 03 Memory

You write `CLAUDE.md`. Claude writes memory.

```text
~/.claude/projects/<project>/memory/
├── MEMORY.md          Index, loaded each session
└── port-conflict.md   One fact, read when needed
```

Only the first 200 lines or 25 KB of `MEMORY.md` load. Memory stays on your machine.

## Use

```text
> remember this machine uses port 4000
> what do you remember?
> forget the port note
> /memory
```

## Try the sample

```bash
PROJECT_KEY=$(pwd | sed 's#/#-#g')
mkdir -p ~/.claude/projects/$PROJECT_KEY/memory
cp examples/memory/*.md ~/.claude/projects/$PROJECT_KEY/memory/
```

Start a new session and ask `which port should the app use?`. Answer: 4000. Delete the files after.

## Turn off

```bash
CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 claude
```

## Agent memory

Add `memory: project` to an agent. It saves to `.claude/agent-memory/<agent>/`.

Memory gives the agent write access, so skip it for read-only agents.

Next: [Permissions](04-permissions-and-settings.md)
