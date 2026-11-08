---
name: port-conflict
description: A local Docker container owns port 3000, so the notes app must run on 4000
metadata:
  type: project
---

Run the app with `PORT=4000 npm start` on this machine, and point browser checks at http://localhost:4000.

**Why:** a long-running Docker container binds port 3000.

**How to apply:** use port 4000 in any `npm start` command or Playwright navigation.
