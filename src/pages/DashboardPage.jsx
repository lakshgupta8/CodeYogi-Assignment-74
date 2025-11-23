import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaBoxOpen, FaHeart, FaCog } from "react-icons/fa";
import { UserContext } from "../context/UserContext.js";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    alert("Logout successful");
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="mx-auto px-4 max-w-6xl">
        <h1 className="mb-8 font-bold text-gray-800 text-3xl">My Account</h1>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col bg-white shadow-md p-6 rounded-lg min-h-[400px]">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex justify-center items-center bg-red-100 rounded-full w-16 h-16 text-primary-default">
                <FaUser className="text-3xl" />
              </div>
              <div>
                <h2 className="font-semibold text-xl">
                  Hello, {user?.user?.firstName || "User"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {user?.user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <Link
                to="/edit-profile"
                className="block w-full text-gray-700 hover:text-primary-default text-left transition-colors"
              >
                Edit Profile
              </Link>
              <Link
                to="/change-password"
                className="block w-full text-gray-700 hover:text-primary-default text-left transition-colors"
              >
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="mt-auto w-full text-primary-light hover:text-primary-dark text-left transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="space-y-6 md:col-span-2">
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
              <Link
                to="/orders"
                className="flex flex-col justify-center items-center bg-white shadow-sm hover:shadow-md p-6 rounded-lg text-center transition-shadow cursor-pointer"
              >
                <FaBoxOpen className="mb-3 text-blue-500 text-3xl" />
                <span className="font-medium text-gray-700">Orders</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex flex-col justify-center items-center bg-white shadow-sm hover:shadow-md p-6 rounded-lg text-center transition-shadow cursor-pointer"
              >
                <FaHeart className="mb-3 text-primary-default text-3xl" />
                <span className="font-medium text-gray-700">Wishlist</span>
              </Link>
              <Link
                to="/settings"
                className="flex flex-col justify-center items-center bg-white shadow-sm hover:shadow-md p-6 rounded-lg text-center transition-shadow cursor-pointer"
              >
                <FaCog className="mb-3 text-gray-500 text-3xl" />
                <span className="font-medium text-gray-700">Settings</span>
              </Link>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="mb-4 font-bold text-gray-800 text-lg">
                Recent Orders
              </h3>
              <div className="py-8 text-gray-500 text-center">
                <FaBoxOpen className="mx-auto mb-3 text-gray-300 text-4xl" />
                <p>No recent orders found.</p>
                <Link
                  to="/"
                  className="inline-block mt-4 text-primary-default hover:underline"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
