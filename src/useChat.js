import { useEffect, useRef, useState } from "react";

import socketIOClient from "socket.io-client";

const NEW_MESSAGE = 'newChatMessage';
const SOCKET_SERVER_URL = "https://stark-beyond-54919.herokuapp.com/"; //"http://localhost:4000";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        //Create WebSocket connection with the server
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        //Listens for incoming messages
        //Tags messages wheter sent or received
        socketRef.current.on(NEW_MESSAGE, (message) => {
            const incomingMessage = {
                ...message,
                currentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        //Destroys the socket reference when component is unmounted
        return () => {
            socketRef.current.disconnect();
        }
    }, [roomId]);


    const sendMessage = (nickname, messageBody) => {
        socketRef.current.emit(NEW_MESSAGE, {
            body: messageBody,
            senderId: socketRef.current.id,
            nickname: nickname
        });
    };

    return [messages, sendMessage];

}

export default useChat;