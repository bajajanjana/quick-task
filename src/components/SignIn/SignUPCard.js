import React from "react";
import styles from "./LoginCard.module.css";

const SignUpCard = (props) => {
	// const [signUpDetails] = useState({
	// 	mail: "",
	// 	password: "",
	// });

	// setSignUpDetailshandler=()=>{

	// }
	return (
		<div className={styles.loginCard}>
			<input
				type="email"
				// value={signUpDetails.mail}
				placeholder="Enter mail"
			></input>
			<input
				type="password"
				// value={signUpDetails.password}
				placeholder="Enter password"
			></input>
			<input
				type="password"
				// value={signUpDetails.password}
				placeholder="Confirm password"
			></input>
			<button
				className={styles.loginButton}
				onClick={() => {
					props.loginStateHandler(true);
				}}
			>
				Sign Up
			</button>
			<p
				onClick={() => {
					props.signUpHandler(false);
				}}
			>
				Already have an account? Log In.
			</p>
		</div>
	);
};

export default SignUpCard;
