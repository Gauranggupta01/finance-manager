import { useEffect, useState } from "react";

import API from "../services/api";

import {
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function Transactions() {

  const [transactions, setTransactions] =
    useState([]);

  const [editingTransaction,
    setEditingTransaction] = useState(null);

  const [formData, setFormData] =
    useState({

      amount: "",

      description: "",

      category: "",

      type: "",
    });

  useEffect(() => {

    fetchTransactions();

  }, []);

  const fetchTransactions = async () => {

    try {

      const username =
        localStorage.getItem("username");

      const response = await API.get(

        `/transactions/${username}`
      );

      setTransactions(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE

  const handleDelete = async (id) => {

    try {

      await API.delete(

        `/transactions/${id}`
      );

      fetchTransactions();

    } catch (error) {

      console.log(error);
    }
  };

  // OPEN EDIT

  const openEdit = (transaction) => {

    setEditingTransaction(transaction);

    setFormData({

      amount: transaction.amount,

      description: transaction.description,

      category: transaction.category,

      type: transaction.type,
    });
  };

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // UPDATE

  const handleUpdate = async () => {

    try {

      await API.put(

        `/transactions/${editingTransaction.id}`,

        {

          ...editingTransaction,

          ...formData,
        }
      );

      setEditingTransaction(null);

      fetchTransactions();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-6xl font-extrabold text-gray-800">

          My Transactions

        </h1>

      </div>

      {/* LIST */}

      <div className="space-y-8">

        {

          transactions.map((transaction) => (

            <div
              key={transaction.id}
              className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl flex justify-between items-center hover:scale-[1.02] transition"
            >

              {/* LEFT */}

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  {transaction.description}

                </h2>

                <div className="space-y-2 text-lg">

                  <p>

                    Category:
                    {" "}
                    <span className="font-semibold">

                      {transaction.category}

                    </span>

                  </p>

                  <p>

                    Type:
                    {" "}

                    <span
                      className={`font-bold ${
                        transaction.type === "INCOME"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >

                      {transaction.type}

                    </span>

                  </p>

                  <p>

                    Date:
                    {" "}

                    {transaction.date}

                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="text-right">

                <p
                  className={`text-5xl font-extrabold mb-6 ${
                    transaction.type === "INCOME"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >

                  {

                    transaction.type === "INCOME"
                      ? "+ "
                      : "- "
                  }

                  ₹ {transaction.amount}

                </p>

                <div className="flex gap-4 justify-end">

                  {/* EDIT */}

                  <button
                    onClick={() => openEdit(transaction)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                  >

                    <FaEdit />

                    Edit

                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(transaction.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                  >

                    <FaTrash />

                    Delete

                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

      {/* EDIT MODAL */}

      {

        editingTransaction && (

          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white p-10 rounded-3xl w-full max-w-xl shadow-2xl">

              <h2 className="text-4xl font-bold mb-8">

                Update Transaction

              </h2>

              <div className="space-y-5">

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border"
                />

                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border"
                />

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border"
                />

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border"
                >

                  <option value="INCOME">

                    INCOME

                  </option>

                  <option value="EXPENSE">

                    EXPENSE

                  </option>

                </select>

                {/* DATE NON EDITABLE */}

                <input
                  type="date"
                  value={editingTransaction.date}
                  disabled
                  className="w-full p-4 rounded-xl border bg-gray-200"
                />

                {/* BUTTONS */}

                <div className="flex gap-4">

                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl w-full"
                  >

                    Update

                  </button>

                  <button
                    onClick={() =>
                      setEditingTransaction(null)
                    }
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl w-full"
                  >

                    Cancel

                  </button>

                </div>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Transactions;