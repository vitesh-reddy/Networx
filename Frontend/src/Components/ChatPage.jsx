import React, { useState } from "react";
import { Search, Users, ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const [activeTab, setActiveTab] = useState("individual");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Muktha",
      lastMessage: "Hello! How are you?",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      time: "Just Now",
      messages: [
        { sender: "Muktha", text: "Hello! How are you?" },
        { sender: "You", text: "I'm good, thanks! How about you?" },
      ],
    },
    {
      id: 2,
      name: "Meghana",
      lastMessage: "Thank you",
      avatar:
        "https://images.unsplash.com/photo-1554080353-321e452ccf19?w=150",
      time: "2m ago",
      messages: [
        { sender: "Meghana", text: "Thank you for your help!" },
        { sender: "You", text: "You're welcome!" },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === selectedChat.id
          ? {
              ...contact,
              messages: [
                ...contact.messages,
                { sender: "You", text: messageInput },
              ],
            }
          : contact
      );
      setSelectedChat({
        ...selectedChat,
        messages: [
          ...selectedChat.messages,
          { sender: "You", text: messageInput },
        ],
      });
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-500">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 h-screen">
          {/* Sidebar */}
          <div className="col-span-1 border-r bg-gray-50">
            <div className="p-4 border-b bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <Link
                  to="/dashboard"
                  className="text-white hover:text-indigo-300"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <h2 className="text-xl font-semibold">Messages</h2>
                <button className="text-white hover:text-indigo-300">
                  <Users className="h-6 w-6" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white rounded-lg pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex border-b bg-gray-100">
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === "individual"
                    ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("individual")}
              >
                Individual
              </button>
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === "groups"
                    ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("groups")}
              >
                Groups
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-200px)]">
              {contacts
                .filter((contact) =>
                  activeTab === "groups" ? contact.isGroup : !contact.isGroup
                )
                .map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center p-4 cursor-pointer transition-colors ${
                      selectedChat?.id === contact.id
                        ? "bg-indigo-100"
                        : "hover:bg-indigo-50"
                    }`}
                    onClick={() => setSelectedChat(contact)}
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-12 w-12 rounded-full shadow-md"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">
                          {contact.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {contact.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col bg-gray-50">
            {selectedChat ? (
              <>
                <div className="p-4 border-b bg-white flex items-center">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="h-10 w-10 rounded-full shadow-md"
                  />
                  <h3 className="ml-4 text-lg font-medium text-gray-800">
                    {selectedChat.name}
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "You"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg shadow ${
                          message.sender === "You"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t bg-white flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <MessageCircle className="h-12 w-12 text-indigo-600" />
                <p className="ml-4 text-lg">Select a chat to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;