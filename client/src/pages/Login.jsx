import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { username, password }
      );

      if (res.data.message === "Login successful") {
        localStorage.setItem("username", res.data.username);
        navigate("/dashboard");
      } else {
        alert(res.data.message); // wrong password or user not found
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Ready to see what people said?</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}