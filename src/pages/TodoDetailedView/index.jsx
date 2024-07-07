import { Link, useParams } from "react-router-dom";
import TodoCard from "../../components/TodoCard";
import { useTodos } from "../../contexts/TodosContext";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";

function TodoDetailedView() {
  const { getTodo, editTodo } = useTodos();
  const { id } = useParams();
  //don't need separate piece of state to hold the todo to edit. Component will only re-render
  const todo = getTodo(id);

  function handleCheckOffSubtask(itemId) {
    const todoEdit = {
      ...todo,
      checkList: todo.checkList.map((checkListItem, index) =>
        index === itemId
          ? { ...checkListItem, isComplete: !checkListItem.isComplete }
          : checkListItem,
      ),
    };

    editTodo(todoEdit);
  }

  return (
    <div className="page-container-default">
      <header className="relative mb-7 flex justify-between text-3xl">
        <Link to="/todos">
          <p className="blue-hover-ring flex h-8 w-8 items-center justify-center rounded-[50%] hover:ring-2">
            &larr;
          </p>
        </Link>
        <h1 className="text-center">Task Details</h1>
        <Link
          to={`/todos/edit/${todo.id}`}
          className="blue-hover-ring right-0 flex h-8 w-8 items-center justify-center rounded-[50%] hover:ring-2"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faPencil} />
        </Link>
      </header>
      <div className="mb-6 flex justify-center">
        <TodoCard
          todoObj={todo}
          inHomePage={false}
          className="px-3 py-6 text-lg"
        />
      </div>
      <section>
        <h2 className="mb-2 text-lg">Checklist for subtasks</h2>
        <ol className="flex flex-col gap-3">
          {todo.checkList.map((item, i) => (
            <li key={i} className="rounded-3xl border p-2 shadow-md">
              <div
                className={twMerge(
                  "flex items-center justify-between font-light",
                )}
              >
                <h3 className="flex gap-2">
                  <span className="w-7 text-right">{`${i + 1}. `}</span>
                  {item.task}
                </h3>
                <button
                  className={twMerge(
                    "flex h-7 w-7 items-center justify-center rounded-full bg-blue-light",
                    item.isComplete && "bg-main-blue text-white",
                  )}
                  onClick={() => handleCheckOffSubtask(i)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default TodoDetailedView;
