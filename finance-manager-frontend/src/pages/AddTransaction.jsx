import { useState, useEffect } from "react";

import API from "../services/api";

import {
  FaMoneyBillWave,
  FaAlignLeft,
  FaCalendarAlt,
} from "react-icons/fa";

function AddTransaction() {

  const today = new Date();

  today.setMinutes(
    today.getMinutes() -
    today.getTimezoneOffset()
  );

  const maxDate =
    today.toISOString().split("T")[0];

  const [formData, setFormData] =
    useState({

      amount: "",

      description: "",

      category: "",

      type: "",

      date: "",
    });

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [categoryLoading,
    setCategoryLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH CATEGORIES

  useEffect(() => {

    fetchCategories();

  }, []);

  const fetchCategories = async () => {

    try {

      setCategoryLoading(true);

      setError("");

      const username =
        localStorage.getItem("username");

      if (!username) {

        setError("User not found");

        setCategoryLoading(false);

        return;
      }

      const response =
        await API.get(
          `/categories/${username}`
        );

      console.log(
        "CATEGORIES:",
        response.data
      );

      if (
        Array.isArray(response.data)
      ) {

        setCategories(
          response.data
        );

      } else {

        setCategories([]);
      }

    } catch (error) {

      console.log(
        "CATEGORY ERROR:",
        error
      );

      setCategories([]);

      setError(
        "Unable to load categories"
      );

    } finally {

      setCategoryLoading(false);
    }
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    // RESET CATEGORY WHEN TYPE CHANGES

    if (name === "type") {

      setFormData({

        ...formData,

        type: value,

        category: "",
      });

      return;
    }

    setFormData({

      ...formData,

      [name]: value,
    });
  };

  // SUBMIT FORM

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const username =
        localStorage.getItem("username");

      const updatedData = {

        ...formData,

        username,
      };

      console.log(
        "SUBMIT:",
        updatedData
      );

      await API.post(

        "/transactions",

        updatedData
      );

      alert(
        "Transaction Added Successfully"
      );

      // RESET FORM

      setFormData({

        amount: "",

        description: "",

        category: "",

        type: "",

        date: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        "Error Adding Transaction"
      );

    } finally {

      setLoading(false);
    }
  };

  // FILTER CATEGORIES

  const filteredCategories =
    (categories || []).filter(

      (cat) =>

        cat?.type
          ?.trim()
          ?.toUpperCase()

        ===

        formData.type
          ?.trim()
          ?.toUpperCase()
    );

  if (categoryLoading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-950 to-black">

        <h1 className="text-4xl font-bold text-white animate-pulse">

          Loading Categories...

        </h1>

      </div>
    );
  }

  if (error) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-950 to-black px-6">

        <div className="bg-red-500/20 border border-red-400 text-white p-10 rounded-3xl shadow-2xl text-center">

          <h1 className="text-4xl font-bold mb-4">

            Error

          </h1>

          <p className="text-xl">

            {error}

          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center p-4 md:p-10">

      <div className="backdrop-blur-lg bg-white/70 border border-white/30 p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-2xl">

        {/* HEADER */}

        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-7xl font-extrabold text-gray-800 mb-4">

            Add Transaction

          </h1>

          <p className="text-lg md:text-2xl text-gray-600">

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
              className="absolute left-6 top-6 text-green-500 text-2xl"
            />

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full pl-16 p-5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-300 text-xl md:text-2xl"
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="relative">

            <FaAlignLeft
              className="absolute left-6 top-6 text-blue-500 text-2xl"
            />

            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-16 p-5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl md:text-2xl"
              required
            />

          </div>

          {/* TYPE */}

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-xl md:text-2xl"
            required
          >

            <option value="">
              Select Type
            </option>

            <option value="INCOME">
              INCOME
            </option>

            <option value="EXPENSE">
              EXPENSE
            </option>

          </select>

          {/* CATEGORY */}

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl md:text-2xl"
            required
          >

            <option value="">
              Select Category
            </option>

            {

              filteredCategories.length === 0 ? (

                <option disabled>

                  No Categories Available

                </option>

              ) : (

                filteredCategories.map(
                  (cat) => (

                    <option
                      key={cat.id}
                      value={cat.name}
                    >

                      {cat.name}

                    </option>
                  )
                )
              )
            }

          </select>

          {/* DATE */}

          <div className="relative">

            <FaCalendarAlt
              className="absolute left-6 top-6 text-red-500 text-2xl"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={maxDate}
              className="w-full pl-16 p-5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-red-300 text-xl md:text-2xl"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-3xl text-2xl md:text-3xl font-bold hover:scale-105 transition duration-300 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >

            {
              loading
                ? "Adding..."
                : "Add Transaction"
            }

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTransaction;