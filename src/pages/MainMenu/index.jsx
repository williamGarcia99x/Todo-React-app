import { useReducer } from "react";
import { useTodos } from "../../contexts/TodosContext";
import TodoList from "./TodoList";
import FilterOptions from "./FilterOptions";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/TextInput";

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
    <div className="todo-editor-page-container">
      <Header>
        <form
          className="mb-6 flex w-[75%] flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextInput
            placeholder="Search..."
            prefix={
              <FontAwesomeIcon className="mr-2" icon={faMagnifyingGlass} />
            }
            value={query}
            onChange={(e) =>
              optionsDispatch({ type: "queryChange", payload: e.target.value })
            }
          />
          <FilterOptions
            optionsDispatch={optionsDispatch}
            sortOptionSelected={sortOptionSelected}
            filterOptionsSelected={filterOptionsSelected}
          />
        </form>
      </Header>
      <TodoList todos={filteredTodos} />
      <Link to="new">+ Add New Task</Link>
    </div>
  );
}

/**MainMenu page receives the todos and it filters them based on the tags and query. It also sorts them. It then feeds this filtered array into the TodoList */
