import React, { useState } from "react";
import { Link } from "react-router-dom"

import './home.css'

const Home = () => {
    const [roomName, setRoomName] = useState("");
    const [nickname, setNickname] = useState("");

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    }

    return (
    <div className="home-container">
      <div>
        <h1>Join a chatroom</h1>
      </div>
      <input 
        style={{ marginBottom: 25 }}
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="text-input-field"
      />
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}/${nickname}`} className="enter-room-button">
        Join room
      </Link>
    </div>
    )
}

export default Home;