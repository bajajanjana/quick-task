import React, { useState } from "react";
import Navigation from "../Header/Navigation";
import styles from "./Layout.module.css";
import LIST from "../../MOCKDATA/List.json";
import ListCard from "../TaskFolder/ListCard";
import * as IoIcon4 from "react-icons/io";
import CreateListCard from "../TaskFolder/CreateListCard";

const Layout = () => {
  const [cardList, setCardList] = useState(LIST);
  const [addListCardBtnActive, setAddListCardBtnActive] = useState(true);
  const [dragListIndex, setDragListIndex] = useState();

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
    var list=cardList[dragListIndex];
    cardList.splice(dragListIndex, 1);
    cardList.splice(index, 0,list);
    let updatedList = cardList.map((item) => item);
    updateList(updatedList);
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
                shiftListCard={shiftListHandler}
                removeDraggedList={removeDraggedListHandler}
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
