import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { env } from '../../config/env';

/**
 * Page Object for the Kitchen Sink TodoMVC page (/todo).
 * Actions only — assertions live in tests/e2e/assertions.
 */
export class TodoPage extends BasePage {
  readonly newTodoInput: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly itemsLeftCounter: Locator;
  readonly toggleAll: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.newTodoInput = page.getByTestId('new-todo');
    this.todoList = page.locator('.todo-list');
    this.todoItems = page.locator('.todo-list li');
    this.itemsLeftCounter = page.locator('.todo-count');
    this.toggleAll = page.locator('#toggle-all');
    this.clearCompletedButton = page.locator('.clear-completed');
  }

  async open(): Promise<void> {
    await this.goto(env.todoPath);
  }

  /**
   * Adds a todo via the new-todo field.
   * Uses Tab blur after typing because the app listens to `change`, not keypress Enter.
   */
  async addTodo(title: string): Promise<void> {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press('Tab');
  }

  async addTodoWithEnter(title: string): Promise<void> {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press('Enter');
  }

  todoItemByTitle(title: string): Locator {
    return this.todoItems.filter({
      has: this.page.getByText(title, { exact: true }),
    });
  }

  async markComplete(title: string): Promise<void> {
    const item = this.todoItemByTitle(title);
    await item.locator('.toggle').check();
  }

  async deleteTodo(title: string): Promise<void> {
    const item = this.todoItemByTitle(title);
    await item.hover();
    await item.locator('button.destroy').click();
  }

  async selectFilter(name: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.page.locator('.filters').getByRole('link', { name, exact: true }).click();
  }

  async clickClearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async clickToggleAll(): Promise<void> {
    // Toggle-all input is visually hidden; click its label (TodoMVC pattern)
    await this.page.locator('label[for="toggle-all"]').click({ force: true });
  }

  async doubleClickToEdit(title: string): Promise<void> {
    await this.page.getByText(title, { exact: true }).dblclick();
    await this.page.locator('.todo-list li.editing input.edit').waitFor({ state: 'visible' });
  }

  private editingInput(): Locator {
    return this.page.locator('.todo-list li.editing input.edit');
  }

  async saveEdit(_title: string, newTitle: string): Promise<void> {
    const input = this.editingInput();
    await input.fill(newTitle);
    await input.press('Enter');
  }

  async cancelEditWithEscape(_title: string): Promise<void> {
    const input = this.editingInput();
    await input.fill('Temporary title');
    await input.press('Escape');
  }
}
