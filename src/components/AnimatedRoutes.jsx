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
        <Route index element={<MainMenu />} />
        {/* Need to ensure ID exists before fully rendering TodoDetailedView. Otherwise route to the Page not Found page */}
        <Route path=":id" element={<TodoDetailedView />} />
        <Route path="edit/:id" element={<EditTodo />} />
        <Route path="new" element={<AddNewTodo />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
