import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SendMessage.css";

export default function SendMessage(){

    const { username } = useParams();

    const [text,setText] = useState("");

    const sendMessage = async () => {

        try{

            await axios.post("https://whispr-production-9678.up.railway.app/api/send-message",{
                receiver: username,
                text: text
            });

            alert("Message sent!");
            setText("");

        }catch(err){
            console.log(err);
            alert("Message failed to send");
        }
    }

    return(

        <div className="send-page">

            <div className="send-card">

                <h2>Got something to say?
Drop it here anonymously.</h2>

                <p className="username">@{username}</p>

                <textarea
                    placeholder="Type your anonymous message..."
                    value={text}
                    onChange={e=>setText(e.target.value)}
                />

                <button onClick={sendMessage}>
                    Send Message
                </button>

            </div>

        </div>
    )
}