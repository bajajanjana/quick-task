import React,{useState} from "react";
import styles from "./ListCard.module.css";
import * as IoIcon4 from "react-icons/io";
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";
const ListCard = (props) => {
  const [addTaskBtnActive, setAddTaskBtnActive] = useState(true);

  const addTaskHandler = (desc) => {
    console.log("added");
    props.taskCard.push({"desc":`${desc}`});
    const updatedList = props.list.map((item) => item);
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
    <div className={styles.listCard}>
      <h4>{props.title}</h4>
      <hr className={styles.line}></hr>
      <div className={styles.taskList}>
        {props.taskCard.map((item) => {
          return <TaskCard desc={item.desc} />;
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
  );
};

export default ListCard;
