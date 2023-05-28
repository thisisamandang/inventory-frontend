import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loginRoute } from "../utils/APIRoutes";
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and password is required.");
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required.");
      return false;
    }
    return true;
  };
  // const [item, setItem] = useState([]);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        try {
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch (error) {
          console.log(error.message);
        }

        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-center justify-center ">
      <div className="md:flex md:justify-center ">
        <form
          className="border gap-2 flex flex-col items-center  py-4 px-4 mx-6 md:w-3/6 md:h-4/5 rounded-md "
          onSubmit={(event) => handleSubmit(event)}
        >
          <h1 className="text-2xl pb-4 font-bold text-sky-600">LOGIN</h1>
          <input
            type="text"
            placeholder="username"
            name="username"
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

          <button
            type="submit"
            className="px-3 py-2 bg-sky-300 rounded-lg mt-2 hover:bg-sky-600 hover:text-white transition-all duration-500 font-semibold"
          >
            LOGIN
          </button>
          <span className="font-semibold hover:text-sky-800 transition-all duration-150">
            <Link to="/register">Create account?</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
