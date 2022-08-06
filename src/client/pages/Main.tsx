import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { useAppContext } from "../Context";

const Main = () => {
  const [password, setPassword] = useState("");
  const { name, setName } = useAppContext();
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
    e.target.value ? e.target.classList.remove("border-red-500") : e.target.classList.add("border-red-500");
  }

  function handleForgot() {
    setShowError("Be happy, you can try again :)");
    setTimeout(function () {
      setShowError("");
    }, 3000);
    return false;
  }

  const checkLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!name) {
      setShowError("Add your name");
      setTimeout(function () {
        setShowError("");
      }, 3000);
      return false;
    }

    if (!password) {
      setShowError("Add a password to login");
      setTimeout(function () {
        setShowError("");
      }, 3000);
      return false;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };

    fetch("/api/login", requestOptions)
      .then(response => response.json())
      .then(data => {
        setShowMessage(true);
        setTimeout(function () {
          setShowMessage(false);
        }, 3000);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col ">
      <div className="flex bg-white-100 font-sans items-center flex-col justify-between">
        <div className="w-full max-w-xs">
          {showMessage && (
            <div className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3" role="alert">
              The login request was successful
            </div>
          )}
          {showError && (
            <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert">
              {showError}
            </div>
          )}
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" action="login">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none
	  focus:shadow-outline"
                value={password}
                onChange={e => handleInputChange(e)}
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">{!password && "Please choose a password."}&nbsp;</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
	  rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={e => checkLogin(e)}
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
                onClick={handleForgot}
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
