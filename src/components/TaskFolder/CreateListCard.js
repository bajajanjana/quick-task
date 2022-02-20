import React, { useState } from "react";
import * as IoIcon4 from "react-icons/io";
import styles from "./CreateListCard.module.css";

const CreateListCard = (props) => {
	const [listCardTitle, setListCardTitle] = useState();
	const addListCardBtnHandler = () => {
		props.addListCardBtnHandler(true, listCardTitle);
		setListCardTitle("");
	};
	return (
		<div>
			<div className={styles.createListCard}>
				<div>
					<input
						type="text"
						placeholder="Enter list title..."
						className={styles.createListInput}
						value={listCardTitle}
						onChange={(e) => {
							setListCardTitle(e.target.value);
						}}
					></input>
				</div>
				<div className={styles.addListDiv}>
					<button
						className={styles.addListBtn}
						onClick={addListCardBtnHandler}
					>
						Add list
					</button>
					<span>
						<IoIcon4.IoIosClose
							className={styles.addListCancelIcon}
							onClick={() => {
								props.addListCardBtnHandler(false, null);
							}}
						></IoIcon4.IoIosClose>
					</span>
				</div>
			</div>
		</div>
	);
};

export default CreateListCard;
