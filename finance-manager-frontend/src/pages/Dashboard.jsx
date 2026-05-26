import { useEffect, useState } from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const [report, setReport] = useState({

    totalIncome: 0,

    totalExpense: 0,

    netSavings: 0,
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport = async () => {

    try {

      setLoading(true);

      setError("");

      const username =
        localStorage.getItem("username");

      if (!username) {

        setError("User not found");

        setLoading(false);

        return;
      }

      const response =
        await API.get(
          `/reports/${username}`
        );

      console.log(
        "REPORT:",
        response.data
      );

      setReport({

        totalIncome:
          Number(
            response.data.totalIncome
          ) || 0,

        totalExpense:
          Number(
            response.data.totalExpense
          ) || 0,

        netSavings:
          Number(
            response.data.netSavings
          ) || 0,
      });

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

      setError(
        "Unable to load dashboard"
      );

    } finally {

      setLoading(false);
    }
  };

  const chartData = [

    {
      name: "Income",

      value:
        report.totalIncome || 0,
    },

    {
      name: "Expense",

      value:
        report.totalExpense || 0,
    },

    {
      name: "Savings",

      value:
        report.netSavings || 0,
    },
  ];

  const COLORS = [

    "#22c55e",

    "#ef4444",

    "#3b82f6",
  ];

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-950 to-black">

        <h1 className="text-4xl font-bold text-white animate-pulse">

          Loading Dashboard...

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

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 md:p-10">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">

          Finance Dashboard

        </h1>

        <p className="text-lg md:text-xl text-gray-600 mt-3">

          Welcome back{" "}

          <span className="font-bold text-green-600">

            {
              localStorage.getItem(
                "username"
              )
            }

          </span>

        </p>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">

        {/* INCOME */}

        <div className="backdrop-blur-lg bg-white/70 border border-white/30 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-2xl font-semibold text-gray-700 mb-5">

            Total Income

          </h2>

          <p className="text-4xl md:text-5xl font-extrabold text-green-500 break-words">

            ₹ {report.totalIncome}

          </p>

        </div>

        {/* EXPENSE */}

        <div className="backdrop-blur-lg bg-white/70 border border-white/30 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-2xl font-semibold text-gray-700 mb-5">

            Total Expense

          </h2>

          <p className="text-4xl md:text-5xl font-extrabold text-red-500 break-words">

            ₹ {report.totalExpense}

          </p>

        </div>

        {/* SAVINGS */}

        <div className="backdrop-blur-lg bg-white/70 border border-white/30 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-2xl font-semibold text-gray-700 mb-5">

            Net Savings

          </h2>

          <p className="text-4xl md:text-5xl font-extrabold text-blue-500 break-words">

            ₹ {report.netSavings}

          </p>

        </div>

      </div>

      {/* CHART */}

      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-gray-800">

          Financial Analytics

        </h2>

        <div className="w-full h-[400px] md:h-[600px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={
                  window.innerWidth < 768
                    ? 100
                    : 200
                }
                dataKey="value"
                label
              >

                {

                  chartData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;