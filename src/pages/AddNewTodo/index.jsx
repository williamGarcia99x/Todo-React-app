import { Link, useNavigate } from "react-router-dom";
import TodoEditorView from "../../components/TodoEditorView";
import { useTodos } from "../../contexts/TodosContext";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

function AddNewTodo() {
  const { addTodo } = useTodos();
  const navigate = useNavigate();
  function handleSubmit(todo) {
    addTodo(todo);
    navigate("/todos");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
    >
      <div className="page-container-default min-h-screen">
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
      <Footer />
    </motion.div>
  );
}

export default AddNewTodo;
