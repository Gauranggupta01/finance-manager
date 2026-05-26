import { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

import {
  FaMoneyBillWave,
  FaAlignLeft,
  FaTags,
  FaCalendarAlt,
} from "react-icons/fa";

function AddTransaction() {

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      amount: "",

      description: "",

      type: "INCOME",

      category: "Salary",

      date: "",

      username: username,
    });

  const categories = {

    INCOME: [

      "Salary",

      "Freelancing",

      "Business",

      "Investment",

      "Bonus",

      "Other Income",
    ],

    EXPENSE: [

      "Food",

      "Rent",

      "Transport",

      "Shopping",

      "Healthcare",

      "Entertainment",

      "Bills",

      "Other Expense",
    ],
  };

  useEffect(() => {

    setFormData((prev) => ({

      ...prev,

      category:
        categories[
          prev.type
        ][0],
    }));

  }, [formData.type]);

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

      const payload = {

        amount:
          Number(
            formData.amount
          ),

        description:
          formData.description,

        type:
          formData.type,

        category:
          formData.category,

        date:
          formData.date,

        username:
          username,
      };

      console.log(
        "Sending Data:",
        payload
      );

      const response =
        await API.post(

          "/transactions",

          payload
        );

      console.log(
        "Response:",
        response.data
      );

      alert(
        "Transaction Added Successfully"
      );

      navigate("/transactions");

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Add Transaction"
      );

    } finally {

      setLoading(false);
    }
  };

  const maxDate =
    new Date()
      .toISOString()
      .split("T")[0];

  return (

    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#16235c] to-black flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[40px] p-8 md:p-10">

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3">

            Add Transaction

          </h1>

          <p className="text-gray-300 text-xl">

            Track your income and expenses

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* AMOUNT */}

          <div className="relative">

            <FaMoneyBillWave
              className="absolute left-5 top-5 text-green-400 text-xl"
            />

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full pl-14 p-5 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 text-xl"
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="relative">

            <FaAlignLeft
              className="absolute left-5 top-5 text-blue-400 text-xl"
            />

            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-14 p-5 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 text-xl"
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
              className="absolute left-5 top-5 text-purple-400 text-xl z-10"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-14 p-5 rounded-3xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-purple-400 text-xl"
            >

              {

                categories[
                  formData.type
                ].map(
                  (
                    category,
                    index
                  ) => (

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
              className="absolute left-5 top-5 text-red-400 text-xl"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={maxDate}
              className="w-full pl-14 p-5 rounded-3xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-red-400 text-xl"
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