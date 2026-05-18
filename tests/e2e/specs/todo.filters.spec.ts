import { test } from '../fixtures';
import { step } from '../../helpers/allure.helper';
import {
  assertClearCompletedHidden,
  assertLastTodoTitle,
  assertTodoCount,
  assertTodoNotVisible,
} from '../assertions';

test.describe('Todo filters @e2e @smoke', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.markComplete('Pay electric bill');
  });

  test('filters to show only active todos', async ({ todoPage, page }) => {
    await step('When I select the Active filter', async () => {
      await todoPage.selectFilter('Active');
    });

    await step('Then only active items are visible', async () => {
      await assertTodoCount(todoPage.todoItems, 1);
      await assertLastTodoTitle(page, 'Walk the dog');
      await assertTodoNotVisible(page, 'Pay electric bill');
    });
  });

  test('filters to show only completed todos', async ({ todoPage, page }) => {
    await step('When I select the Completed filter', async () => {
      await todoPage.selectFilter('Completed');
    });

    await step('Then only completed items are visible', async () => {
      await assertTodoCount(todoPage.todoItems, 1);
      await assertLastTodoTitle(page, 'Pay electric bill');
      await assertTodoNotVisible(page, 'Walk the dog');
    });
  });

  test('clears all completed todos', async ({ todoPage, page }) => {
    await step('When I click Clear completed', async () => {
      await todoPage.clickClearCompleted();
    });

    await step('Then completed items are removed', async () => {
      await assertTodoCount(todoPage.todoItems, 1);
      await assertTodoNotVisible(page, 'Pay electric bill');
      await assertClearCompletedHidden(page);
    });
  });
});
