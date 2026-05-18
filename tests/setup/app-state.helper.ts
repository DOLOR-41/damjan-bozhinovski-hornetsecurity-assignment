import type { Page } from '@playwright/test';
import { env } from '../config/env';

const STORAGE_KEY = 'todos-vanillajs';

/**
 * Clears persisted todos and reloads so the app re-seeds default items.
 * Must run after navigating to the todo page (same origin for localStorage).
 */
export async function resetTodoAppToDefaults(page: Page): Promise<void> {
  await page.goto(env.todoPath);
  await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY);
  await page.reload({ waitUntil: 'domcontentloaded' });
  // Seed adds two todos asynchronously on first load — wait for both before interacting
  await page.locator('.todo-list li').nth(1).waitFor({ state: 'visible' });
}
