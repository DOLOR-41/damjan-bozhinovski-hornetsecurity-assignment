import { test } from '../fixtures';
import { step } from '../../helpers/allure.helper';
import { assertTodoNotVisible, assertTodoVisible } from '../assertions';

test.describe('Edit todos @e2e', () => {
  // Documents bug: double-click on second todo may edit the first row
  test.fail('edits a todo title via double-click', async ({ todoPage, page }) => {
    await step('When I edit "Walk the dog" to "Walk the cat"', async () => {
      await todoPage.doubleClickToEdit('Walk the dog');
      await todoPage.saveEdit('Walk the dog', 'Walk the cat');
    });

    await step('Then the updated title is shown', async () => {
      await assertTodoVisible(page, 'Walk the cat');
      await assertTodoNotVisible(page, 'Walk the dog');
    });
  });

  test('cancels edit with Escape and restores original title', async ({ todoPage, page }) => {
    await step('When I cancel an in-progress edit', async () => {
      await todoPage.doubleClickToEdit('Walk the dog');
      await todoPage.cancelEditWithEscape('Walk the dog');
    });

    await step('Then the original title remains', async () => {
      await assertTodoVisible(page, 'Walk the dog');
    });
  });
});
