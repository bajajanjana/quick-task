import { useState } from "react";
import "./App.css";
import Layout from "./components/LandingSpace/Layout";
import Login from "./components/SignIn/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const loginStateHandler = (value) => {
    setLoggedIn(value);
  };
  return (
    <>
      {loggedIn ? <Layout /> : <Login loginStateHandler={loginStateHandler} />}
    </>
  );
}

export default App;
