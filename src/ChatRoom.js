import React from "react";

import useChat from "./useChat";
import { useAlert } from 'react-alert';

import "./chatRoom.css";

const ChatRoom = (props) => {
    const alert = useAlert();

    const { roomId } = props.match.params;
    const { nickname } = props.match.params;
    const [messages, sendMessage] = useChat(roomId, nickname, (msg) => alert.show(msg));
    const [newMessage, setNewMessage] = React.useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSendMessage = () => {
        sendMessage(nickname, newMessage);
        setNewMessage("");
    }

    return (
        <div className="chat-room-container">
        <h1 className="room-name">Room: {roomId}</h1>
        <div className="messages-container">
            <ol className="messages-list">
            {messages.map((message, i) => (
                <li
                key={i}
                className={`message-item ${
                    message.currentUser ? "my-message" : "received-message"
                }`}
                >
                {message.currentUser ? nickname : message.nickname}: {message.body}
                </li>
            ))}
            </ol>
        </div>
        <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
            Send
        </button>
        </div>
    )
}

export default ChatRoom;