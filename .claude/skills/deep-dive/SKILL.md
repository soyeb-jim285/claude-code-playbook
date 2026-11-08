---
name: deep-dive
description: Explains how a file or feature works by tracing it through the code. Use when asked how something works or where a behavior comes from.
argument-hint: "<file or feature>"
context: fork
agent: Explore
---

Trace `$ARGUMENTS` through this codebase.

Return:

1. A one-paragraph summary of what it does
2. The request or data flow as numbered steps, each with `file:line`
3. Anything surprising or fragile you noticed
