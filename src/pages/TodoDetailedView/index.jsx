import { Link, useParams } from "react-router-dom";
import TodoCard from "../../components/TodoCard";
import { useTodos } from "../../contexts/TodosContext";

function TodoDetailedView() {
  const { getTodo } = useTodos();
  const { id } = useParams();
  //don't need separate piece of state to hold the todo to edit. Component will only re-render
  const todo = getTodo(id);

  return (
    <div className="page-container-default">
      <header className="relative mb-7 text-3xl">
        <Link className="absolute" to="/todos">
          <p className="blue-hover-ring flex h-8 w-8 items-center justify-center rounded-[50%] hover:ring-2">
            &larr;
          </p>
        </Link>
        <h1 className="text-center">Task Details</h1>
      </header>
      <div className="flex justify-center">
        <TodoCard
          todoObj={todo}
          inHomePage={false}
          className="px-3 py-6 text-lg"
        />
      </div>
    </div>
  );
}

export default TodoDetailedView;
