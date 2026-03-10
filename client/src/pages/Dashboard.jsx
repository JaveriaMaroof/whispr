import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MessageCard from "../components/MessageCard";
import "./Dashboard.css";
import StoryCard from "../components/StoryCard";


export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [copied, setCopied] = useState(false);

  const username = localStorage.getItem("username"); // getting dynamically from local storage
  const link = `${window.location.origin}/${username}`;

  const copyLink = () => {

  navigator.clipboard.writeText(link);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

 useEffect(() => {
  const fetchMessages = async () => {
    const res = await axios.get(`https://whispr-production-9678.up.railway.app/api/messages/${username}`);
    setMessages(res.data);
  };

  if(username) fetchMessages();
}, [username]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>What people said 👀</h1>
        
            <div className="share-box">
  <StoryCard username={username} />

  <p>Share this link to receive messages</p>

  <input value={link} readOnly />

  <button onClick={copyLink}>Copy Link</button>

  {copied && <div className="toast">✓ Link Copied</div>}
</div>

        <div className="messages-grid">
          {messages.map((msg) => (
            <MessageCard key={msg._id} message={msg} />
          ))}
        </div>
      </div>
    </div>
  );
}
