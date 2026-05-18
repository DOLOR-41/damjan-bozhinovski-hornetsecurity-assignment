---
name: Bug — Delete removes wrong todo
about: Report a defect in the Kitchen Sink todo app
title: '[Bug] Delete button removes a different todo than targeted'
labels: bug
---

## Summary

Clicking the destroy (×) control on one row removes a different todo from the list.

## Steps to reproduce

1. Open http://localhost:8080/todo with default items
2. Hover the second todo (**Walk the dog**)
3. Click the **×** button on that row

## Expected behaviour

**Walk the dog** is removed; **Pay electric bill** remains.

## Actual behaviour

**Pay electric bill** is removed; **Walk the dog** remains.

## Automated reproduction

`tests/e2e/specs/todo.delete.spec.ts` — `deletes a single todo item`

## Notes

May be related to event delegation / item id resolution in `app/assets/js/todo/view.js`.
