import { useState } from "react";
import "./App.css";
import Layout from "./components/LandingSpace/Layout";
import Login from "./components/SignIn/Login";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const loginStateHandler = (value) => {
    setLoggedIn(value);
  };
  return (
    <>
      {loggedIn ? (
        <DndProvider backend={HTML5Backend}>
          <Layout />
        </DndProvider>
      ) : (
        <Login loginStateHandler={loginStateHandler} />
      )}
    </>
  );
}

export default App;
