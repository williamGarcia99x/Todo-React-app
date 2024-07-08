/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  faPencil,
  faCheck,
  faArrowUp,
  faArrowsUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { twMerge } from "tailwind-merge";
import { Progress } from "antd";
import { useTodos } from "../contexts/TodosContext";
import { memo, useMemo } from "react";

const blue = "#079aff";
const orange = "#fe7e09";
const red = "#ff4033";
const green = "#52c419";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function dueDateLabel(todo) {
  const dueDate = todo.dueDate;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Reset hours, minutes, seconds, and milliseconds to zero for comparison
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate - today < 0) {
    return todo.isComplete
      ? `Completed! Was due on ${formatDate(dueDate)}`
      : `Overdue! Was due on ${formatDate(dueDate)}`;
  } else if (dueDate.getTime() === today.getTime()) {
    return todo.isComplete ? "Completed! It's due today" : "Today";
  } else if (dueDate.getTime() === tomorrow.getTime()) {
    return todo.isComplete ? "Completed! It's due tomorrow" : "Tomorrow";
  } else {
    return todo.isComplete
      ? `Completed! It's due ${formatDate(dueDate)}`
      : formatDate(dueDate);
  }
}

function getTodoColor(todo) {
  const todoDueDate = todo.dueDate;

  if (todo.isComplete) return green;
  const currentDate = new Date();
  const toDueDate = new Date(todoDueDate);
  currentDate.setHours(0, 0, 0, 0);
  toDueDate.setHours(0, 0, 0, 0);

  const timeDifference = toDueDate - currentDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (daysDifference <= 0) {
    return red;
  } else if (daysDifference < 3) {
    return orange;
  } else {
    return blue;
  }
}

function scaleNumberToCategory(scaleValue) {
  if (scaleValue <= 3) return "Low";
  if (scaleValue <= 7) return "Medium";
  else return "High";
}

function FontAwesomeIconCustom({ icon, className }) {
  return (
    <FontAwesomeIcon icon={icon} className={twMerge("h-4 w-4", className)} />
  );
}

//TagList re-renders everytime the todocard re-renders which causes the background color of the tags to change. This component should only re-render whenever the tags change

const TagList = memo(function TagList({ tags }) {
  let colorOptions = ["#d2e3c8b3", "#FEFFD2", "#FFEEF4", "#ccd3ca7f"];
  const chosenOptions = [];

  while (colorOptions.length > 0) {
    let chosenIndex = Math.floor(Math.random() * colorOptions.length);
    chosenOptions.push(colorOptions[chosenIndex]);
    colorOptions = colorOptions.filter((_, i) => i !== chosenIndex);
  }

  return (
    <ul className="flex gap-2">
      {tags.map((tag, i) => (
        <li
          className="rounded-md p-1 text-sm font-normal text-black"
          style={{ backgroundColor: `${chosenOptions[i]}` }}
          key={i + tag}
        >
          {tag[0].toUpperCase() + tag.slice(1).toLowerCase()}
        </li>
      ))}
    </ul>
  );
});

function TodoCard({ todoObj, className = "", inHomePage = true }) {
  const { editTodo } = useTodos();

  function toggleTodoCompletion() {
    const todoEdit = {
      ...todoObj,
    };

    //It todo is not complete, then toggle all checklist items complete and mark bool flag isComplete to true
    if (!todoObj.isComplete) {
      if (todoObj.checkList.length > 0) {
        todoEdit.checkList = todoEdit.checkList.map((checkListItem) => {
          return { ...checkListItem, isComplete: true };
        });
      }
      todoEdit.isComplete = true;
    }
    //It todo is complete, then toggle all checklist items incomplete and mark bool flag isComplete to false
    else {
      if (todoObj.checkList.length > 0) {
        todoEdit.checkList = todoEdit.checkList.map((checkListItem) => {
          return { ...checkListItem, isComplete: false };
        });
      }
      todoEdit.isComplete = false;
    }

    editTodo(todoEdit);
  }

  const progressCompletion =
    todoObj.checkList.length > 0
      ? Math.trunc(
          (todoObj.checkList.reduce(
            (acc, val) => (val.isComplete ? acc + 1 : acc),
            0,
          ) /
            todoObj.checkList.length) *
            100,
        )
      : todoObj.isComplete
        ? 100
        : 0;

  return (
    <div className={twMerge("rounded-xl border shadow-md", className)}>
      <div className={twMerge("flex justify-between", !inHomePage && "mb-1")}>
        <div className="flex items-center gap-2">
          <figure
            className="h-4 w-4 rounded-[50%]"
            style={{ backgroundColor: `${getTodoColor(todoObj)}` }}
          ></figure>
          {inHomePage ? (
            <Link to={todoObj.id} className="font-medium">
              {todoObj.taskName}
            </Link>
          ) : (
            <h3 className="font-medium">{todoObj.taskName}</h3>
          )}
        </div>
        {inHomePage && (
          <div className="flex gap-4">
            <Link
              to={`edit/${todoObj.id}`}
              className="todo-card-buttons text-gray-copulsory"
            >
              <FontAwesomeIcon icon={faPencil} />
            </Link>
            <button
              className="todo-card-buttons text-gray-copulsory"
              onClick={toggleTodoCompletion}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        )}
      </div>
      <div
        className={twMerge("flex items-center gap-2", !inHomePage && "mb-1")}
      >
        <FontAwesomeIconCustom className="" icon={faCalendar} />
        <p className="font-light text-gray-600">
          Due Date:{" "}
          <span className="" style={{ color: getTodoColor(todoObj) }}>
            {dueDateLabel(todoObj)}
          </span>
        </p>
      </div>
      <div className="mb-2 flex justify-between">
        <div>
          <div
            className={twMerge(
              "flex items-center gap-2",
              !inHomePage && "mb-1",
            )}
          >
            <FontAwesomeIconCustom icon={faArrowUp} />
            <p className="font-light text-gray-600">
              Priority:{" "}
              <span className="font-normal text-black">
                {scaleNumberToCategory(todoObj.priority)} ({todoObj.priority}
                /10)
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIconCustom icon={faArrowsUpDownLeftRight} />
            <p className="font-light text-gray-600">
              Complexity:{" "}
              <span className="font-normal text-black">
                {scaleNumberToCategory(todoObj.complexity)} (
                {todoObj.complexity}/10)
              </span>
            </p>
          </div>
        </div>
        {inHomePage && (
          <div className="relative h-14 w-14">
            <CircularProgressbar
              className="absolute right-0"
              styles={buildStyles({
                textSize: "25px",
                pathColor: `${getTodoColor(todoObj)}`,
                textColor: "#000",
              })}
              value={progressCompletion}
              text={`${progressCompletion}%`}
            />
          </div>
        )}
      </div>
      {!inHomePage && (
        <figure>
          <figcaption className="flex justify-between">
            <span>Task Completion</span>
            <span style={{ color: todoObj.isComplete ? green : blue }}>
              {progressCompletion}%
            </span>
          </figcaption>
          <Progress
            percent={progressCompletion}
            showInfo={false}
            size={{ width: "450px", height: "13px" }}
          />
        </figure>
      )}
      {inHomePage && <TagList tags={todoObj.tags} />}
    </div>
  );
}

export default TodoCard;
