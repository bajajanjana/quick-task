import React, { useState } from "react";
import styles from "./CreateTaskCard.module.css";
import * as IoIcon4 from "react-icons/io";

const CreateTaskCard = (props) => {
  const [taskCardDesc, setTaskCardDesc] = useState();
  const addTaskBtnHandler = () => {
    props.addTaskBtnHandler(true, taskCardDesc);
    setTaskCardDesc("");
    console.log("task added");
  };
  return (
    <div className={styles.createTaskCard}>
      <div>
        <input
          type="text"
          placeholder="Enter task description..."
          className={styles.createTaskInput}
          value={taskCardDesc}
          onChange={(e) => {
            setTaskCardDesc(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.addTaskDiv}>
        <button className={styles.addTaskBtn} onClick={addTaskBtnHandler}>
          Add Task
        </button>
        <span>
          <IoIcon4.IoIosClose
            className={styles.addTaskCancelIcon}
            onClick={() => {
              props.addTaskBtnHandler(false, null);
            }}
          ></IoIcon4.IoIosClose>
        </span>
      </div>
    </div>
  );
};

export default CreateTaskCard;
