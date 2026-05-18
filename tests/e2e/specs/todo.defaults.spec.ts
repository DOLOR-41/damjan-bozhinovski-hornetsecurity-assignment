import { test } from '../fixtures';
import { step } from '../../helpers/allure.helper';
import { assertDefaultTodosVisible, assertItemsLeft } from '../assertions';

test.describe('Default todos @e2e @smoke', () => {
  test('displays two default todo items on first visit', async ({ page }) => {
    await step('Then default seeded todos are visible', async () => {
      await assertDefaultTodosVisible(page);
    });
  });

  test('shows correct active items counter', async ({ page }) => {
    await step('Then the items-left counter reflects 2 active todos', async () => {
      await assertItemsLeft(page, '2 items left');
    });
  });
});
