const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const Message = require("./models/Message");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://whispr-hazel-six.vercel.app",
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("/*", cors());


// Routes
app.use("/api", messageRoutes);
app.use("/api", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Send message route
app.post("/api/send-message", async (req, res) => {
  try {
    const { to, text } = req.body;

    const message = new Message({
      receiver: to,
      text: text
    });

    await message.save();

    res.json({ message: "Message sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});