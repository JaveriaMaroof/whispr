const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const Message = require("./models/Message");
require("dotenv").config();

const app = express();

// app.use(cors());
app.use(cors({
    origin: "*"
}));


app.use(express.json());
app.use("/api", messageRoutes);
// auth route
app.use("/api", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
    res.send("API Running");
});

// api/send route
app.post("/api/send-message", async (req,res)=>{

    try{

        const {to,text} = req.body;

        const message = new Message({
            receiver: to,
            text: text
        });

        await message.save();

        res.json({message:"Message sent successfully"});

    }catch(err){

        console.log(err);
        res.status(500).json({error:"Server error"});

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server running");
});