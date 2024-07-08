import TodoCard from "../../components/TodoCard";

function TodoList({ todos }) {
  return (
    <main>
      <ul className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
        {todos.map((todoObj) => (
          <li key={todoObj.id}>
            <TodoCard
              todoObj={todoObj}
              className="h-[194px] p-6 hover:bg-[#8cd7ff83] hover:shadow-xl"
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TodoList;
