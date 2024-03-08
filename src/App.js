import React, { useState } from "react";
import Login from "./Login";
import FridgeFacade from "./FridgeFacade";

const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      {isLogged ? (
        <FridgeFacade onLogout={setIsLogged} />
      ) : (
        <Login onLogin={setIsLogged} />
      )}
    </>
  );
};

export default Home;
