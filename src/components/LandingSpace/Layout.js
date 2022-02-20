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

  const updateList=(updateList)=>{
    setCardList(updateList);
  }

  const addListHandler = (title) => {
    cardList.push({ title: ` ${title} `, taskCard: [] });
    const newCardList = cardList.map(item=>item);
    setCardList(newCardList);

  };
  const addListCardBtnHandler = (isNewListCreated,title) => {
    if (isNewListCreated)
    {
      setAddListCardBtnActive(true);
      addListHandler(title);
      return;
    }
     setAddListCardBtnActive(true);
  };
  return (
    <div>
      <Navigation />
      <div className={styles.ListSection}>
        {cardList.map((list) => {
          return (
            <div>
              <ListCard
                title={list.title}
                taskCard={list.taskCard}
                updateList={updateList}
                list={cardList}
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
            <spna>
              <IoIcon4.IoIosAdd className={styles.addIcon}></IoIcon4.IoIosAdd>
            </spna>
            <span>Add another list</span>
          </button>
        ) : (
          <CreateListCard addListCardBtnHandler={addListCardBtnHandler}  />
        )}
      </div>
    </div>
  );
};

export default Layout;
