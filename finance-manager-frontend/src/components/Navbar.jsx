import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const username =
    localStorage.getItem("username");

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    navigate("/login");
  };

  return (

    <div className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-xl">

      <h1 className="text-3xl font-bold text-green-400">

        {
          token
            ? username
            : "Finance Manager"
        }

      </h1>

      <div className="flex gap-6 items-center">

        {

          token ? (

            <>

              <Link to="/">

                Dashboard

              </Link>

              <Link to="/transactions">

                Transactions

              </Link>

              <Link to="/add">

                Add

              </Link>

              <Link to="/reports">

                Reports

              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-xl"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded-xl"
              >

                Login

              </Link>

              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded-xl"
              >

                Register

              </Link>

            </>
          )
        }

      </div>

    </div>
  );
}

export default Navbar;