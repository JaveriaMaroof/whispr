// first API send msg

const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

router.post("/send-message", async (req,res)=>{

    try{

        const {receiver,text} = req.body;

        const newMessage = new Message({
            receiver,
            text
        });

        await newMessage.save();

        res.json({message:"Message sent successfully"});

    }catch(err){
        res.status(500).json({error:err.message});
    }

});


// GET msgs API
router.get("/messages/:username", async (req, res) => {

    try{

        const username = req.params.username;

        const messages = await Message.find({ receiver: username });

        res.json(messages);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
});




// uper cmnted update
// GET anonymous user page data (optional, frontend ke liye)
router.get("/user/:username", async (req, res) => {
    try{
        const username = req.params.username;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json({username:user.username});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});



// rply API
router.post("/reply/:id", async (req, res) => {

    try{

        const messageId = req.params.id;
        const { reply } = req.body;

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { reply: reply },
            { new: true }
        );

        res.json(updatedMessage);

    }catch(err){
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;