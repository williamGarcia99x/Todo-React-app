import { useReducer } from "react";
import { useTodos } from "../../contexts/TodosContext";
import TodoList from "./TodoList";
import FilterOptions from "./FilterOptions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFrown,
  faMagnifyingGlass,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/TextInput";
import Todo from "../../assets/blue-check.png";
import { motion } from "framer-motion";

function reducer(state, action) {
  switch (action.type) {
    case "queryChange":
      return {
        ...state,
        query: action.payload,
      };
    case "sortOptionChange":
      return {
        ...state,
        sortOptionSelected: action.payload,
      };
    case "filterOptionsChange": {
      const filterOptionValue = action.payload;
      return {
        ...state,
        filterOptionsSelected: state.filterOptionsSelected.includes(
          filterOptionValue,
        )
          ? state.filterOptionsSelected.filter(
              (tag) => tag !== filterOptionValue,
            )
          : [...state.filterOptionsSelected, filterOptionValue],
      };
    }
  }
}

function filterTodos(todos, query, filterTags, sortOption, showCompleted) {
  let filteredTodos = todos.filter((el) =>
    el.taskName.toLowerCase().includes(query.toLowerCase()),
  );
  filteredTodos = filteredTodos.filter((el) =>
    filterTags.every((tag) => el.tags.includes(tag.toLowerCase())),
  );

  if (showCompleted) {
    filteredTodos = filteredTodos.filter((el) => el.isComplete === true);
  }

  switch (sortOption) {
    case "ascending-due-date":
      filteredTodos.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case "descending-due-date":
      filteredTodos.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case "ascending-complexity":
      filteredTodos.sort((a, b) => a.complexity - b.complexity);
      break;
    case "descending-complexity":
      filteredTodos.sort((a, b) => b.complexity - a.complexity);
      break;
    case "ascending-priority":
      filteredTodos.sort((a, b) => a.priority - b.priority);
      break;
    case "descending-priority":
      filteredTodos.sort((a, b) => b.priority - a.priority);
  }

  return filteredTodos;
}

const initialState = {
  query: "",
  sortOptionSelected: "default",
  filterOptionsSelected: [],
};

export default function MainMenu() {
  const [
    { query, sortOptionSelected, filterOptionsSelected },
    optionsDispatch,
  ] = useReducer(reducer, initialState);
  const { todos } = useTodos();
  const filteredTodos = filterTodos(
    todos,
    query,
    filterOptionsSelected,
    sortOptionSelected,
    false,
  );

  //We want the todos that have all of the selected tags
  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-4 my-4 flex items-center justify-center gap-4 lg:justify-start">
        <img src={Todo} className="h-10 w-10" />
        <h1 className="text-3xl font-semibold text-main-blue">My Todos</h1>
      </div>
      <div className="relative mx-auto flex min-w-[375px] flex-grow flex-col sm:min-w-[500px] lg:min-w-[900px]">
        <header className="mb-6 flex justify-center">
          <form
            className="flex basis-[400px] flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextInput
              placeholder="Search..."
              prefix={
                <FontAwesomeIcon className="mr-2" icon={faMagnifyingGlass} />
              }
              value={query}
              onChange={(e) =>
                optionsDispatch({
                  type: "queryChange",
                  payload: e.target.value,
                })
              }
            />
            <FilterOptions
              optionsDispatch={optionsDispatch}
              sortOptionSelected={sortOptionSelected}
              filterOptionsSelected={filterOptionsSelected}
            />
          </form>
        </header>
        {filteredTodos.length > 0 ? (
          <main className="flex flex-grow flex-col">
            <TodoList todos={filteredTodos} />
            <div className="flex flex-grow items-end justify-center py-4">
              <Link
                className="rounded-3xl bg-main-blue p-3 text-lg font-light text-white hover:ring-1 hover:ring-main-blue"
                to="new"
              >
                + Add New Task
              </Link>
            </div>
          </main>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex min-w-[300px] flex-col items-center justify-center gap-4 text-center text-gray-600">
              <FontAwesomeIcon
                icon={query.length === 0 ? faSmile : faFrown}
                size="4x"
              />
              <h2 className="text-2xl font-semibold">No todos found</h2>
              {query.length === 0 && (
                <>
                  <p className="text-lg">Get started by adding a new task!</p>
                  <Link
                    className="rounded-3xl bg-main-blue p-3 text-lg font-light text-white hover:ring-1 hover:ring-main-blue"
                    to="new"
                  >
                    + Add New Task
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**MainMenu page receives the todos and it filters them based on the tags and query. It also sorts them. It then feeds this filtered array into the TodoList */
