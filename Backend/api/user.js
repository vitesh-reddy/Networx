const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log("Registering user", req.body);
  try {
    const {
      firstName,
      lastName,
      userName,
      gender,
      age,
      email,
      locality,
      avatar,
      password,
      interests,
    } = req.body;

    const interestsArray = interests?.split(",");
    console.log("interestsArray", interestsArray);
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashing done");
  // Create new user
  user = new User({
    firstName,
      lastName,
      userName,
      gender,
      age,
      email,
      locality,
      avatar,
      password: hashedPassword,
      interests: interestsArray,
    });
    
    console.log("saving...");
    const ress = await user.save();
    console.log(ress);
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("token genre...");
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        gender: user.gender,
        age: user.age,
        email: user.email,
        locality: user.locality,
        avatar: user.avatar,
        role: user.role,
        interests: user.interests,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with Email not Found!" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        gender: user.gender,
        age: user.age,
        email: user.email,
        locality: user.locality,
        avatar: user.avatar,
        role: user.role,
        interests: user.interests,
        attendedEvents: user.attendedEvents,
        chats: user.chats,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      gender,
      age,
      email,
      locality,
      avatar,
      interests,
    } = req.body;

    // Check if user exists
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is updating their own profile
    if (user._id.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this user" });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.userName = userName || user.userName;
    user.gender = gender || user.gender;
    user.age = age || user.age;
    user.email = email || user.email;
    user.locality = locality || user.locality;
    user.avatar = avatar || user.avatar;
    user.interests = interests?.split(",") || user.interests;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        gender: user.gender,
        age: user.age,
        email: user.email,
        locality: user.locality,
        avatar: user.avatar,
        role: user.role,
        interests: user.interests,
        attendedEvents: user.attendedEvents,
        chats: user.chats,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is deleting their own profile
    if (user._id.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this user" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
