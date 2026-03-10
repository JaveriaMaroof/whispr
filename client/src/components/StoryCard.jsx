import React from "react";
import "./StoryCard.css";
import html2canvas from "html2canvas";

export default function StoryCard({ username }) {

  const profileLink = `${window.location.origin}/${username}`;

  const downloadCard = async () => {

    const card = document.getElementById("story-card");

    const canvas = await html2canvas(card, {
      useCORS: true,
      scale: 2
    });

    const image = canvas.toDataURL("image/png");

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {

      // Mobile → replace page with image
      const newWindow = window.open("");
      newWindow.document.write(`
        <html>
        <head>
        <title>Save Image</title>
        <style>
        body{
        margin:0;
        background:black;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        height:100vh;
        color:white;
        font-family:sans-serif;
        }
        img{
        width:100%;
        max-width:500px;
        }
        p{
        margin-top:10px;
        }
        </style>
        </head>
        <body>
        <img src="${image}" />
        <p>Long press image to save 📥</p>
        </body>
        </html>
      `);

    } else {

      // Desktop → download
      const link = document.createElement("a");
      link.href = image;
      link.download = `${username}-story.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    }

  };

  return (

    <div className="story-card-wrapper">

      <div className="story-card" id="story-card">

        <h2>Send me anonymous messages 💌</h2>

        <p className="username">@{username}</p>

        <p className="link">{profileLink}</p>

        <p className="hint">Tap link and send me messages 👀</p>

      </div>

      <button className="download-btn" onClick={downloadCard}>
        Download Story Card
      </button>

    </div>

  );

}