import { BrowserRouter } from "react-router-dom";
import { TodosProvider } from "./contexts/TodosContext";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <TodosProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TodosProvider>
  );
}

export default App;
