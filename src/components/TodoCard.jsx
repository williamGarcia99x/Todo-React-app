/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
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

const blue = "#079aff";
const orange = "#fe7e09";
const red = "#ff4033";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getTodoColor(todoDueDate) {
  const currentDate = new Date();

  const timeDifference = todoDueDate - currentDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (daysDifference < 1) {
    return red;
  } else if (daysDifference < 3) {
    return orange;
  } else {
    return blue;
  }
}

function TodoCard({ todoObj }) {
  const navigate = useNavigate();

  const progressCompletion = Math.trunc(
    (todoObj.checkList.reduce(
      (acc, val) => (val.isComplete ? acc + 1 : acc),
      0,
    ) /
      todoObj.checkList.length) *
      100,
  );

  //calculate the color of the todo based on how close we are to it's due date

  function handleClickOnEdit(e, todoId) {
    e.stopPropagation();
    navigate(`edit/${todoId}`);
  }

  return (
    <li onClick={() => navigate(`${todoObj.id}`)} className="cursor-pointer">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <figure
            className="h-4 w-4 rounded-[50%]"
            style={{ backgroundColor: `${getTodoColor(todoObj.dueDate)}` }}
          ></figure>
          <p className="font-medium">{todoObj.taskName}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={(e) => handleClickOnEdit(e, todoObj.id)}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>
      <div className="flex">
        <FontAwesomeIcon className="h-4 w-4" icon={faCalendar} />
        <p>Due Date: {formatDate(todoObj.dueDate)} </p>
      </div>

      <div className="relative flex justify-between">
        <div>
          <p>Priority: {todoObj.priority}</p>
          <p>Complexity: {todoObj.complexity}</p>
        </div>
        <div className="absolute right-0 h-14 w-14">
          <CircularProgressbar
            styles={buildStyles({
              textSize: "25px",
              pathColor: `${getTodoColor(todoObj.dueDate)}`,
              textColor: "#000",
            })}
            value={progressCompletion}
            text={`${progressCompletion}%`}
          />
        </div>
      </div>

      <ul className="flex gap-4">
        {todoObj.tags.map((tag, i) => (
          <li key={i + tag}>
            {tag[0].toUpperCase() + tag.slice(1).toLowerCase()}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default TodoCard;
