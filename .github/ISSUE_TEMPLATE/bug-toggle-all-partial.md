---
name: Bug — Mark all as complete leaves some items active
about: Report a defect in the Kitchen Sink todo app
title: '[Bug] "Mark all as complete" does not complete every todo'
labels: bug
---

## Summary

Clicking **Mark all as complete** only marks the first todo as completed; remaining items stay active.

## Steps to reproduce

1. Open http://localhost:8080/todo with default items (or reset `localStorage` key `todos-vanillajs`)
2. Ensure two active todos are visible
3. Click **Mark all as complete** (label or master checkbox)

## Expected behaviour

All todos show as completed and the footer reads **0 items left**.

## Actual behaviour

Only the first todo is completed; the second stays active (**1 item left**).

## Automated reproduction

`tests/e2e/specs/todo.complete.spec.ts` — `marks all todos as completed via toggle all`

## Suspected area

`app/assets/js/todo/controller.js` — `toggleAll` / `_filter` interaction
