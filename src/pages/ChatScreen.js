import React, { useState } from "react";
import Messages from "../components/Messages";
//import ChatInput from "../components/ChatInput";
import io from "socket.io-client";



export default function ChatScreen() {
    const socket = io(`http://localhost:4000`);
    //console.log("IO:", io)
    const [messageInput, setMessageInput] = useState('')
    const [messagesState, setMessagesState] = useState([
        //seed messages
        {
            id: 1,
            userName: 'Michael',
            message: 'Hey, how are you',
            from: 'him'
        },
        {
            id: 2,
            userName: 'Edmund',
            message: 'I am good, what about you?',
            from: 'me'
        }
    ]);

    function sendMessage(event) {
        event.preventDefault();
        setMessagesState([...messagesState,
        {
            id: messagesState.length + 1,
            userName: 'Edmund',
            message: messageInput,
            from: 'me',
        }])
    }

    return (
        <div>
            <h4>MessengeR</h4>
            <Messages messages={messagesState} />
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={event => setMessageInput(event.target.value)}
                    required />
            </form>
        </div>
    );
}
