import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConnectionsCard from "./ConnectionsCard";
import mockEvents from "../../public/mockEvents";
import mockConnections from "../../public/mockConnections";
import {
  MessageSquare,
  Bell,
  LogOut,
  Filter,
  PlusCircle,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const [events, setEvents] = useState(mockEvents);

  const [showFilter, setShowFilter] = useState(false);


  const [connections, setConnections] = useState(mockConnections);

  const fetchAllUsers = async () => {
    // await axios.get()
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
            <Link to="/profile" className="text-gray-600 hover:text-indigo-600">
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
            <button onClick={() => setShowFilter((p) => !p)}  className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
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
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" hidden={!showFilter}>
          <h2 className="text-xl font-semibold mb-4">Filter Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Title
              </label>
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Interests Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Interest
              </label>
              <select className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">All Interests</option>
                <option value="photography">Photography</option>
                <option value="hiking">Hiking</option>
                <option value="art">Art</option>
                <option value="outdoors">Outdoors</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connections */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Connections</h2>
            <div className="space-y-4">
              {connections.map((connection) => (
                <ConnectionsCard key={connection.id} connection={connection}/>
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
                  <p className="text-sm text-gray-500 mt-1">{event.location}</p>
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
