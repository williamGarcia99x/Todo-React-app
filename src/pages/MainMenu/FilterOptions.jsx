import { useEffect, useRef, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodos } from "../../contexts/TodosContext";

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Due Date: earliest first", value: "ascending-due-date" },
  { label: "Due Date: latest first", value: "descending-due-date" },
  { label: "Complexity: low to high", value: "ascending-complexity" },
  { label: "Complexity: high to low", value: "descending-complexity" },
  { label: "Priority: low to high", value: "ascending-priority" },
  { label: "Priority: high to low", value: "descending-priority" },
];

function FilterOptions({
  optionsDispatch,
  sortOptionSelected,
  filterOptionsSelected,
}) {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const sortFieldsetRef = useRef(null);
  const filterFieldsetRef = useRef(null);
  const { todos } = useTodos();

  const tags = [...new Set(todos.flatMap((todo) => todo.tags))];

  function handleSortChange(e) {
    optionsDispatch({ type: "sortOptionChange", payload: e.target.value });
  }

  function handleFilterChange(e) {
    optionsDispatch({ type: "filterOptionsChange", payload: e.target.value });
  }

  useEffect(function () {
    function handleClickOutside(e) {
      if (
        //if the user did not click on the Sort By fieldset AND the user did not click on the Filter By fieldset, then change both state values to false
        !sortFieldsetRef.current.contains(e.target) &&
        !filterFieldsetRef.current.contains(e.target)
      ) {
        setShowSortOptions(false);
        setShowFilterOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    //When the component unmounts, remove this event listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center gap-10">
      <fieldset
        className="relative flex flex-grow basis-1/4 justify-center rounded-xl border border-black"
        ref={sortFieldsetRef}
      >
        <button
          className="w-full"
          onClick={() => setShowSortOptions((state) => !state)}
        >
          Sort By
          <FontAwesomeIcon icon={showSortOptions ? faAngleUp : faAngleDown} />
        </button>
        {/* Below is the set of sort options that is to be conditionally rendered */}
        {showSortOptions && (
          <ul className="absolute top-8 w-[125%] rounded-md border bg-white p-2 shadow-lg">
            {sortOptions.map((option) => (
              <li
                className="flex justify-between border-b-2"
                key={option.value}
              >
                <label>{option.label}</label>
                <input
                  type="radio"
                  value={option.value}
                  name="sort"
                  checked={sortOptionSelected === option.value}
                  onChange={handleSortChange}
                />
              </li>
            ))}
          </ul>
        )}
      </fieldset>
      <fieldset
        className="relative flex flex-grow basis-1/4 justify-center rounded-xl border border-black"
        ref={filterFieldsetRef}
      >
        <button
          className="w-full"
          onClick={() => setShowFilterOptions((state) => !state)}
        >
          Filter By
          <FontAwesomeIcon icon={showFilterOptions ? faAngleUp : faAngleDown} />
        </button>
        {/* Below is the set of filter options that is to be conditionally rendered */}
        {showFilterOptions && (
          <ul className="absolute top-8 w-3/4 rounded-md border bg-white p-2 shadow-lg">
            {/* Display filters if there exists any */}
            {tags.map((tag, i) => (
              <li className="flex justify-between border-b-2" key={i + tag}>
                <label>
                  {tag[0].toUpperCase() + tag.slice(1).toLowerCase()}
                </label>
                <input
                  type="checkbox"
                  value={tag}
                  checked={filterOptionsSelected.includes(tag)}
                  onChange={handleFilterChange}
                />
              </li>
            ))}
          </ul>
        )}
      </fieldset>
    </div>
  );
}

export default FilterOptions;
