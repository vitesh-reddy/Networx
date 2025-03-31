import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Bell,
  LogOut,
  Filter,
  Calendar,
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
      name: "Vitesh ",
      interests: ["photography", "travel"],
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
      id: 1,
      name: "Balaji",
      interests: ["hiking", "photography"],
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Networx
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/chat" className="text-gray-600 hover:text-purple-600">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <button className="text-gray-600 hover:text-purple-600">
                <Bell className="h-6 w-6" />
              </button>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-purple-600"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://wallpapers.com/images/hd/vector-cartoon-ms-dhoni-hd-575intsd0dxp6iwi.jpg"
                  alt="Profile"
                />
              </Link>
              <Link to="/" className="text-gray-600 hover:text-purple-600">
                <LogOut className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Network</h2>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
              <Link
                to="/create-event"
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Create Event
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">
                People with Similar Interests
              </h3>
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
                    <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200">
                      Chat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.location}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {event.date}
                      </span>
                      <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200">
                        Enter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
