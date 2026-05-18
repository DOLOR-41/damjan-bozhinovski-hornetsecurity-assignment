import { test } from '../fixtures';
import { step } from '../../helpers/allure.helper';
import {
  assertAllTodosCompleted,
  assertItemsLeft,
  assertTodoCompleted,
} from '../assertions';

test.describe('Complete todos @e2e', () => {
  test('marks a single todo as completed', async ({ todoPage, page }) => {
    await step('When I mark "Pay electric bill" complete', async () => {
      await todoPage.markComplete('Pay electric bill');
    });

    await step('Then it shows as completed and counter updates', async () => {
      await assertTodoCompleted(page, 'Pay electric bill');
      await assertItemsLeft(page, '1 item left');
    });
  });

  // Documents GitHub issue: Mark all as complete leaves some items active
  test.fail('marks all todos as completed via toggle all', async ({ todoPage, page }) => {
    await step('When I click Mark all as complete', async () => {
      await todoPage.clickToggleAll();
    });

    await step('Then every item is completed and counter is zero', async () => {
      // Counter is more reliable than CSS class when the list re-renders after toggle-all
      await assertItemsLeft(page, '0 items left');
      await assertAllTodosCompleted(page);
    });
  });
});
