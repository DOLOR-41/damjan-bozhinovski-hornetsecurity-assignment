import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

export type PageFixtures = {
  todoPage: TodoPage;
};

export const pagesFixture = base.extend<PageFixtures>({
  todoPage: async ({ page }, use) => {
    await use(new TodoPage(page));
  },
});
