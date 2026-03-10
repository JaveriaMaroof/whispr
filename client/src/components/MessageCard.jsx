import React, { useState } from "react";
import axios from "axios";

export default function MessageCard({ message }) {

    const [reply, setReply] = useState(message.reply || "");
    const [status, setStatus] = useState("");
    const [sent, setSent] = useState(!!message.reply);

    const handleReply = async () => {

        if(!reply){
            setStatus("Write something first");
            return;
        }

        try {

            await axios.post(
                `https://whispr-production-9678.up.railway.app/api/reply/${message._id}`,
                { reply }
            );

            setStatus("Reply sent!");
            setSent(true);

        } catch(err) {

            console.log(err);
            setStatus("Error sending reply");

        }
    }

    return (

        <div style={{border:"1px solid #ccc", padding:"10px", margin:"5px 0"}}>

            <p><b>Message:</b> {message.text}</p>

            <p>
                <b>Reply:</b> {sent ? reply : "No reply yet"}
            </p>

            {/* Reply input */}
            <input 
                type="text"
                placeholder="Type your reply"
                value={reply}
                disabled={sent}
                onChange={e => setReply(e.target.value)}
            />

            <button 
                onClick={handleReply}
                disabled={sent}
            >
                {sent ? "Replied" : "Reply"}
            </button>

            {status && <p>{status}</p>}

        </div>
    );
}