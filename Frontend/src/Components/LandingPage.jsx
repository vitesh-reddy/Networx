import React from "react";
import { Link } from "react-router-dom";
import { Users, Sparkles, Globe, Heart } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-500">
      <div className="container mx-auto px-4 py-7">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2 text-white">
            <Users size={32} />
            <span className="text-2xl font-bold">Networx</span>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-indigo-300">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center text-white mt-32">
          <h1 className="text-6xl font-bold mb-6">
            Discover, Connect, and Grow
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join a vibrant community of like-minded individuals. Explore events,
            connect with people who share your passions, and build meaningful
            relationships.
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-100 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white">
            <Globe className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Discover Events</h3>
            <p>
              Find and join events tailored to your interests and expand your
              network effortlessly.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white">
            <Heart className="h-10 w-10 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Build Connections</h3>
            <p>
              Connect with people who share your passions and create lasting
              relationships.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white">
            <Sparkles className="h-10 w-10 text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Create Communities</h3>
            <p>
              Start your own events and foster communities around shared
              interests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;