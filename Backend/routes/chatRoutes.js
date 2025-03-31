const express = require("express");
const {
  createChat,
  getUserChats,
  createMessage,
  getChatMessages,
} = require("../api/chat");

const chatRouter = express.Router();

// Create a new chat
chatRouter.post("/create", async (req, res) => {
  try {
    const { isGroup, participants } = req.body;
    const participantsArray = participants?.split(",");

    const chat = await createChat(isGroup, participantsArray);
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all chats for a user
chatRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await getUserChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create a new message in a chat
chatRouter.post("/message/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { senderId, content } = req.body;
    const message = await createMessage(
      chatId,
      senderId,
      content
    );
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all messages in a chat
chatRouter.get("/message/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    console.log(chatId);
    const messages = await getChatMessages(chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = { chatRouter };
