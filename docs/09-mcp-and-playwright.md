# 09 MCP and Playwright

MCP connects Claude to outside tools. Playwright MCP gives it a real browser.

## Add a server

```bash
claude mcp add my-server -- npx my-mcp-server              # just you
claude mcp add --scope project my-server -- npx my-server  # team
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
claude mcp list
claude mcp remove my-server
```

## Add Playwright

Already set up in this repo. For another project:

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest --headless --isolated
```

Missing browser?

```bash
npx playwright install chromium
```

## `.mcp.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@0.0.84",
        "--headless",
        "--isolated",
        "--allowed-origins",
        "http://localhost:3000;http://127.0.0.1:3000"
      ]
    }
  }
}
```

Never commit tokens. Use `${API_TOKEN}` instead.

Remove `--headless` to watch the browser.

`--allowed-origins` keeps the browser on your app. Change it if you use another port. It reduces mistakes but is not a security boundary, and redirects can get past it.

## Use

Terminal 1:

```bash
npm start
```

Terminal 2:

```text
claude
> /mcp
> use the ui-verifier subagent to test adding and searching notes
> open http://localhost:3000 and take a screenshot at 375px wide
```

Run browser work in a subagent to save context. Web pages can contain hostile instructions, so test sites you control.

## Build your own

See [Part 4 of the tour](12-guided-tour.md#part-4-tools-and-mcp). Sample code: [examples/mcp-server](../examples/mcp-server/server.js).

Next: [Workflows](10-workflows.md)
