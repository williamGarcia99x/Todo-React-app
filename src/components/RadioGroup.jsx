import { useState } from "react";
import { twMerge } from "tailwind-merge";

function RadioGroup({
  initialSelectedOption = 0,
  numberOfOptions,
  keyGroupName,
  selectedOptionStyle,
  onSelectOption,
  showError,
  errorMessage,
  optionStyle = "",
}) {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  function handleSelection(index) {
    setSelectedOption((option) => (option === index ? 0 : index));

    //Why does calling onSelectOption before setSelectedOption result in an error?
    onSelectOption(index);
  }

  return (
    <div
      className={twMerge(
        "relative transition-all duration-200 ease-in",
        showError ? "mb-6" : "mb-0", // Adjust margin based on error visibility
      )}
    >
      <ul
        className={twMerge(
          `flex flex-nowrap justify-between p-1 transition-all duration-200 ease-in`,
          showError && "rounded-md ring-1 ring-[#ff4d4f]",
        )}
      >
        {Array.from({ length: numberOfOptions }, (_, index) => (
          <li
            className={twMerge(
              "flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded-[50%]",
              // eslint-disable-next-line prettier/prettier
              optionStyle,
              // eslint-disable-next-line prettier/prettier
              selectedOption === index + 1 ? selectedOptionStyle : "",
            )}
            key={`${keyGroupName}:${index + 1}`}
            onClick={() => handleSelection(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <p
        className={twMerge(
          `absolute -bottom-3 left-0 text-[#ff4d4f] opacity-0 transition-all duration-200 ease-in`,
          showError && "-bottom-6 opacity-100",
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default RadioGroup;
