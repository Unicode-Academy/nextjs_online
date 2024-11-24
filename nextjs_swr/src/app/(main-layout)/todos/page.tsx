import SearchForm from "./_components/SearchForm";
import TodoList from "./_components/TodoList";

export default function TodoPage() {
  return (
    <div>
      <h1>Todos</h1>
      <SearchForm />
      <TodoList />
    </div>
  );
}
