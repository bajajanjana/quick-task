import React from "react";
import styles from "./LoginCard.module.css";

const LoginCard = (props) => {
	// const [logInDetails] = useState({
	// 	mail: "",
	// 	password: "",
	// });
	return (
		<div className={styles.loginCard}>
			<input
				type="email"
				// value={logInDetails.mail}
				placeholder="Enter mail"
			></input>
			<input
				type="password"
				// value={logInDetails.password}
				placeholder="Enter Password"
			></input>
			<button
				className={styles.loginButton}
				onClick={() => {
					props.loginStateHandler(true);
				}}
			>
				Log In
			</button>
			<p
				onClick={() => {
					props.signUpHandler(true);
				}}
			>
				Don't have an account? Create one.
			</p>
		</div>
	);
};

export default LoginCard;
