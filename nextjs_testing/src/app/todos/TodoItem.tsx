export default function TodoItem({ todo }: Readonly<{ todo: string }>) {
  return <li data-testid="todo-item">{todo}</li>;
}
