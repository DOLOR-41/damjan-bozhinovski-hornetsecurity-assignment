# ToDo App QA Exercise — Deliverables

**Candidate:** _(your name)_  
**Date:** May 2026  
**Application under test:** [Cypress Kitchen Sink Todo](http://localhost:8080/todo)  
**Automation stack:** TypeScript + Playwright (POM) + Allure

---

## 1. Test plan (Gherkin)

**Location:** [test-plan/todo.feature](../test-plan/todo.feature)

Covers: defaults, create (with Scenario Outline), complete, edit, filters, delete, clear completed.

---

## 2. Automation summary

| Spec | Test plan coverage | Tags |
|------|-------------------|------|
| `todo.defaults.spec.ts` | Default items + counter | `@e2e` `@smoke` |
| `todo.create.spec.ts` | Add todo (outline examples) + empty validation | `@e2e` |
| `todo.complete.spec.ts` | Single complete + mark all | `@e2e` |
| `todo.filters.spec.ts` | Active / Completed / Clear completed | `@e2e` `@smoke` |
| `todo.edit.spec.ts` | Edit + Escape cancel | `@e2e` |
| `todo.delete.spec.ts` | Delete single item | `@e2e` |

### Run commands

```bash
npm install && npm install --prefix app
npx playwright install chromium
npm test
npm run allure:open
```

### Results (local run)

| Suite | Passed | Expected failures | Notes |
|-------|--------|-------------------|-------|
| E2E (14) | 14 | 3 (`test.fail` bug demos) | `npm test` exit 0 |
| Smoke (5) | 5 | 0 | `@smoke` tag |

**Bug demonstration tests** (expected to fail until app is fixed):

- `marks all todos as completed via toggle all`
- `deletes a single todo item`
- `edits a todo title via double-click`

---

## 3. Bug reports (GitHub Issues)

File on your fork with **Issues** enabled. Drafts:

| Issue | File |
|-------|------|
| New todo not added on Enter key | [.github/ISSUE_TEMPLATE/bug-new-todo-enter-key.md](../.github/ISSUE_TEMPLATE/bug-new-todo-enter-key.md) |
| Filter logic uses OR instead of AND | [.github/ISSUE_TEMPLATE/bug-filter-rerender.md](../.github/ISSUE_TEMPLATE/bug-filter-rerender.md) |

---

## 4. Submission checklist

- [ ] Forked Kitchen Sink repo on GitHub
- [ ] Pushed test plan + automation (reviewers have access)
- [ ] First commit: Gherkin test plan only
- [ ] Playwright tests pass locally (`npm test`)
- [ ] Allure report generated (`npm run allure:open`)
- [ ] At least one GitHub Issue filed with repro steps
- [ ] README explains setup and run
- [ ] _(Bonus)_ Docker build/run documented
- [ ] _(Bonus)_ Conventional commit messages
