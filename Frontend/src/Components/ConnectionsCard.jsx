import React from "react";

const ConnectionsCard = ({connection}) => {
  return (
    <div key={connection.id} className="flex items-center justify-between">
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
  );
};

export default ConnectionsCard;
