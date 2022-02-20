import React from "react";
import styles from "./Navigation.module.css";
import * as BiIcon from "react-icons/bi";
import * as IoIcon4 from "react-icons/io";

const Navigation = () => {
	return (
		<div className={styles.navigation}>
			<div>
				<div className={styles.bName}>
					<a href="/#">
						<strong>Trello</strong>
					</a>
				</div>
				<div>
					<a href="/#">
						<span className={styles.workspace}>
							WorkSpace
							<BiIcon.BiChevronDown
								className={styles.arrowDown}
							></BiIcon.BiChevronDown>
						</span>
					</a>
				</div>
				<button className={styles.createBtn}>Create</button>
			</div>
			<div className={styles.secondDiv}>
				<div>
					<span className={styles.searchIcon}>
						<BiIcon.BiSearchAlt></BiIcon.BiSearchAlt>
						<input
							type="text"
							className={styles.searchBox}
							placeholder="Search"
						></input>
					</span>
				</div>
				<div>
					<span className={styles.bellIcon}>
						<IoIcon4.IoIosNotificationsOutline></IoIcon4.IoIosNotificationsOutline>
					</span>
				</div>
				<div className={styles.userInfo}>AB</div>
			</div>
		</div>
	);
};

export default Navigation;
