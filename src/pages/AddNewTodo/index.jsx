import { Link, useNavigate } from "react-router-dom";
import TodoEditorView from "../../components/TodoEditorView";
import { useTodos } from "../../contexts/TodosContext";

function AddNewTodo() {
  const { addTodo } = useTodos();
  const navigate = useNavigate();
  function handleSubmit(todo) {
    addTodo(todo);
    navigate("/todos");
  }

  return (
    <div className="page-container-default">
      <div className="relative mb-7 text-3xl">
        <Link className="absolute" to="/todos">
          <p className="blue-hover-ring flex h-8 w-8 items-center justify-center rounded-[50%] hover:ring-2">
            &larr;
          </p>
        </Link>
        <h1 className="text-center">Add New Todo</h1>
      </div>
      <TodoEditorView onSubmit={handleSubmit} />
    </div>
  );
}

export default AddNewTodo;
