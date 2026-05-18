import { test } from '../fixtures';
import { step } from '../../helpers/allure.helper';
import {
  assertDefaultTodosVisible,
  assertLastTodoTitle,
  assertTodoCount,
} from '../assertions';

const addExamples = [
  { title: 'Feed the cat', count: 3 },
  { title: 'Buy groceries', count: 3 },
  { title: 'Schedule dentist', count: 3 },
];

test.describe('Create todos @e2e', () => {
  for (const { title, count } of addExamples) {
    test(`adds a new todo: "${title}"`, async ({ todoPage, page }) => {
      await step(`When I add "${title}"`, async () => {
        await todoPage.addTodo(title);
      });

      await step(`Then ${count} items are listed`, async () => {
        await assertTodoCount(todoPage.todoItems, count);
        await assertLastTodoTitle(page, title);
      });
    });
  }

  test('rejects adding an empty todo', async ({ todoPage, page }) => {
    await step('When I try to add whitespace only', async () => {
      await todoPage.addTodo('   ');
    });

    await step('Then the list still has only default items', async () => {
      await assertDefaultTodosVisible(page);
    });
  });
});
