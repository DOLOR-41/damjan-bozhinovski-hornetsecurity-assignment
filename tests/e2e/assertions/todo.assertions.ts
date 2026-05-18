import { expect, type Page, type Locator } from '@playwright/test';
import { defaultTodos } from '../factories/todo.factory';

export async function assertTodoCount(items: Locator, count: number): Promise<void> {
  await expect(items).toHaveCount(count);
}

export async function assertDefaultTodosVisible(page: Page): Promise<void> {
  await assertTodoCount(page.locator('.todo-list li'), 2);
  await expect(page.locator('.todo-list li').first()).toHaveText(defaultTodos[0].title);
  await expect(page.locator('.todo-list li').last()).toHaveText(defaultTodos[1].title);
}

export async function assertItemsLeft(page: Page, text: string): Promise<void> {
  await expect(page.locator('.todo-count')).toContainText(text);
}

export async function assertTodoCompleted(page: Page, title: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: title });
  await expect(item).toHaveClass(/completed/);
}

export async function assertTodoNotCompleted(page: Page, title: string): Promise<void> {
  const item = page.locator('.todo-list li').filter({ hasText: title });
  await expect(item).not.toHaveClass(/completed/);
}

export async function assertTodoVisible(page: Page, title: string): Promise<void> {
  await expect(
    page.locator('.todo-list li').filter({ has: page.getByText(title, { exact: true }) }),
  ).toBeVisible();
}

export async function assertTodoNotVisible(page: Page, title: string): Promise<void> {
  await expect(
    page.locator('.todo-list li').filter({ has: page.getByText(title, { exact: true }) }),
  ).toHaveCount(0);
}

export async function assertLastTodoTitle(page: Page, title: string): Promise<void> {
  await expect(page.locator('.todo-list li').last()).toHaveText(title);
}

export async function assertClearCompletedHidden(page: Page): Promise<void> {
  await expect(page.locator('.clear-completed')).toBeHidden();
}

export async function assertAllTodosCompleted(page: Page): Promise<void> {
  const items = page.locator('.todo-list li');
  const count = await items.count();
  for (let i = 0; i < count; i++) {
    await expect(items.nth(i)).toHaveClass(/completed/);
  }
}
