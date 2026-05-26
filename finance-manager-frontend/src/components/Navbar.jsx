import { Link, useNavigate } from "react-router-dom";

import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaFileInvoice,
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const username =
    localStorage.getItem("username");

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-10 py-5 flex justify-between items-center shadow-xl sticky top-0 z-50">

      {/* LEFT */}

      <div className="flex items-center gap-10">

        <Link
          to="/"
          className="text-3xl font-extrabold text-green-400"
        >
          {username}
        </Link>

        {

          token && (

            <div className="flex gap-8 text-lg">

              <Link
                to="/"
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                <FaChartPie />
                Dashboard
              </Link>

              <Link
                to="/transactions"
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                <FaWallet />
                Transactions
              </Link>

              <Link
                to="/add"
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                <FaMoneyBillWave />
                Add
              </Link>

              <Link
                to="/reports"
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                <FaFileInvoice />
                Reports
              </Link>

            </div>
          )
        }

      </div>

      {/* RIGHT */}

      <div>

        {

          !token ? (

            <div className="flex gap-4">

              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg transition"
              >
                Register
              </Link>

            </div>

          ) : (

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )
        }

      </div>

    </nav>
  );
}

export default Navbar;