import TodoCard from "../../components/TodoCard";

function TodoList({ todos }) {
  return (
    <main>
      <ul className="flex flex-col gap-6 bg-blue-200 lg:grid lg:grid-cols-2">
        {todos.map((todoObj) => (
          <TodoCard key={todoObj.id} todoObj={todoObj} />
        ))}
      </ul>
    </main>
  );
}

export default TodoList;
