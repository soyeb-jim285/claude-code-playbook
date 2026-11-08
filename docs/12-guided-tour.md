# 12 Guided tour

Learn Claude Code by doing. About 45 minutes.

Each step has three parts:

- **What:** the idea
- **Do:** what to type
- **See:** what should happen

## Setup

Open two terminals in this folder.

**Terminal 1** runs the app. Leave it open.

```bash
npm start
```

**Terminal 2** runs Claude.

```bash
echo "SECRET=demo" > .env
claude
```

Accept the trust dialog and the Playwright server.

Blocks marked `Inside Claude` are typed into Claude. Blocks marked `bash` are typed into a normal terminal. To leave Claude, type `/exit`.

---

## Part 1: Teach Claude your project

### Step 1: CLAUDE.md

**What:** A file Claude reads at the start of every session.

**Do** (Inside Claude):

```text
how do I run one test?
```

**See:** The command from `CLAUDE.md`.

### Step 2: Rules

**What:** Instructions that load only for certain files.

**Do** (Inside Claude):

```text
read public/index.html, then quote the rules you were given for it
```

**See:** The rule from `.claude/rules/frontend.md`.

### Step 3: Memory

**What:** Notes Claude saves for itself.

**Do** (Inside Claude):

```text
remember that I like short answers
/memory
```

**See:** Claude saves the note, and `/memory` shows where.

---

## Part 2: Skills

A skill is a saved procedure you can run with `/name`.

### Step 4: Run a skill

**Do** (Inside Claude):

```text
/deep-dive how a note gets created
```

**See:** Steps with `file:line` references.

### Step 5: Create a skill

**Do:** Create `.claude/skills/hello/SKILL.md`:

```markdown
---
name: hello
description: Greets someone and says what this project is.
---

Say hello to $ARGUMENTS, then describe this project in one sentence.
```

Type `/exit`, then start `claude` again.

**Do** (Inside Claude):

```text
/hello Sam
```

**See:** A greeting for Sam and one sentence about the project.

---

## Part 3: Agents

An agent is a helper with its own memory of the task and its own tools. It does a job and reports back.

### Step 6: Use an agent

**Do** (Inside Claude):

```text
use the code-reviewer subagent on public/index.html
```

**See:** A security finding with a file and line.

### Step 7: Use an agent with a browser

**Do** (Inside Claude):

```text
use the ui-verifier subagent. Add a note "Buy Milk", then search for "milk".
```

**See:** A `FAIL` line. You found a bug.

### Step 8: Create an agent

**Do:** Create `.claude/agents/explainer.md`:

```markdown
---
name: explainer
description: Explains code in plain language for beginners.
tools: Read, Grep, Glob
model: haiku
---

Explain the code in simple words. Use at most five sentences.
```

Type `/exit`, then start `claude` again.

**Do** (Inside Claude):

```text
use the explainer subagent on src/server.js
```

**See:** A short, simple explanation.

---

## Part 4: Tools and MCP

| Word | Meaning | Example |
|---|---|---|
| **Tool** | One action Claude can take | `Read`, `Bash` |
| **MCP server** | A program that gives Claude new tools | Playwright |
| **Agent** | A worker that uses tools | `ui-verifier` |

Claude already has built-in tools. You create new ones in an MCP server.

### Step 9: Connect an MCP server

This repo includes a small server with one tool, `add`.

**Do:** Type `/exit`, then in the terminal:

```bash
npm install --prefix examples/mcp-server
claude mcp add hello -- node "$PWD/examples/mcp-server/server.js"
claude
```

**Do** (Inside Claude):

```text
/mcp
use the hello add tool to add 2 and 3
```

**See:** `hello` is connected. The answer is 5. Approve the tool if asked.

### Step 10: Create a tool

**Do:** Open `examples/mcp-server/server.js`. Paste this above the last line:

```js
server.registerTool(
  'word_count',
  { description: 'Counts the words in some text', inputSchema: { text: z.string() } },
  async ({ text }) => ({
    content: [{ type: 'text', text: String(text.trim().split(/\s+/).length) }],
  }),
);
```

| Part | Purpose |
|---|---|
| `'word_count'` | The tool's name |
| `description` | Tells Claude when to use it |
| `inputSchema` | What the tool needs |
| `async (...) => ...` | What the tool does |

Type `/exit`, then start `claude` again.

**Do** (Inside Claude):

```text
use the hello word_count tool on "one two three"
```

**See:** The answer is 3.

### Step 11: Give the tool to an agent

A tool's full name is `mcp__<server>__<tool>`.

**Do:** Create `.claude/agents/word-counter.md`:

```markdown
---
name: word-counter
description: Counts words using the word_count tool.
tools: mcp__hello__word_count
mcpServers:
  - hello
model: haiku
---

Use the word_count tool and return only the number.
```

Type `/exit`, then start `claude` again.

**Do** (Inside Claude):

```text
use the word-counter subagent to count "red green blue yellow"
```

**See:** The answer is 4.

### Tool names you can use

Put these in an agent's `tools:` line. Leave the line out to allow everything.

| Job | Names |
|---|---|
| Read and search | `Read`, `Grep`, `Glob`, `LSP` |
| Change files | `Edit`, `Write`, `NotebookEdit` |
| Run commands | `Bash`, `PowerShell`, `Monitor` |
| Web | `WebFetch`, `WebSearch` |
| Delegate | `Agent`, `SendMessage`, `Skill`, `Workflow` |
| Track tasks | `TaskCreate`, `TaskGet`, `TaskList`, `TaskUpdate`, `TaskStop` |
| Ask you | `AskUserQuestion` |
| MCP tools | `mcp__<server>__<tool>` |

---

## Part 5: Safety

### Step 12: A hook blocks a command

**What:** A hook is a script that always runs at a set moment.

**Do** (Inside Claude):

```text
run: cat .env
```

**See:** A hook blocks it. The secret stays hidden.

### Step 13: Permissions

**What:** Rules for what Claude can do without asking.

**Do** (Inside Claude):

```text
/permissions
```

**See:** The rules from `.claude/settings.json`.

---

## Part 6: Put it together

### Step 14: Write a test for the bug

**Do** (Inside Claude):

```text
use the test-writer subagent to reproduce the search bug from earlier
```

**See:** One new failing test.

### Step 15: Fix the bug

**Do** (Inside Claude):

```text
fix the search bug, then run npm test
```

**See:** All tests pass.

### Step 16: Add a feature

**Do** (Inside Claude):

```text
/add-endpoint PATCH /api/notes/:id updates a note's text
```

**See:** Tests first, then the new route.

### Step 17: Check before committing

**Do** (Inside Claude):

```text
/preflight
```

**See:** `READY` or `NOT READY`.

### Step 18: Run a workflow

**What:** A script that runs many agents. This step uses the most tokens.

**Do** (Inside Claude):

```text
/audit-app
/workflows
```

**See:** Findings marked confirmed or refuted.

### Step 19: Plan with brainstorming

**Do:** Type `/exit`, then in the terminal:

```bash
claude plugin install superpowers@claude-plugins-official
claude
```

**Do** (Inside Claude):

```text
/superpowers:brainstorming add tags to notes
```

**See:** Claude asks what you want before writing code.

---

## Clean up

```bash
rm .env
claude mcp remove hello
```

To undo your code changes:

```bash
git restore .
git clean -fd .claude/skills/hello .claude/agents/explainer.md .claude/agents/word-counter.md test
```

## If something goes wrong

| Problem | Fix |
|---|---|
| Port 3000 is busy | Run `PORT=4000 npm start`. Change `3000` to `4000` in `.mcp.json`, then ask Claude to use port 4000 |
| New skill or agent not found | Type `/exit`, then start `claude` again |
| MCP server not connected | Run `/mcp`, and check that `npm install` worked |
| Browser is missing | Run `npx playwright install chromium` |
| Claude keeps asking permission | Accept the trust dialog when Claude starts |

## Answers: the planted bugs

| Bug | Where | Fix |
|---|---|---|
| Search is case-sensitive | `src/server.js` | Lowercase both sides |
| Stored XSS: notes can run code | `public/index.html`, `renderNote()` | Use `textContent` |

Keep this app on your own machine until the XSS bug is fixed.
