import { useState, useEffect } from "react";

import API from "../services/api";

import {
  FaMoneyBillWave,
  FaAlignLeft,
  FaCalendarAlt,
  FaTags,
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

      console.log(error);

      setError(
        "Unable to load categories"
      );

      setCategories([]);

    } finally {

      setCategoryLoading(false);
    }
  };

  // HANDLE INPUT

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

  // FILTER CATEGORIES

  const filteredCategories =
    categories.filter(

      (cat) =>

        cat?.type
          ?.trim()
          ?.toUpperCase()

        ===

        formData.type
          ?.trim()
          ?.toUpperCase()
    );

  // SUBMIT

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

  // LOADING SCREEN

  if (categoryLoading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-black to-slate-950">

        <div className="text-center">

          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-4xl font-bold text-white">

            Loading Categories...

          </h1>

        </div>

      </div>
    );
  }

  // ERROR SCREEN

  if (error) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-black to-slate-950 px-6">

        <div className="bg-red-500/20 border border-red-400 p-10 rounded-3xl shadow-2xl text-center max-w-xl">

          <h1 className="text-5xl font-bold text-white mb-5">

            Error

          </h1>

          <p className="text-xl text-gray-200">

            {error}

          </p>

        </div>

      </div>
    );
  }

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
            required
          >

            <option
              value=""
              className="text-black"
            >
              Select Type
            </option>

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
              required
            >

              <option
                value=""
                className="text-black"
              >
                Select Category
              </option>

              {

                filteredCategories.length > 0 ? (

                  filteredCategories.map(
                    (cat) => (

                      <option
                        key={cat.id}
                        value={cat.name}
                        className="text-black"
                      >

                        {cat.name}

                      </option>
                    )
                  )

                ) : (

                  <option
                    disabled
                    className="text-black"
                  >

                    No Categories Available

                  </option>
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