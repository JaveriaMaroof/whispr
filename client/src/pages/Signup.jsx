import React, { useState } from "react";
import { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://whispr-production-9678.up.railway.app/api/signup",
        { username, email, password }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage("Server error, try again later");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Let’s get you started</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>

        <p className="signup-message">{message}</p>
      </div>
    </div>
  );
}