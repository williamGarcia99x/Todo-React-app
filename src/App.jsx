import PageContainer from "./components/Layout/PageContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu/index";
import TodoDetailedView from "./pages/TodoDetailedView/index";
import EditTodo from "./pages/EditTodo/index";
import AddNewTodo from "./pages/AddNewTodo/index";
import { TodosProvider } from "./contexts/TodosContext";

function App() {
  return (
    <div className="bg-slate-300">
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="todos" />} />
            <Route path="todos" element={<MainMenu />} />
            {/* Need to ensure ID exists before fully rendering TodoDetailedView. Otherwise route to the Page not Found page */}
            <Route path="todos/:id" element={<TodoDetailedView />} />
            <Route path="todos/edit/:id" element={<EditTodo />} />
            <Route path="todos/new" element={<AddNewTodo />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </div>
  );
}

export default App;
