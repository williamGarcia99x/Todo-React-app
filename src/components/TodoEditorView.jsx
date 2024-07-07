import { DatePicker, TimePicker } from "antd";
import { Form } from "antd";
import RadioGroup from "../components/RadioGroup";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "./TextInput";

function FormLabel({ children, className = "" }) {
  return <label className={twMerge("text-lg", className)}>{children}</label>;
}

const initialState = {
  id: uuidv4(),
  taskName: "",
  complexity: 0,
  priority: 0,
  dueDate: null,
  dueTime: null,
  checkList: [],
  tags: [],
  percentComplete: 0,
  isComplete: false,
};

function formatDate(date) {
  const output = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return output;
}

//To make this component reusable for the Add New Todo page and the Edit Todo page, we want this component to have a list of props with should be used to initialize all the pieces of state in the form. If these props are undefined, then set the form input value to the initial state value. We also want to pass a prop "onSubmit" which should be executed whenever the form is submitted.

//editThisTodo is an optional parameter. It will be supplied in the Edit Todo page but not in the Add Todo page
function TodoEditorView({ onSubmit, editThisTodo = initialState }) {
  const [checkList, setCheckList] = useState(editThisTodo.checkList);
  const [priority, setPriority] = useState(editThisTodo.priority);
  const [complexity, setComplexity] = useState(editThisTodo.complexity);
  const [showPriorityErrMsg, setShowPriorityErrMsg] = useState(false);
  const [showComplexityErrMsg, setShowComplexityErrMsg] = useState(false);
  const [form] = Form.useForm();

  function handleSubmit(values) {
    //The task name and due date are validated by the ant.design components so only perform manual validation for the priority level and complexity level
    let isSubmissionInvalid;

    if (!priority) {
      setShowPriorityErrMsg(true);
      isSubmissionInvalid = true;
    }
    if (!complexity) {
      setShowComplexityErrMsg(true);
      isSubmissionInvalid = true;
    }
    if (isSubmissionInvalid) return;
    console.log(values.dueTime);
    const userInput = {
      ...editThisTodo,
      id: editThisTodo.id,
      taskName: values.taskName,
      complexity,
      priority,
      dueDate: values.dueDate.$d,
      dueTime: values.dueTime && {
        hours: values.dueTime.$d.getHours(),
        minutes: values.dueTime.$d.getMinutes(),
      },
      checkList,
      tags:
        values.tags.length > 0
          ? values.tags.split(",").map((val) => val.trim().toLowerCase())
          : [],
    };

    onSubmit(userInput);
  }

  function handleAddCheckListItem() {
    const { checklistItem } = form.getFieldsValue(["checklistItem"]);
    if (checklistItem) {
      setCheckList((state) => [
        ...state,
        { task: checklistItem.trim(), isComplete: false },
      ]);
      form.resetFields(["checklistItem"]);
    }
  }

  function handleDeleteCheckListItem(index) {
    console.log(`delete item at pos ${index}`);
    setCheckList((state) => state.filter((_, i) => i !== index));
  }

  function handleEditCheckListItem(e, index) {
    //Use the index to update the checklist item at the corresponding position in the checklist array
    setCheckList((state) =>
      state.map((item, i) =>
        i === index ? { ...item, task: e.target.value } : item,
      ),
    );
  }

  function handleFailedSubmit() {
    //validate the manually controlled fields every time a submit event occurs
    if (!priority) setShowPriorityErrMsg(true);
    if (!complexity) setShowComplexityErrMsg(true);
  }

  function handlePriorityLevelChange(index) {
    setPriority((prt) => (prt === index ? 0 : index));
    //show error if when changing the priority level, the priority results in falsy value
    setShowPriorityErrMsg(priority === index ? true : false);
  }
  function handleComplexityLevelChange(index) {
    setComplexity((cpt) => (cpt === index ? 0 : index));
    //show error if when changing the priority level, the priority results in falsy value
    setShowComplexityErrMsg(complexity === index ? true : false);
  }

  //set the initial values for Task Name, Due Date, and Tags on the ant.design form components. Effect should only execute in the beginning
  useEffect(
    function () {
      form.setFieldsValue({
        taskName: editThisTodo.taskName,
        tags: editThisTodo.tags.join(", "),
        dueDate: editThisTodo.dueDate && dayjs(editThisTodo.dueDate),
        dueTime:
          editThisTodo.dueTime &&
          dayjs(
            new Date(
              "",
              "",
              "",
              editThisTodo.dueTime.hours,
              editThisTodo.dueTime.minutes,
            ),
          ),
      });
    },
    [editThisTodo, form],
  );

  return (
    <Form
      form={form}
      onFinishFailed={handleFailedSubmit}
      onFinish={handleSubmit}
      className="flex flex-col gap-4"
    >
      <fieldset className="flex flex-col gap-1">
        <FormLabel>Task Name</FormLabel>
        <Form.Item
          name="taskName"
          className="mb-0"
          rules={[{ required: true, message: "Please provide a task name!" }]}
        >
          {/* <Input
            className="rounded-3xl px-4 py-2 text-base"
            placeholder="Research the company and its culture"
          /> */}
          <TextInput placeholder="Buy cake for Sarah's birthdays" />
        </Form.Item>
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <FormLabel>Select Priority Level</FormLabel>
        <RadioGroup
          numberOfOptions={10}
          initialSelectedOption={priority}
          keyGroupName="priority"
          optionStyle="bg-[#dfebf5] hover:ring-1 hover:ring-[#079aff]"
          selectedOptionStyle="bg-[#079aff] text-white"
          onSelectOption={handlePriorityLevelChange}
          showError={showPriorityErrMsg}
          errorMessage={"Please provide a priority level!"}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <FormLabel>Select Complexity Level</FormLabel>
        <RadioGroup
          numberOfOptions={10}
          initialSelectedOption={complexity}
          keyGroupName="complexity"
          optionStyle="bg-blue-light hover:ring-1 hover:ring-blue-hover-ring"
          selectedOptionStyle="bg-[#079aff] text-white"
          onSelectOption={handleComplexityLevelChange}
          showError={showComplexityErrMsg}
          errorMessage={"Please provide a complexity level!"}
        />
      </fieldset>
      <fieldset className="flex justify-between">
        <div className="flex flex-col gap-2">
          <FormLabel className="">Due Date</FormLabel>
          <Form.Item
            name="dueDate"
            className="mb-0"
            rules={[{ required: true, message: "Please provide a due date" }]}
          >
            <DatePicker
              className="w-[175px] rounded-3xl p-3"
              minDate={dayjs(formatDate(new Date()), "MM/DD/YYYY")}
              format={{ format: "MM/DD/YYYY" }}
            />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2">
          <FormLabel className="block">Select Time</FormLabel>
          <Form.Item name="dueTime" noStyle={true}>
            <TimePicker
              className="w-[175px] rounded-3xl p-3"
              format="HH:mm"
              use12Hours={true}
            />
          </Form.Item>
        </div>
      </fieldset>
      <div>
        <fieldset className="flex flex-col gap-2">
          <FormLabel>Add Subtasks</FormLabel>
          <div className="">
            <Form.Item name="checklistItem" noStyle={true}>
              <TextInput
                className=""
                placeholder="Research the company and its culture"
                suffix={
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="h-5 w-5 cursor-pointer rounded-[50%] bg-[#dfebf5] p-1 hover:ring-1 hover:ring-[#079aff]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddCheckListItem();
                    }}
                  />
                }
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              />
            </Form.Item>
          </div>
        </fieldset>
        <ol className="checklist-container flex max-h-36 flex-col items-end gap-1 overflow-y-auto">
          {checkList.map((item, index) => (
            <TextInput
              required
              className="w-[95%] border-white"
              key={index}
              value={item.task}
              onChange={(e) => handleEditCheckListItem(e, index)}
              prefix={<span className="mr-2">{index + 1}.</span>}
              suffix={
                <FontAwesomeIcon
                  className="h-5 w-5 cursor-pointer rounded-[50%] bg-[#dfebf5] bg-[#ff41331b] p-1 hover:ring-1 hover:ring-[#ff4133]"
                  icon={faXmark}
                  onClick={() => handleDeleteCheckListItem(index)}
                />
              }
            />
          ))}
        </ol>
      </div>
      <fieldset className="flex flex-col gap-2">
        <FormLabel>Add Tags</FormLabel>
        <Form.Item name="tags">
          <TextInput placeholder="Interview, Urgent" />
        </Form.Item>
      </fieldset>

      <div className="flex justify-center">
        <button className="rounded-3xl bg-main-blue px-7 py-2 text-white hover:bg-[#047ecf]">
          Save
        </button>
      </div>
    </Form>
  );
}

export default TodoEditorView;
// This component represents the form to add a Todo task or edit a Todo task
