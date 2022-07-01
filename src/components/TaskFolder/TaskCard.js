import React, { useState } from "react";
import styles from "./TaskCard.module.css";
const TaskCard = (props) => {
  const [listIndex, setListIndex] = useState();
  return (
    <div
      id={props.index}
      className={styles.taskCard}
      draggable="true"
      onDragStart={(ev) => {
        ev.dataTransfer.setData("text/plain", props.desc);
        props.removeDraggedTask(props.index);
        props.setDragTaskIndex(props.index);
        setListIndex(props.listIndex);
        props.dragInListHandler(props.listIndex);
        console.log("a", props.listIndex);
      }}
      onDrop={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        var data = ev.dataTransfer.getData("text/plain");
        console.log("b", props.listIndex, "hf");
        if (props.dragInListIndex != props.listIndex) {
          props.pushTaskCard(data, props.index);
          props.popTaskCard(props.dragInListIndex, props.dragTaskIndex);
          console.log("b", props.listIndex);
          return;
        }
        props.shiftTaskCard(data, props.index);
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
    >
      <div>{props.desc}</div>
    </div>
  );
};

export default TaskCard;
