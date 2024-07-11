import { createContext, useContext, useEffect, useState } from "react";

const TodosContext = createContext();

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
    return storedValue ? deserializeDates(JSON.parse(storedValue)) : [];
  });

  function addTodo(newTodo) {
    setTodos((state) => [...state, newTodo]);
  }

  function getTodo(id) {
    return todos.find((obj) => obj.id === id);
  }

  function editTodo(editThisTodo) {
    setTodos((state) =>
      state.map((obj) => (obj.id === editThisTodo.id ? editThisTodo : obj)),
    );
  }

  function deleteTodo(id) {
    setTodos((state) => state.filter((todoObj) => todoObj.id !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(serializeDates(todos)));
    },
    [todos],
  );

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, editTodo, getTodo, deleteTodo }}
    >
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
