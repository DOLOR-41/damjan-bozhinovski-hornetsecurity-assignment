---
name: Bug — New todo not submitted with Enter
about: Report a defect in the Kitchen Sink todo app
title: '[Bug] Pressing Enter does not add a new todo item'
labels: bug
---

## Summary

The new-todo input only listens for the `change` event. Pressing **Enter** after typing does not add an item unless the field loses focus (e.g. Tab), which differs from standard TodoMVC behaviour and breaks keyboard-only workflows.

## Environment

- App: Cypress Kitchen Sink (`/todo`)
- URL: http://localhost:8080/todo
- Browser: Chromium (also reproducible manually)

## Steps to reproduce

1. Open http://localhost:8080/todo
2. Click the **What needs to be done?** field
3. Type `Feed the cat`
4. Press **Enter** (do not Tab or click away)

## Expected behaviour

A new todo **Feed the cat** appears in the list (3 items total).

## Actual behaviour

The item is **not** added. The input still contains the text until the field fires `change` (e.g. on blur/Tab).

## Root cause (hint for developers)

`app/assets/js/todo/view.js` binds `newTodo` to `change` only:

```javascript
$on(self.$newTodo, 'change', function () {
  handler(self.$newTodo.value)
})
```

Standard TodoMVC implementations also handle `keypress` / Enter.

## Suggested fix

Add a `keypress` handler for Enter (keyCode 13) that calls the same handler as `change`, or migrate to `submit` on a form wrapper.

## Automation note

Playwright tests use `Tab` after fill to trigger `change`. A test using only `press('Enter')` demonstrates the defect.
