---
name: Bug — Incorrect filter refresh condition
about: Report a defect in the Kitchen Sink todo app
title: '[Bug] _filter() uses logical OR where AND was intended'
labels: bug
---

## Summary

In `Controller.prototype._filter`, the condition that decides whether to re-render the list uses `||` instead of `&&`, so the expression is almost always true and the todo list is re-rendered more often than necessary. This can cause subtle UI issues (lost focus while editing, flicker, stale filter state).

## Environment

- App: Cypress Kitchen Sink (`/todo`)
- File: `app/assets/js/todo/controller.js` (line ~263)

## Steps to reproduce

1. Open http://localhost:8080/todo
2. Add several todos and switch to **Active** filter
3. Toggle completion on an item while staying on **Active**
4. Observe the list re-rendering entirely (DOM replaced) even when the active route did not change

## Expected behaviour

The list should only re-fetch/re-render when the route changes or when `force` is true.

## Actual behaviour

Because `_lastActiveRoute !== 'All' || _lastActiveRoute !== activeRoute` is tautologically true whenever `_lastActiveRoute` is not literally both values at once, the app calls `showActive()` / `showAll()` on many operations unnecessarily.

## Code reference

```javascript
if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
  this[`show${activeRoute}`]()
}
```

Likely intended:

```javascript
if (force || (this._lastActiveRoute !== 'All' && this._lastActiveRoute !== activeRoute)) {
```

## Impact

- Performance: unnecessary full list re-renders
- UX: editing mode may be interrupted when toggling items under a filter

## Severity

Medium — functional flows often still pass, but behaviour diverges from TodoMVC reference implementation.
