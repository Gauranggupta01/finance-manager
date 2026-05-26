import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaWallet,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      username: "",

      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await axios.post(

          "https://finance-manager-jbir.onrender.com/api/auth/login",

          formData
        );

      console.log(response.data);

      if (
        response.data.message &&
        response.data.message
          .toLowerCase()
          .includes("success")
      ) {

        localStorage.setItem(

          "token",

          response.data.token || "SUCCESS"
        );

        localStorage.setItem(

          "username",

          formData.username
        );

        alert("Login Successful");

        window.location.href = "/";

      } else {

        alert(
          response.data.message ||
          "Login Failed"
        );
      }

    } catch (error) {

      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        alert(
          error.response.data.message
        );

      } else {

        alert("Login Failed");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black flex justify-center items-center px-6 py-10">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10">

        {/* LOGO */}

        <div className="flex justify-center mb-6">

          <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-5 rounded-full shadow-lg">

            <FaWallet className="text-white text-4xl" />

          </div>

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-center text-white mb-3">

          Welcome Back

        </h1>

        <p className="text-center text-gray-300 mb-10 text-lg">

          Login to manage your finances

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div className="relative">

            <FaEnvelope
              className="absolute left-5 top-5 text-blue-400 text-xl"
            />

            <input
              type="email"
              name="username"
              placeholder="Enter Email"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-14 p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <FaLock
              className="absolute left-5 top-5 text-pink-400 text-xl"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-14 p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        {/* FOOTER */}

        <p className="text-center text-gray-400 mt-8">

          New user?{" "}

          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-green-400 cursor-pointer hover:underline"
          >

            Create Account

          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;