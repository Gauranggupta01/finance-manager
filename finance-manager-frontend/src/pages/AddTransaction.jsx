import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  FaMoneyBillWave,
  FaAlignLeft,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";

function AddTransaction() {

  const navigate = useNavigate();

  const today = new Date();

  today.setMinutes(
    today.getMinutes() -
    today.getTimezoneOffset()
  );

  const maxDate =
    today.toISOString().split("T")[0];

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      amount: "",

      description: "",

      type: "INCOME",

      category: "Salary",

      date: maxDate,
    });

  // STATIC CATEGORY DATA

  const categories = {

    INCOME: [

      "Salary",

      "Freelancing",

      "Business",

      "Investment",

      "Bonus",
    ],

    EXPENSE: [

      "Food",

      "Rent",

      "Transportation",

      "Entertainment",

      "Healthcare",

      "Utilities",

      "Shopping",
    ],
  };

  // HANDLE INPUT

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    // TYPE CHANGE

    if (name === "type") {

      setFormData({

        ...formData,

        type: value,

        category:
          categories[value][0],
      });

      return;
    }

    setFormData({

      ...formData,

      [name]: value,
    });
  };

  // SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const username =
        localStorage.getItem(
          "username"
        );

      if (!username) {

        alert(
          "Please Login Again"
        );

        navigate("/login");

        return;
      }

      const updatedData = {

        amount:
          Number(formData.amount),

        description:
          formData.description,

        category:
          formData.category,

        type:
          formData.type,

        date:
          formData.date,

        username:
          username,
      };

      console.log(
        "SENDING:",
        updatedData
      );

      const response =
        await API.post(

          "/transactions",

          updatedData
        );

      console.log(
        "RESPONSE:",
        response.data
      );

      alert(
        "Transaction Added Successfully"
      );

      // RESET FORM

      setFormData({

        amount: "",

        description: "",

        type: "INCOME",

        category: "Salary",

        date: maxDate,
      });

      // REDIRECT

      navigate("/transactions");

    } catch (error) {

      console.log(error);

      if (
        error.response
      ) {

        console.log(
          error.response.data
        );

        alert(
          "Backend Error"
        );

      } else {

        alert(
          "Failed To Add Transaction"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black flex justify-center items-center p-4 md:p-10">

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl p-6 md:p-12">

        {/* HEADER */}

        <div className="text-center mb-12">

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">

            Add Transaction

          </h1>

          <p className="text-gray-300 text-lg md:text-2xl">

            Track your income and expenses

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* AMOUNT */}

          <div className="relative">

            <FaMoneyBillWave
              className="absolute left-6 top-6 text-green-400 text-2xl"
            />

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full pl-16 p-5 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 text-xl"
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="relative">

            <FaAlignLeft
              className="absolute left-6 top-6 text-blue-400 text-2xl"
            />

            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-16 p-5 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 text-xl"
              required
            />

          </div>

          {/* TYPE */}

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-5 rounded-3xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-indigo-400 text-xl"
          >

            <option
              value="INCOME"
              className="text-black"
            >

              INCOME

            </option>

            <option
              value="EXPENSE"
              className="text-black"
            >

              EXPENSE

            </option>

          </select>

          {/* CATEGORY */}

          <div className="relative">

            <FaTags
              className="absolute left-6 top-6 text-purple-400 text-2xl z-10"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-16 p-5 rounded-3xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-purple-400 text-xl"
            >

              {

                categories[
                  formData.type
                ].map(
                  (category, index) => (

                    <option
                      key={index}
                      value={category}
                      className="text-black"
                    >

                      {category}

                    </option>
                  )
                )
              }

            </select>

          </div>

          {/* DATE */}

          <div className="relative">

            <FaCalendarAlt
              className="absolute left-6 top-6 text-red-400 text-2xl"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={maxDate}
              className="w-full pl-16 p-5 rounded-3xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-red-400 text-xl"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-5 rounded-3xl text-2xl font-bold hover:scale-105 transition duration-300 shadow-2xl disabled:opacity-60"
          >

            {
              loading
                ? "Adding Transaction..."
                : "Add Transaction"
            }

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTransaction;