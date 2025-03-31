import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="container mx-auto px-4 py-7">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2 text-white">
            <Users size={32} />
            <span className="text-2xl font-bold">Nextworx</span>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-purple-200">Login</Link>
            <Link to="/signup" className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="text-center text-white mt-32">
          <h1 className="text-6xl font-bold mb-6">
            Connect with People Who Share Your Passions
          </h1>
          <div className="flex items-center justify-center space-x-2 text-2xl mb-8">
            <Sparkles className="text-yellow-300" />
            <p>Meet amazing people with similar interests</p>
          </div>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join our community of like-minded individuals, attend exciting events, 
            and build meaningful connections based on shared interests and experiences.
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-purple-100 transition-colors"
          >
            Get Started Now
          </Link>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Discover Events</h3>
            <p>Find and join events that match your interests and expand your network.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Connect Instantly</h3>
            <p>Chat with people who share your passions and build lasting relationships.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Create Communities</h3>
            <p>Start your own events and build communities around shared interests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;