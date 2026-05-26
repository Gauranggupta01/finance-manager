import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaWallet,
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    fullName: "",

    username: "",

    phoneNumber: "",

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

          "https://finance-manager-jbir.onrender.com/api/auth/register",

          formData
        );

      alert(response.data);

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (
        error.response &&
        error.response.data
      ) {

        alert(error.response.data);

      } else {

        alert(
          "Registration Failed"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black flex justify-center items-center px-6 py-10">

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-6">

          <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-5 rounded-full shadow-lg">

            <FaWallet className="text-white text-4xl" />

          </div>

        </div>

        <h1 className="text-5xl font-extrabold text-center text-white mb-3">

          Create Account

        </h1>

        <p className="text-center text-gray-300 mb-10 text-lg">

          Start managing your finances smartly

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="relative">

            <FaUser
              className="absolute left-5 top-5 text-green-400 text-xl"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-14 p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              required
            />

          </div>

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

          <div className="relative">

            <FaPhone
              className="absolute left-5 top-5 text-yellow-400 text-xl"
            />

            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full pl-14 p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
              required
            />

          </div>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300 shadow-xl disabled:opacity-60"
          >

            {
              loading
                ? "Registering..."
                : "Register"
            }

          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">

          Already have an account?{" "}

          <span
            onClick={() =>
              navigate("/login")
            }
            className="text-blue-400 cursor-pointer hover:underline"
          >

            Login

          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;