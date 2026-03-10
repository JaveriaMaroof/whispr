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

      // mobile → open image
      const newTab = window.open();
      newTab.document.body.style.margin = "0";
      newTab.document.body.innerHTML = `
        <img src="${image}" style="width:100%;height:auto;" />
        <p style="text-align:center;font-family:sans-serif;">
        Long press image to save 📥
        </p>
      `;

    } else {

      // desktop → download
      const link = document.createElement("a");
      link.download = `${username}-story.png`;
      link.href = image;
      link.click();

    }

  };

  return (

    <div className="story-card-wrapper">

      <div className="story-card" id="story-card">

        <h2>Send me anonymous messages 💌</h2>

        <p className="username">@{username}</p>

        <p className="link">{profileLink}</p>

        <p className="hint">Tap link and send me messages</p>

      </div>

      <button className="download-btn" onClick={downloadCard}>
        Download
      </button>

    </div>

  );

}