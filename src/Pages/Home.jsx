import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreationForm from "../Components/CreationForm";
import UpcomingEvents from "../Components/UpcomingEvents";
import { logout } from "../Redux/AuthSlice";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.login);
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <header className="bg-white shadow">
        <nav className="bg-white shadow-md">
          {/* Increased vertical padding (py-8) for more navbar height */}
          <div className="container mx-auto px-6 py-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Event Planner
            </h1>
            {/* Increased horizontal spacing between buttons (space-x-12) */}
            <div className="flex items-center space-x-12">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Side - Creation Form */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              <CreationForm />
            </div>
          </div>

          {/* Right Side - Upcoming Events */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">
              {events.length > 3
                ? "Don't worry, we've got you covered"
                : `Upcoming Events (${events.length})`}
            </h2>
            <div className="bg-white shadow rounded-lg p-6">
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
