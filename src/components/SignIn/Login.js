import React, { useState } from "react";
import styles from "./Login.module.css";
import lottie from "../../Assets/lottie.gif";
import LoginCard from "./LoginCard";
import SignUpCard from "./SignUPCard";

const Login = (props) => {
	const [signUp, setSignUp] = useState(false);
	const signUpHandler = (value) => {
		setSignUp(value);
	};

	return (
		<div className={styles.loginScreen}>
			<div className={styles.loginCardDiv}>
				<h1 className={styles.trello}>Trello</h1>
				{signUp ? (
					<SignUpCard
						signUpHandler={signUpHandler}
						loginStateHandler={props.loginStateHandler}
					/>
				) : (
					<LoginCard
						signUpHandler={signUpHandler}
						loginStateHandler={props.loginStateHandler}
					/>
				)}
			</div>
			<div className={styles.lottieDiv}>
				<img src={lottie} width="100%" height="100%" alt="GIF"></img>
			</div>
		</div>
	);
};

export default Login;
