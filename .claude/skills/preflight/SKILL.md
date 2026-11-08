---
name: preflight
description: Reports whether the working tree is ready to commit.
disable-model-invocation: true
allowed-tools: Bash(git status --short) Bash(git diff --stat) Bash(npm test) Read
---

## Current state

Git status:
!`git status --short || true`

Change summary:
!`git diff --stat || true`

Test results:
!`npm test 2>&1 | tail -n 12 || true`

## Your task

Using the state above, reply with `READY` or `NOT READY`, then one line per blocking issue. Blocking issues are failing tests, debug leftovers such as `console.log` in new code, and files that should not be committed.
