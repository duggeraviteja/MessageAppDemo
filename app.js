require("dotenv").config();
const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const cors = require("cors");
const Chat = require("./database/chatSchema");
const Messages = require("./database/MessageSchema");
const User = require("./database/userSchema");

const authenticate = require("./authenticate");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
require("./database/conn");



app.post("/register", async (req, res) => {
  try {
    let { username, email, mobile, password, dob, gender, role } = req.body;

    if (!email || !password || !mobile)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    const salt = 12;
    password = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      mobile,
      dob,
      password,
      gender,
      role,
    });

    await newUser.save().then((result) => {
      if (result) {
        return res.json({
          message: "sucessfully registered.",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errorMessage: "error",
    });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    console.log(req.body);

    if (!email || !password)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Wrong email or password.",
      });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({
        errorMessage: "Wrong email or password.",
      });

    // sign the token
    //  const emailToken = crypto.randomBytes(64).toString('hex');

    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    //res.send(existingUser);
    return res.json({
      token,
      user: existingUser,
    });
  } catch (err) {
    // console.error(err);
    return res.status(500).json({
      errorMessage: `Connection Error${err}`,
    });
  }
});

app.get("/allUsers", authenticate, async (req, res) => {
  const user = req.details;

  const pattern = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  let allusers = await User.find(pattern).find({ _id: { $ne: user._id } });

  return res.json(allusers);
});

app.post("/accessChat", authenticate, async (req, res) => {
  const user = req.details;

  const { userId } = req.body;
  if (!userId) {
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username userImage  email ",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res.status(200).send(fullChat);
    } catch (error) {
      return res.status(400).json({
        errorMessage: `${error}`,
      });
    }
  }
});

app.get("/fetchChats", authenticate, async (req, res) => {
  const user = req.details;

  try {
    Chat.find({ users: { $elemMatch: { $eq: user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username userImage  email ",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    return res.json({
      errorMessage: `${error}`,
    });
  }
});

app.post("/sendMessage", authenticate, async (req, res) => {
  const loggedUser = req.details;
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.json({
      errorMessage: "Invalid ....",
    });
  }

  const newMessage = {
    sender: loggedUser._id,
    content: content,
    chat: chatId,
  };

  let todayMessagesSent = await Messages.find(
    { sender: loggedUser._id },
    { createdAt: new Date() }
  );

  if (loggedUser.membership === "silver") {
    if (todayMessagesSent.length > 10) {
      return res.json({
        errorMessage: `Your limit of Sending Messages are Completed.`,
      });
    }
  } else if (loggedUser.membership === "gold") {
    if (todayMessagesSent.length > 50) {
      return res.json({
        errorMessage: `Your limit of Sending Messages are Completed.`,
      });
    }
  } else if (loggedUser.membership === "platinum") {
    if (todayMessagesSent.length > 100) {
      return res.json({
        errorMessage: `Your limit of Sending Messages are Completed.`,
      });
    }
  }

  try {
    let message = await Messages.create(newMessage);
    message = await message.populate("sender", "username userImage email");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username  userImage  email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.json(message);
  } catch (error) {
    return res.json({
      errorMessage: `${error}`,
    });
  }
});

app.get("/allMessage", authenticate, async (req, res) => {
  //  console.log("-----"+ req.query.chatId );
  try {
    let messgs = await Messages.find({ chat: req.query.chatId })
      .populate("sender", "username userImage email")
      .populate("chat");
    return res.json(messgs);
  } catch (error) {
    return res.json({
      errorMessage: `${error}`,
    });
  }
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Server started on port....", process.env.PORT);
});
