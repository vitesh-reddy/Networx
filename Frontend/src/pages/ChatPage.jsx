import React, { useState } from 'react';
import { Search, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
const ChatPage = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Sarah Parker',
      lastMessage: 'Looking forward to the photography meetup!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      time: '2m ago'
    },
    {
      id: 2,
      name: 'Photography Group',
      lastMessage: 'New event scheduled for next week',
      avatar: 'https://images.unsplash.com/photo-1554080353-321e452ccf19?w=150',
      time: '1h ago',
      isGroup: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 h-screen">
          {/* Sidebar */}
          <div className="col-span-1 border-r">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600">
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <h2 className="text-xl font-semibold">Messages</h2>
                <button className="text-purple-600 hover:text-purple-700">
                  <Users className="h-6 w-6" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === 'individual'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('individual')}
              >
                Individual
              </button>
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === 'groups'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('groups')}
              >
                Groups
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-200px)]">
              {contacts
                .filter(contact =>
                  activeTab === 'groups'
                    ? contact.isGroup
                    : !contact.isGroup
                )
                .map(contact => (
                  <div
                    key={contact.id}
                    className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{contact.name}</h3>
                        <span className="text-sm text-gray-500">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {activeTab === 'groups' && (
              <div className="p-4 border-t">
                <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Create New Group
                </button>
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col">
            <div className="flex-1 p-6 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;