import { Link, useNavigate, useParams } from "react-router-dom";
import TodoEditorView from "../../components/TodoEditorView";
import { useTodos } from "../../contexts/TodosContext";

function EditTodo() {
  const { editTodo, getTodo } = useTodos();
  const { id } = useParams();
  const navigate = useNavigate();
  //don't need separate piece of state to hold the todo to edit. Component will only re-render
  const editThisTodo = getTodo(id);

  console.log(editThisTodo);
  console.log(id);
  function handleSubmit(todo) {
    editTodo(todo);
    navigate("/todos");
  }

  return (
    <div className="todo-editor-page-container">
      <div className="relative mb-7 text-3xl">
        <Link className="absolute" to="/todos">
          <p className="blue-hover-ring flex h-8 w-8 items-center justify-center rounded-[50%] hover:ring-2">
            &larr;
          </p>
        </Link>
        <h1 className="text-center">Edit Todo</h1>
      </div>
      <TodoEditorView onSubmit={handleSubmit} editThisTodo={editThisTodo} />
    </div>
  );
}

export default EditTodo;
