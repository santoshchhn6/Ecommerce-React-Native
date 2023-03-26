import React, { useState } from "react";
import { logIn } from "../firebase";

const Login = ({ isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    logIn({ email, password })
      .then((v) => {
        console.log(v);
        setError(false);
        isAdmin(true);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
    // if (email && password) isAdmin(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen flex justify-center items-center"
    >
      <div className=" border-gray-500 bg-blue-200 p-3 flex flex-col w-[400px] shadow-md">
        <h2 className="text-center mb-2 text-gray-900 font-bold">Admin</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-2 outline-none text-gray-700"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-2 outline-none text-gray-700"
        />
        {error && <p className="text-red-600">Authentication Failed</p>}
        <button
          type="submit"
          className="bg-gray-900 p-2 text-white hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
