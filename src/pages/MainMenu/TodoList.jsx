import TodoCard from "../../components/TodoCard";

function TodoList({ todos }) {
  return (
    <main>
      <ul className="flex flex-col gap-6">
        {todos.map((todoObj) => (
          <TodoCard key={todoObj.id} todoObj={todoObj} />
        ))}
      </ul>
    </main>
  );
}

export default TodoList;
