import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MessageSquare,
  Bell,
  LogOut,
  Filter,
  PlusCircle,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Photography Workshop",
      date: "2024-03-25",
      interests: ["photography", "art"],
      location: "Downtown Studio",
    },
    {
      id: 2,
      title: "Hiking Meetup",
      date: "2024-03-27",
      interests: ["hiking", "outdoors"],
      location: "Mountain Trail",
    },
  ]);

  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "Vitesh",
      interests: ["photography", "travel"],
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
      id: 2,
      name: "Balaji",
      interests: ["hiking", "photography"],
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  ]);

  const fetchAllUsers = async () => {
    const token = "YOUR_AUTH_TOKEN"; // Replace with actual token
    try {
      const res = await axios.get("http://localhost:3000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
      setConnections((prev) => [...prev, ...res.data]);
    } catch (e) {
      console.error("Failed to fetch users:", e.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-indigo-600" /> {/* Networx logo */}
            <span className="text-xl font-bold text-indigo-600">Networx</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/chat" className="text-gray-600 hover:text-indigo-600">
              <MessageSquare className="h-6 w-6" />
            </Link>
            <button className="text-gray-600 hover:text-indigo-600">
              <Bell className="h-6 w-6" />
            </button>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-indigo-600"
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://wallpapers.com/images/hd/vector-cartoon-ms-dhoni-hd-575intsd0dxp6iwi.jpg"
                alt="Profile"
              />
            </Link>
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              <LogOut className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
            <Link
              to="/create-event"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Event
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connections */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Connections</h2>
            <div className="space-y-4">
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={connection.avatar}
                      alt={connection.name}
                    />
                    <div className="ml-4">
                      <h4 className="font-medium">{connection.name}</h4>
                      <p className="text-sm text-gray-500">
                        {connection.interests.join(", ")}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200">
                    Chat
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.location}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{event.date}</span>
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;