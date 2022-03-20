import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./TaskCard.module.css"
const TaskCard = (props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: props.index ,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const[spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = props.index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      props.moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={styles.taskCard} ref={dragDropRef}>
      <div>{props.desc}</div>
    </div>
  );
}

export default TaskCard
