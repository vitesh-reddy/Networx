const Chat = require("../models/Chat");
const User = require("../models/User");

const createChat = async (isGroup = false, participants) => {
  try {
    if (!participants || participants.length < 2) {
      throw new Error("At least two participants are required.");
    }

    if (!isGroup) {
      // Check if a non-group chat already exists between the participants
      const existingChat = await Chat.findOne({
        isGroup: false,
        participants: {
          $all: participants,
          $size: participants.length,
        },
      });

      if (existingChat) {
        return existingChat; // Return the existing chat if found
      }
    }

    const chat = new Chat({
      isGroup,
      participants,
      messages: [],
    });
    const savedChat = await chat.save();

    // Add chat reference to each participant
    await User.updateMany(
      { _id: { $in: participants } },
      { $push: { chats: savedChat._id } }
    );

    return savedChat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

const getUserChats = async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: "chats",
      populate: {
        path: "participants",
        select: "name email",
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user.chats;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    throw error;
  }
};

const createMessage = async (chatId, senderId, content) => {
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error("Chat not found.");
    }

    const message = {
      sender: senderId,
      content,
      timestamp: new Date(),
    };

    chat.messages.push(message);
    await chat.save();

    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

const getChatMessages = async (chatId) => {
  try {
    console.log(chatId);
    const chat = await Chat.findById(chatId).populate({
      path: "participants",
      select: "name email",
    });

    if (!chat) {
      throw new Error("Chat not found.");
    }

    return chat.messages;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

module.exports = {
  createChat,
  getUserChats,
  createMessage,
  getChatMessages,
};
