import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import { selectUser } from "../store/user/selectors";
import { selectSender } from "../store/chats/selectors";
import '../styles/general.css'
import Messages from "../components/Messages"
import socket from "../socket"

// import io from "socket.io-client";
// const socket = io.connect(`http://localhost:4000`);

// socket.on('chat', (data) => {
//     store.dispatch(appendMessage(data));
// });




export default function ChatScreen() {
    const [messageInput, setMessageInput] = useState('')
    const allMessages = useSelector(selectMessages);
    const user = useSelector(selectUser);
    const receiver = useSelector(selectSender);


    const submitMessage = (e) => {
        e.preventDefault()
        const message = {
            user: user,
            receiver: receiver,
            text: messageInput,
        }
        setMessageInput('')
        socket.emit('newMessage', message);
        console.log("EMITTED MESSAGE", message)
    }




    return (
        <div>
            <Messages />
            <div className='container'>
                <form onSubmit={submitMessage}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={event => setMessageInput(event.target.value)}
                        required />
                </form >
                <button onClick={submitMessage} className="Button1" type="button">
                    Send
                </button>
            </div>

        </div>
    );
}
