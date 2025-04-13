const express = require("express");
const { verifyToken } = require("../middleware/authentication");
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserData,
} = require("../api/user");

const userRouter = express.Router();

// Create a new user (Register)
userRouter.post("/register", register);
// Login user
userRouter.post("/login", login);

userRouter.get('/protected', getUserData);


userRouter.use(verifyToken);

// Get all users (Protected route)
userRouter.get("/", getAllUsers);

// Get single user by ID (Protected route)
userRouter.get("/:id", getUserById);

// Update user (Protected route)
userRouter.put("/:id", updateUser);

// Delete user (Protected route)
userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };
