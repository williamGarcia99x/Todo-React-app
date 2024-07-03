import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const TodosContext = createContext();
//add a todo, delete a todo, edit a todo

//this is the structure of a todo

const todoSample2 = {
  id: uuidv4(),
  taskName: "Grocery shopping",
  complexity: 3,
  priority: 5,
  dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), // Due in 2 days
  dueTime: { hours: 2, minutes: 23 },
  checkList: [
    { task: "Buy milk", isComplete: true },
    { task: "Buy veggies", isComplete: true },
    { task: "Buy cat food", isComplete: false },
  ],
  tags: ["shopping", "urgent", "boring", "cleanliness"],
  percentComplete: 0,
  isComplete: false,
};

const todoSample3 = {
  id: uuidv4(),
  taskName: "Finish project report",
  complexity: 8,
  priority: 9,
  dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Due in 7 days
  dueTime: { hours: 0, minutes: 23 },
  checkList: [
    { task: "Present to teammates", isComplete: false },
    { task: "Review final draft", isComplete: false },
  ],
  tags: ["work", "important", "urgent"],
  percentComplete: 20,
  isComplete: false,
};
const initialState = [todoSample2, todoSample3];

function serializeDates(todoArray) {
  return todoArray.map((obj) => {
    return { ...obj, dueDate: obj.dueDate.getTime() };
  });
}

function deserializeDates(todoArray) {
  return todoArray.map((obj) => {
    return { ...obj, dueDate: new Date(obj.dueDate) };
  });
}

//It is required to serialize the todo objects before writing them to localStorage so that when the data is obtained from localStorage, the dueDate is extracted seamlessly.

function TodosProvider({ children }) {
  const [todos, setTodos] = useState(function () {
    const storedValue = localStorage.getItem("todos");
    return storedValue
      ? deserializeDates(JSON.parse(storedValue))
      : initialState;
  });

  function addTodo(newTodo) {
    setTodos((state) => [...state, newTodo]);
  }

  function editTodo(editThisTodo) {
    setTodos((state) =>
      state.map((obj) => (obj.id === editThisTodo.id ? editThisTodo : obj)),
    );
  }

  function getTodo(id) {
    console.log("calling getTodo");
    return todos.find((obj) => obj.id === id);
  }

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(serializeDates(todos)));
    },
    [todos],
  );

  return (
    <TodosContext.Provider value={{ todos, addTodo, editTodo, getTodo }}>
      {children}
    </TodosContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error("TodosContext was used outside of the TodosProvider");
  }
  return context;
}

export { TodosProvider, useTodos };
