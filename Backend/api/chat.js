const Chat = require("../models/Chat");
const User = require("../models/User");

const createChat = async (name, participants) => {
  try {
    if (!participants || participants.length < 2) {
      throw new Error("At least two participants are required.");
    }

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

    const chat = new Chat({
      name,
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

const createGroupChat = async (name, participants) => {
  try {
    if (!participants || participants.length < 2) {
      throw new Error("At least two participants are required.");
    }

    const chat = new Chat({
      name,
      isGroup: true,
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
    console.error("Error creating group chat:", error);
    throw error;
  }
};

const addParticipantsToGroup = async (
  chatId,
  newParticipants
) => {
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error("Chat not found.");
    }

    if (!chat.isGroup) {
      throw new Error(
        "Cannot add participants to a non-group chat."
      );
    }

    // Add new participants to the chat, avoiding duplicates
    const uniqueNewParticipants = newParticipants.filter(
      (participant) => !chat.participants.includes(participant)
    );
    chat.participants.push(...uniqueNewParticipants);
    await chat.save();

    // Add chat reference to each new participant
    await User.updateMany(
      { _id: { $in: newParticipants } },
      { $push: { chats: chat._id } }
    );

    return chat;
  } catch (error) {
    console.error("Error adding participants to group:", error);
    throw error;
  }
};

const removeParticipantsFromGroup = async (
  chatId,
  participantsToRemove
) => {
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error("Chat not found.");
    }

    if (!chat.isGroup) {
      throw new Error(
        "Cannot remove participants from a non-group chat."
      );
    }

    // Remove participants from the chat
    chat.participants = chat.participants.filter(
      (participant) =>
        !participantsToRemove.includes(participant.toString())
    );
    await chat.save();

    // Remove chat reference from each removed participant
    await User.updateMany(
      { _id: { $in: participantsToRemove } },
      { $pull: { chats: chat._id } }
    );

    return chat;
  } catch (error) {
    console.error(
      "Error removing participants from group:",
      error
    );
    throw error;
  }
};

const updateChatAvatar = async (chatId, avatar) => {
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error("Chat not found.");
    }

    chat.avatar = avatar;
    await chat.save();

    return chat;
  } catch (error) {
    console.error("Error updating chat avatar:", error);
    throw error;
  }
};

module.exports = {
  createChat,
  getUserChats,
  createMessage,
  getChatMessages,
  createGroupChat,
  removeParticipantsFromGroup,
  addParticipantsToGroup,
  updateChatAvatar,
};
