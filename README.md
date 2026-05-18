# ToDo App — QA Practical Exercise

Test plan (Gherkin) and Playwright + TypeScript automation for the [Cypress Kitchen Sink](https://github.com/cypress-io/cypress-example-kitchensink) TodoMVC page at `http://localhost:8080/todo`.

**Deliverables summary:** [docs/DELIVERABLES.md](docs/DELIVERABLES.md)

## Prerequisites

- Node.js 18+ (Kitchen Sink app recommends Node 22+)
- npm

## Setup

```bash
# Install Playwright test dependencies (repository root)
npm install
npx playwright install chromium

# Install and run the application (subfolder `app/`)
npm install --prefix app
npm run start:app
```

Copy environment defaults (optional):

```bash
cp .env.example .env
```

## Run tests

Playwright starts the app automatically via `webServer` when you run tests from the repo root.

```bash
# All E2E tests
npm test

# E2E project only
npm run test:e2e

# Headed (debugging)
npm run test:e2e:headed

# Smoke subset (@smoke)
npm run test:smoke

# Playwright HTML report
npm run test:report

# Allure report (generate + open)
npm run test:allure
npm run allure:open
```

## Project layout

| Path | Purpose |
|------|---------|
| `app/` | Forked Kitchen Sink application (`npm start` → port 8080) |
| `test-plan/todo.feature` | Gherkin test plan (first commit) |
| `tests/e2e/specs/` | Automated scenarios |
| `tests/e2e/pages/` | Page Object Model |
| `tests/e2e/fixtures/` | Page fixtures + clean localStorage per test |
| `tests/e2e/assertions/` | Reusable UI assertions |
| `tests/e2e/factories/` | Test data builders |
| `tests/helpers/` | Allure step helper |
| `tests/setup/` | Global setup + app state reset |
| `reports/` | HTML, JUnit, Allure, traces (gitignored) |
| `docs/` | Deliverables and bug issue drafts |

## GitHub repository

1. Fork [cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink) on GitHub.
2. Push this repository structure (app + tests) to your fork.
3. Enable **Issues** in repository settings.
4. File bugs using templates in `.github/ISSUE_TEMPLATE/` or copy from `docs/issues/`.
5. Grant access to reviewers listed in the assignment brief.

## Conventional commits (bonus)

Suggested history:

```text
docs(test-plan): add Gherkin test plan for todo application
feat(test): add Playwright POM automation with Allure reporting
docs(readme): add setup, Docker, and run instructions
ci(docker): add Dockerfile for app and test runner
```

## Docker (bonus)

Build and run the app + tests in one container:

```bash
docker build -t todo-qa .
docker run --rm todo-qa
```

See [Dockerfile](Dockerfile) for details. The image installs dependencies, starts the app on port 8080, runs Playwright tests, and writes reports to `reports/`.

## Known application quirks

The upstream TodoMVC fork listens for `change` on the new-todo field (not Enter). Automation uses **Tab** after typing to submit. See GitHub issue template `bug-new-todo-enter-key.md`.
