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

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport = async () => {

    try {

      const username =
        localStorage.getItem("username");

      const response = await API.get(
        `/reports/${username}`
      );

      setReport(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const chartData = [

    {
      name: "Income",
      value: report.totalIncome,
    },

    {
      name: "Expense",
      value: report.totalExpense,
    },

    {
      name: "Savings",
      value: report.netSavings,
    },
  ];

  const COLORS = [

    "#22c55e",

    "#ef4444",

    "#3b82f6",
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-6xl font-extrabold text-gray-800">

          Finance Dashboard

        </h1>

        <p className="text-xl text-gray-600 mt-3">

          Welcome back,
          {" "}
          <span className="font-bold text-green-600">
            {localStorage.getItem("username")}
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

          <p className="text-6xl font-extrabold text-green-500">

            ₹ {report.totalIncome}

          </p>

        </div>

        {/* EXPENSE */}

        <div className="backdrop-blur-lg bg-white/70 border border-white/30 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-2xl font-semibold text-gray-700 mb-5">

            Total Expense

          </h2>

          <p className="text-6xl font-extrabold text-red-500">

            ₹ {report.totalExpense}

          </p>

        </div>

        {/* SAVINGS */}

        <div className="backdrop-blur-lg bg-white/70 border border-white/30 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-2xl font-semibold text-gray-700 mb-5">

            Net Savings

          </h2>

          <p className="text-6xl font-extrabold text-blue-500">

            ₹ {report.netSavings}

          </p>

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-5xl font-bold text-center mb-10 text-gray-800">

          Financial Analytics

        </h2>

        <div className="h-[600px]">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={200}
                dataKey="value"
                label
              >

                {

                  chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))
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