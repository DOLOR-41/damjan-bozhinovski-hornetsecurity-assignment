import { test } from '../fixtures';
import { step } from '../../helpers/allure.helper';
import { assertTodoCount, assertTodoNotVisible, assertTodoVisible } from '../assertions';

test.describe('Delete todos @e2e', () => {
  // Documents GitHub issue: Delete removes wrong todo row
  test.fail('deletes a single todo item', async ({ todoPage, page }) => {
    await step('When I delete "Walk the dog"', async () => {
      await todoPage.deleteTodo('Walk the dog');
    });

    await step('Then only "Pay electric bill" remains', async () => {
      await assertTodoCount(todoPage.todoItems, 1);
      await assertTodoVisible(page, 'Pay electric bill');
      await assertTodoNotVisible(page, 'Walk the dog');
    });
  });
});
