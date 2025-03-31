
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // ✅ OPEN MODAL
  const openModal = (user, type) => {
    setModalData(user);
    setModalType(type);
  };

  // ✅ CLOSE MODAL
  const closeModal = () => {
    setModalData(null);
    setModalType(null);
  };

  // ✅ UPDATE USER FUNCTION
  const handleUpdateUser = async () => {
    if (!modalData) return;

    try {
      const response = await fetch(
        `https://reqres.in/api/users/${modalData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: modalData.first_name,
             last_name: modalData.last_name,
            email: modalData.email,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      // Update user in local state
      setUsers(
        users.map((user) =>
          user.id === modalData.id ? { ...user, ...modalData } : user
        )
      );
      closeModal(); // Close modal after update
    } catch (error) {
      console.error("Failed to update user");
    }
  };

  // ✅ DELETE USER FUNCTION
  const handleConfirmDelete = async () => {
    if (!modalData) return;

    try {
      const response = await fetch(
        `https://reqres.in/api/users/${modalData.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok && response.status !== 204)
        throw new Error("Failed to delete user");

      // Remove user from local state
      setUsers(users.filter((user) => user.id !== modalData.id));
      closeModal(); // Close modal after delete
    } catch (error) {
      console.error("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-800 text-white p-6 flex flex-col items-center">
      {/* 🔹 LOGOUT BUTTON */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold drop-shadow-lg">User Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white shadow-md"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md bg-white text-gray-900 border border-gray-300 px-4 py-2 rounded-full shadow-md focus:ring-2 focus:ring-purple-400 mb-4"
      />

      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="w-full bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-indigo-700 text-white text-left">
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  Loading users...
                </td>
              </tr>
            ) : (
              users
                .filter((user) =>
                  user.first_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 hover:bg-gray-100 transition"
                  >
                    <td className="p-3">
                      <img
                        src={user.avatar}
                        alt={user.first_name}
                        className="w-12 h-12 rounded-full shadow-lg"
                      />
                    </td>
                    <td className="p-3 font-semibold">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => openModal(user, "edit")}
                        className="mx-1 bg-blue-600 hover:bg-blue-500 p-2 rounded text-white"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => openModal(user, "delete")}
                        className="mx-1 bg-red-600 hover:bg-red-500 p-2 rounded text-white"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 PAGINATION BUTTONS */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-800 hover:bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-800 hover:bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* 🔹 MODAL FOR UPDATE & DELETE */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-xl text-gray-900">
            {modalType === "edit" ? (
              <>
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <input
                  type="text"
                  className="w-full mb-2 p-2 rounded border"
                  value={modalData.first_name}
                  onChange={(e) =>
                    setModalData({ ...modalData, first_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full mb-2 p-2 rounded border"
                  value={modalData.last_name}
                  onChange={(e) =>
                    setModalData({ ...modalData, last_name: e.target.value })
                  }
                />

                <input
                  type="email"
                  className="w-full mb-2 p-2 rounded border"
                  value={modalData.email}
                  onChange={(e) =>
                    setModalData({ ...modalData, email: e.target.value })
                  }
                />
                <button
                  onClick={handleUpdateUser}
                  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
                >
                  Delete
                </button>
              </>
            )}
            <button
              onClick={closeModal}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded text-white mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
