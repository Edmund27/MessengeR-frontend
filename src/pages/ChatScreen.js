import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import '../styles/general.css'
import Messages from "../components/Messages"

// import io from "socket.io-client";
// const socket = io.connect(`http://localhost:4000`);

// socket.on('chat', (data) => {
//     store.dispatch(appendMessage(data));
// });




export default function ChatScreen() {
    const [messageInput, setMessageInput] = useState('')
    const allMessages = useSelector(selectMessages);


    const submitMessage = (e) => {
        e.preventDefault()
        console.log("ALL MESSAGES", allMessages)

        // console.log('messagesSelector:', socket.id)
        // const message = {
        //     username: username,
        //     message: messageInput,
        //     clientId: socket.id
        // }
        // setMessageInput('')
        // socket.emit('chat', message);
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
