import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    {
      username: process.env.REACT_APP_USER,
      password: process.env.REACT_APP_PASSWORD,
    },
  ];

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      alert("Zalogowano pomyślnie!");
      onLogin(true);
    } else {
      alert("Nieprawidłowe dane do logowania");
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        className="p-4 bg-slate-300 m-2 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        className="p-4 bg-slate-300 m-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="p-4 bg-green-300 hover:bg-green-500 m-2 rounded-lg"
        onClick={handleLogin}
      >
        Zaloguj się
      </button>
    </div>
  );
};

export default Login;
