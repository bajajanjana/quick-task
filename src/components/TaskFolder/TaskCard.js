import React from 'react'
import styles from "./TaskCard.module.css"
const TaskCard = (props) => {
  return (
    <div className={styles.taskCard}>
        <div>
         {props.desc}
        </div>
    </div>
  )
}

export default TaskCard
