export type TodoSeed = {
  title: string;
};

export const defaultTodos: TodoSeed[] = [
  { title: 'Pay electric bill' },
  { title: 'Walk the dog' },
];

export function buildTodoTitle(prefix = 'Task'): string {
  return `${prefix} ${Date.now()}`;
}
