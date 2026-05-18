---
name: Bug — Double-click edit targets wrong todo
about: Report a defect in the Kitchen Sink todo app
title: '[Bug] Double-click edit opens the wrong todo row'
labels: bug
---

## Summary

Double-clicking a todo label to edit sometimes opens edit mode on a **different** row (often the first todo).

## Steps to reproduce

1. Open http://localhost:8080/todo with default items
2. Double-click the label **Walk the dog** (second item)
3. Change the text and confirm (Enter / blur)

## Expected behaviour

**Walk the dog** is updated to the new title.

## Actual behaviour

**Pay electric bill** (first item) enters edit mode or keeps the old title; **Walk the dog** is unchanged.

## Automated reproduction

`tests/e2e/specs/todo.edit.spec.ts` — `edits a todo title via double-click` (marked `test.fail` until fixed)
