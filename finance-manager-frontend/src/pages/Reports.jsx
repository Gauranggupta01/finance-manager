import { useEffect, useState } from "react";

import API from "../services/api";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaWallet,
} from "react-icons/fa6";

function Reports() {

  const [monthly, setMonthly] =
    useState(null);

  const [yearly, setYearly] =
    useState(null);

  useEffect(() => {

    fetchMonthly();

    fetchYearly();

  }, []);

  const username =
    localStorage.getItem("username");

  const fetchMonthly = async () => {

    try {

      const response = await API.get(

        `/reports/monthly/${username}?month=5&year=2026`
      );

      setMonthly(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchYearly = async () => {

    try {

      const response = await API.get(

        `/reports/yearly/${username}?year=2026`
      );

      setYearly(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-6xl font-extrabold text-gray-800">

          Reports & Analytics

        </h1>

        <p className="text-xl text-gray-600 mt-3">

          Financial overview for:
          {" "}

          <span className="font-bold text-green-600">

            {username}

          </span>

        </p>

      </div>

      {/* MONTHLY REPORT */}

      {

        monthly && (

          <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-2xl mb-14">

            <h2 className="text-5xl font-bold mb-10 text-gray-800">

              Monthly Report

            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* INCOME */}

              <div className="bg-green-100 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

                <div className="flex items-center gap-3 mb-6">

                  <FaArrowTrendUp className="text-green-600 text-3xl" />

                  <h3 className="text-3xl font-bold">

                    Income Categories

                  </h3>

                </div>

                {

                  Object.entries(
                    monthly.incomeByCategory
                  ).map(([key, value]) => (

                    <div
                      key={key}
                      className="flex justify-between items-center py-3 border-b border-green-200"
                    >

                      <span className="text-xl font-medium">

                        {key}

                      </span>

                      <span className="text-2xl font-bold text-green-700">

                        ₹ {value}

                      </span>

                    </div>
                  ))
                }

              </div>

              {/* EXPENSE */}

              <div className="bg-red-100 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300">

                <div className="flex items-center gap-3 mb-6">

                  <FaArrowTrendDown className="text-red-600 text-3xl" />

                  <h3 className="text-3xl font-bold">

                    Expense Categories

                  </h3>

                </div>

                {

                  Object.entries(
                    monthly.expenseByCategory
                  ).length === 0 ? (

                    <p className="text-xl">

                      No Expenses Found

                    </p>

                  ) : (

                    Object.entries(
                      monthly.expenseByCategory
                    ).map(([key, value]) => (

                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-red-200"
                      >

                        <span className="text-xl font-medium">

                          {key}

                        </span>

                        <span className="text-2xl font-bold text-red-700">

                          ₹ {value}

                        </span>

                      </div>
                    ))
                  )
                }

              </div>

              {/* SAVINGS */}

              <div className="bg-blue-100 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300 flex flex-col justify-center">

                <div className="flex items-center gap-3 mb-6">

                  <FaWallet className="text-blue-600 text-3xl" />

                  <h3 className="text-3xl font-bold">

                    Net Savings

                  </h3>

                </div>

                <p className="text-7xl font-extrabold text-blue-700">

                  ₹ {monthly.netSavings}

                </p>

              </div>

            </div>

          </div>
        )
      }

      {/* YEARLY REPORT */}

      {

        yearly && (

          <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-2xl">

            <h2 className="text-5xl font-bold mb-10 text-gray-800">

              Yearly Report

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {

                Object.entries(yearly)
                  .map(([month, value]) => (

                    <div
                      key={month}
                      className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-3xl shadow-lg hover:scale-105 transition duration-300"
                    >

                      <h3 className="text-2xl font-bold mb-5 text-gray-700">

                        Month {month}

                      </h3>

                      <p
                        className={`text-5xl font-extrabold ${
                          value >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >

                        ₹ {value}

                      </p>

                    </div>
                  ))
              }

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Reports;