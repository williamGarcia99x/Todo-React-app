import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainMenu from "../pages/MainMenu/index";
import TodoDetailedView from "../pages/TodoDetailedView/index";
import EditTodo from "../pages/EditTodo/index";
import AddNewTodo from "../pages/AddNewTodo/index";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Navigate replace to="todos" />} />
        <Route path="todos" element={<MainMenu />} />
        {/* Need to ensure ID exists before fully rendering TodoDetailedView. Otherwise route to the Page not Found page */}
        <Route path="todos/:id" element={<TodoDetailedView />} />
        <Route path="todos/edit/:id" element={<EditTodo />} />
        <Route path="todos/new" element={<AddNewTodo />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
