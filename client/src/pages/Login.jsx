import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try{

            const res = await axios.post("https://whispr-production-9678.up.railway.app/api/login",{
                username,
                password
            });

            alert(res.data.message);

            localStorage.setItem("username", username);

            navigate("/dashboard");

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="login-page">

            <div className="login-card">

                <h2>Ready to see what people said?</h2>

                <input
                    placeholder="Username"
                    onChange={e=>setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>
    )
}