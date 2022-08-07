"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Footer_1 = require("../components/Footer");
const Context_1 = require("../Context");
const Main = () => {
    const [password, setPassword] = (0, react_1.useState)("");
    const { name, setName } = (0, Context_1.useAppContext)();
    const [showMessage, setShowMessage] = (0, react_1.useState)(false);
    const [showError, setShowError] = (0, react_1.useState)("");
    function handleInputChange(e) {
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
    const checkLogin = (e) => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center h-screen flex-col ", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex bg-white-100 font-sans items-center flex-col justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-xs", children: [showMessage && ((0, jsx_runtime_1.jsx)("div", { className: "bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3", role: "alert", children: "The login request was successful" })), showError && ((0, jsx_runtime_1.jsx)("div", { className: "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3", role: "alert", children: showError })), (0, jsx_runtime_1.jsxs)("form", { className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4", method: "POST", action: "login", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "username", children: "Username" }), (0, jsx_runtime_1.jsx)("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "username", value: name, onChange: e => setName(e.target.value), type: "text", placeholder: "Username" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { className: "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none\r\n\t  focus:shadow-outline", value: password, onChange: e => handleInputChange(e), id: "password", type: "password", name: "password", placeholder: "******************" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-red-500 text-xs italic", children: [!password && "Please choose a password.", "\u00A0"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4\r\n\t  rounded focus:outline-none focus:shadow-outline", type: "submit", onClick: e => checkLogin(e), children: "Sign In" }), (0, jsx_runtime_1.jsx)("a", { className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800", href: "#", onClick: handleForgot, children: "Forgot Password?" })] })] })] }) }), (0, jsx_runtime_1.jsx)(Footer_1.Footer, {})] }));
};
exports.default = Main;
//# sourceMappingURL=Main.js.map