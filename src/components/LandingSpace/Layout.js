import React, { useState } from "react";
import Navigation from "../Header/Navigation";
import styles from "./Layout.module.css";
import LIST from "../../MOCKDATA/List.json";
import ListCard from "../TaskFolder/ListCard";
import * as IoIcon4 from "react-icons/io";
import CreateListCard from "../TaskFolder/CreateListCard";
import { useEffect } from "react/cjs/react.production.min";

const Layout = () => {
  const [cardList, setCardList] = useState(LIST);
  const [addListCardBtnActive, setAddListCardBtnActive] = useState(true);
  const [dragListIndex, setDragListIndex] = useState();
  const [dragInListIndex, setDragInListIndex] = useState();
  const [dragTaskIndex, setDragTaskIndex] = useState();

  const dragInListHandler = (dragInIndex) => {
    setDragInListIndex(dragInIndex);
  };
  const updateList = (updateList) => {
    setCardList(updateList);
  };
  const addListHandler = (title) => {
    cardList.push({ title: ` ${title} `, taskCard: [] });
    const newCardList = cardList.map((item) => item);
    setCardList(newCardList);
  };
  const addListCardBtnHandler = (isNewListCreated, title) => {
    if (isNewListCreated) {
      setAddListCardBtnActive(true);
      addListHandler(title);
      return;
    }
    setAddListCardBtnActive(true);
  };

  const removeDraggedListHandler = (index) => {
    setDragListIndex(index);
  };
  const shiftListHandler = (title, index) => {
    var list = cardList[dragListIndex];
    cardList.splice(dragListIndex, 1);
    cardList.splice(index, 0, list);
    let updatedList = cardList.map((item) => item);
    updateList(updatedList);
  };
  const popTaskHandler = (listIndex, taskIndex) => {
    console.log("li", listIndex);
    console.log("ti", taskIndex);
    console.log(cardList[listIndex].title);
    cardList[listIndex].taskCard.splice(taskIndex, 1);
    let updatedList = cardList.map((item) => item);
    updateList(updatedList);
  };
  const setDragTaskIndexHandler = (taskIndex) => {
    setDragTaskIndex(taskIndex);
  };
  return (
    <div>
      <Navigation />
      <div className={styles.ListSection}>
        {cardList.map((list, index) => {
          return (
            <div>
              <ListCard
                title={list.title}
                taskCard={list.taskCard}
                updateList={updateList}
                list={cardList}
                index={index}
                dragTaskIndex={dragTaskIndex}
                setDragTaskIndex={setDragTaskIndexHandler}
                shiftListCard={shiftListHandler}
                removeDraggedList={removeDraggedListHandler}
                dragInListIndex={dragInListIndex}
                dragInListHandler={dragInListHandler}
                popTaskHandler={popTaskHandler}
              />
            </div>
          );
        })}
        {addListCardBtnActive ? (
          <button
            className={styles.addListBtn}
            onClick={(prevState) => {
              setAddListCardBtnActive(false);
            }}
          >
            <span>
              <IoIcon4.IoIosAdd className={styles.addIcon}></IoIcon4.IoIosAdd>
            </span>
            <span>Add another list</span>
          </button>
        ) : (
          <CreateListCard addListCardBtnHandler={addListCardBtnHandler} />
        )}
      </div>
    </div>
  );
};

export default Layout;
