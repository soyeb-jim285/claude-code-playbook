# 10 Workflows

A workflow is a JavaScript file that runs many agents in a fixed order.

> **Cost:** workflows can use many tokens.

On Pro, turn on "Dynamic workflows" in `/config`.

## Where

```text
.claude/workflows/<name>.js      This project
~/.claude/workflows/<name>.js    You, all projects
```

## Run

```text
> /audit-app
> /audit-app public/index.html
> /workflows
```

Or ask: `use a workflow to find every XSS risk`.

## How audit-app works

```text
3 reviewers ──▶ 1 skeptic per finding ──▶ confirmed / refuted
```

Code: [audit-app.js](../.claude/workflows/audit-app.js)

## Write one

```js
export const meta = {
  name: 'check-todos',
  description: 'Finds TODOs and rates each one',
}

const FOUND = {
  type: 'object',
  properties: { todos: { type: 'array', items: { type: 'string' } } },
  required: ['todos'],
}

const { todos } = await agent('List every TODO in src/', { schema: FOUND })

const ratings = await parallel(
  todos.map((todo) => () => agent(`Rate the urgency: ${todo}`)),
)

return ratings.filter(Boolean)
```

## Functions

| Function | Does |
|---|---|
| `agent(prompt, options)` | Starts an agent |
| `parallel(tasks)` | Runs tasks together, waits for all |
| `pipeline(items, ...stages)` | Runs each item through stages |
| `log(text)` | Shows progress |
| `args` | Input from the command |

No Node.js APIs. No `Date.now()` or `Math.random()`.

Next: [Automation](11-automation.md)
