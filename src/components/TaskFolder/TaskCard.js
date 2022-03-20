import React from "react";
import styles from "./TaskCard.module.css";
const TaskCard = (props) => {
  return (
    <div
      id={props.index}
      className={styles.taskCard}
      draggable="true"

      onDragStart={(ev) => {
        ev.dataTransfer.setData("text/plain",props.desc);
        props.removeDraggedTask(props.index);
      }}
      onDrop={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        var data = ev.dataTransfer.getData("text/plain");
        props.shiftTaskCard(data,props.index);
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
