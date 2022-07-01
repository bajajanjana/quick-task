import React, { useState } from "react";
import styles from "./ListCard.module.css";
import * as IoIcon4 from "react-icons/io";
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";
const ListCard = (props) => {
  const [addTaskBtnActive, setAddTaskBtnActive] = useState(true);
  const [dragIndex, setDragIndex] = useState();
  const addTaskHandler = (desc) => {
    console.log("added");
    props.taskCard.push({ desc: `${desc}` });
    const updatedList = props.list.map((item) => item);
    props.updateList(updatedList);
  };
  const removeDraggedTaskHandler = (index) => {
    setDragIndex(index);
  };
  const shiftTaskHandler = (desc, index) => {
    props.taskCard.splice(dragIndex, 1);
    props.taskCard.splice(index, 0, { desc: desc });
    let updatedList = props.list.map((item) => item);
    props.updateList(updatedList);
  };
  const pushTaskHandler = (desc, index) => {
    props.taskCard.splice(index, 0, { desc: desc });
    let updatedList = props.list.map((item) => item);
    props.updateList(updatedList);
  };

  const addTaskBtnHandler = (isNewTaskCreated, desc) => {
    if (isNewTaskCreated) {
      setAddTaskBtnActive(true);
      addTaskHandler(desc);
      return;
    }
    setAddTaskBtnActive(true);
  };

  return (
    <>
      <div
        className={styles.listCard}
        draggable="true"
        onDragStart={(ev) => {
          ev.dataTransfer.setData("string", props.title);
          props.removeDraggedList(props.index);
        }}
        onDrop={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          var data = ev.dataTransfer.getData("string");
          props.shiftListCard(data, props.index);
        }}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
      >
        <h4>{props.title}</h4>
        <hr className={styles.line}></hr>
        <div className={styles.taskList}>
          {props.taskCard.map((item, index) => {
            return (
              <TaskCard
                desc={item.desc}
                index={index}
                listIndex={props.index}
                dragIndex={dragIndex}
                dragTaskIndex={props.dragTaskIndex}
                setDragTaskIndex={props.setDragTaskIndex}
                shiftTaskCard={shiftTaskHandler}
                removeDraggedTask={removeDraggedTaskHandler}
                pushTaskCard={pushTaskHandler}
                popTaskCard={props.popTaskHandler}
                dragInListIndex={props.dragInListIndex}
                dragInListHandler={props.dragInListHandler}
              />
            );
          })}
        </div>
        {addTaskBtnActive ? (
          <button
            className={styles.addCardBtn}
            onClick={() => {
              setAddTaskBtnActive(false);
            }}
          >
            <span>
              <IoIcon4.IoIosAdd className={styles.addIcon}></IoIcon4.IoIosAdd>
            </span>
            <span>Add a card</span>
          </button>
        ) : (
          <CreateTaskCard addTaskBtnHandler={addTaskBtnHandler} />
        )}
      </div>
    </>
  );
};

export default ListCard;
