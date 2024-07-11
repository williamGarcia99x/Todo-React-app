import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu/index";
import TodoDetailedView from "./pages/TodoDetailedView/index";
import EditTodo from "./pages/EditTodo/index";
import AddNewTodo from "./pages/AddNewTodo/index";
import { TodosProvider } from "./contexts/TodosContext";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <div className="">
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
      <footer className="mt-auto bg-[#004f83cd]">
        <div className="flex justify-center">
          <div className="translate-y-4 text-center text-gray-300 sm:translate-y-6">
            <p className="text-3xl sm:text-5xl"> My Todos</p>
            <em className="text-sm sm:text-lg">An App by William Garcia</em>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 pb-1 pr-4 text-white">
          <a
            href="https://www.linkedin.com/in/wgarcia99/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="h-auto w-6 sm:w-10" icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/williamGarcia99x"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="h-auto w-6 sm:w-10" icon={faGithub} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
