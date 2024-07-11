import { Link, useNavigate, useParams } from "react-router-dom";
import TodoCard from "../../components/TodoCard";
import { useTodos } from "../../contexts/TodosContext";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function TodoDetailedView() {
  const { getTodo, editTodo, deleteTodo } = useTodos();
  const { id } = useParams();
  //don't need separate piece of state to hold the todo to edit. Component will only re-render
  const todo = getTodo(id);
  const navigate = useNavigate();

  function toggleTodoCompletion() {
    const todoEdit = {
      ...todo,
    };

    //It todo is not complete, then toggle all checklist items complete and mark bool flag isComplete to true
    if (!todo.isComplete) {
      if (todo.checkList.length > 0) {
        todoEdit.checkList = todoEdit.checkList.map((checkListItem) => {
          return { ...checkListItem, isComplete: true };
        });
      }
      todoEdit.isComplete = true;
    }
    //It todo is complete, then toggle all checklist items incomplete and mark bool flag isComplete to false
    else {
      if (todo.checkList.length > 0) {
        todoEdit.checkList = todoEdit.checkList.map((checkListItem) => {
          return { ...checkListItem, isComplete: false };
        });
      }
      todoEdit.isComplete = false;
    }

    editTodo(todoEdit);
  }

  function handleCheckOffSubtask(itemId) {
    const todoEdit = {
      ...todo,
      checkList: todo.checkList.map((checkListItem, index) =>
        index === itemId
          ? { ...checkListItem, isComplete: !checkListItem.isComplete }
          : checkListItem,
      ),
    };
    todoEdit.isComplete = todoEdit.checkList.every(
      (checkListItem) => checkListItem.isComplete,
    );
    editTodo(todoEdit);
  }

  function handleDeleteTodo() {
    const confirm = window.confirm(
      "Are you sure you wish to delete this Todo?",
    );
    if (confirm) {
      deleteTodo(todo.id);
      navigate("/todos");
    }
  }

  return (
    <div className="page-container-default min-h-screen">
      <header className="mb-7 flex items-center justify-between text-3xl">
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
      <div className="flex justify-center">
        <TodoCard
          todoObj={todo}
          inHomePage={false}
          className="px-3 py-6 text-lg"
        />
      </div>
      <section
        className={twMerge("hidden", todo.checkList.length > 0 && "mt-6 block")}
      >
        <h2 className="mb-2 text-lg">Checklist for subtasks</h2>
        <ol className="flex max-h-[380px] flex-col gap-3 overflow-y-auto">
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
      <div className="mt-6 flex justify-center">
        <button
          className="w-52 rounded-3xl bg-main-blue py-2 text-white hover:ring-1 hover:ring-main-blue"
          onClick={toggleTodoCompletion}
        >
          <FontAwesomeIcon
            icon={todo.isComplete ? faXmark : faCheck}
            className="mr-2"
          />
          {todo.isComplete ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          className="hover w-52 rounded-3xl bg-red-deletion py-2 hover:ring-1 hover:ring-[#ff4133]"
          onClick={handleDeleteTodo}
        >
          <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
          Delete Todo
        </button>
      </div>
    </div>
  );
}

export default TodoDetailedView;
