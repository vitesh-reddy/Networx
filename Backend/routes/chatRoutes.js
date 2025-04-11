const express = require("express");
const {
  createChat,
  getUserChats,
  createMessage,
  getChatMessages,
  createGroupChat,
  removeParticipantsFromGroup,
  addParticipantsToGroup,
  updateChatAvatar,
} = require("../api/chat");

const chatRouter = express.Router();

// Create a new chat
chatRouter.post("/", async (req, res) => {
  try {
    const { name, participants } = req.body;
    const participantsArray = participants?.split(",");

    const chat = await createChat(name, participantsArray);
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// create a new group chat
chatRouter.post("/groupChat", async (req, res) => {
  try {
    const { name, participants } = req.body;
    const participantsArray = participants?.split(",");

    const chat = await createGroupChat(name, participantsArray);
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update chat avatar
chatRouter.post("/avatar", async (req, res) => {
  try {
    const { chatId, avatar } = req.body;
    const chat = await updateChatAvatar(chatId, avatar);
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add participants to group
chatRouter.post("/groupChatParticipants", async (req, res) => {
  try {
    const { chatId, participants } = req.body;
    const participantsArray = participants?.split(",");

    const chat = await addParticipantsToGroup(
      chatId,
      participantsArray
    );
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

chatRouter.delete("/groupChatParticipants", async (req, res) => {
  try {
    const { chatId, participants } = req.body;
    const participantsArray = participants?.split(",");

    const chat = await removeParticipantsFromGroup(
      chatId,
      participantsArray
    );
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
