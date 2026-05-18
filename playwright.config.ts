import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL ?? 'http://localhost:8080';
const appRoot = path.join(__dirname, 'app');
const serveBin = path.join(
  appRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'serve.cmd' : 'serve',
);

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/setup/global.setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // App state is in localStorage — single worker avoids cross-test races
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join('reports', 'html'), open: 'never' }],
    ['junit', { outputFile: path.join('reports', 'junit.xml') }],
    ['allure-playwright', { resultsDir: path.join('reports', 'allure-results') }],
  ],
  use: {
    baseURL,
    // Kitchen Sink uses Cypress-style data-test attributes
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    ...devices['Desktop Chrome'],
  },
  projects: [
    {
      name: 'e2e',
      testMatch: /e2e\/specs\/.*\.spec\.ts/,
    },
  ],
  webServer: {
    // Invoke local `serve` binary (works when npm is not on PATH)
    command: `"${serveBin}" --listen 8080 --no-request-logging`,
    cwd: appRoot,
    url: `${baseURL}/todo`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  outputDir: 'reports/test-results',
});
