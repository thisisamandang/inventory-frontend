import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    consifrmPassword: "",
  });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        email,
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-center justify-center ">
      <div className="md:flex md:justify-center ">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="border gap-2 flex flex-col items-center  py-4 px-4 mx-6 md:w-3/6 md:h-4/5 rounded-md"
        >
          <h1 className="text-2xl pb-4 font-bold text-sky-600">REGISTER</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-1 outline-none border rounded-md focus:border-blue-300"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="p-1 outline-none border rounded-md focus:border-blue-300"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-1 outline-none border rounded-md focus:border-blue-300"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="p-1 outline-none border rounded-md focus:border-blue-300"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="p-2 bg-sky-300 rounded-lg mt-2 hover:bg-sky-600 hover:text-white transition-all duration-500 font-semibold"
          >
            Create User
          </button>
          <span className="font-semibold hover:text-sky-800 transition-all duration-150">
            <Link to="/login">sign-in?</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
