import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";

import Transactions from "./pages/Transactions";

import AddTransaction from "./pages/AddTransaction";

import Reports from "./pages/Reports";

import Login from "./pages/Login";

import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const token =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      {
        token && <Navbar />
      }

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/" />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/" />
              : <Register />
          }
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>

              <Transactions />

            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>

              <AddTransaction />

            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>

              <Reports />

            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                token
                  ? "/"
                  : "/login"
              }
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;