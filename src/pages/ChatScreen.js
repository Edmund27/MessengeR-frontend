import React, { useState } from "react";
import Messages from "../components/Messages";
import { appendMessage, setClientId } from '../store/user/actions.js';
import { useDispatch, useSelector } from "react-redux";
import store from '../store';
import { selectUser } from "../store/user/selectors";
import '../styles/general.css'

import io from "socket.io-client";
const socket = io.connect(`http://localhost:4000`);

socket.on('chat', (data) => {
    store.dispatch(appendMessage(data));
});




export default function ChatScreen() {
    const [messageInput, setMessageInput] = useState('')
    const username = useSelector(selectUser);
    const dispatch = useDispatch();

    dispatch(setClientId(socket.id))

    const submitMessage = (e) => {
        e.preventDefault()
        console.log('messagesSelector:', socket.id)
        const message = {
            username: username,
            message: messageInput,
            clientId: socket.id
        }
        setMessageInput('')
        socket.emit('chat', message);
    }




    return (
        <div>
            <Messages />
            <p className='container'>
                <form onSubmit={submitMessage}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={event => setMessageInput(event.target.value)}
                        required />
                </form >
                <button onClick={submitMessage} class="Button1" type="button">
                    Send
                </button>
            </p>

        </div>
    );
}
