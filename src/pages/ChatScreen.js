import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import { selectUser } from "../store/user/selectors";
import { selectSender } from "../store/chats/selectors";
//import '../styles/general.css'
import '../styles/chat.css'
//import '../styles/chat.css'
import Messages from "../components/Messages"
import socket from "../socket"


import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [allMessages]);

    const submitMessage = (e) => {
        e.preventDefault()
        const message = {
            user: user,
            receiver: receiver,
            text: messageInput,
        }
        setMessageInput('')
        socket.emit('newMessage', message);
        //console.log("EMITTED MESSAGE", message)
    }

    console.log("THIS IS THE RECEVIVER", receiver)
    return (
        <div >
            <Card className="nameCard">
                <Card.Body>
                    <img
                        src={receiver.imageUrl}
                        alt="alternatetext"
                        width="50" height="50"
                    >
                    </img>
                    {receiver.name}
                </Card.Body>
            </Card>
            <Messages />

            <div className='textInput'>
                {/* <form onSubmit={submitMessage}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={event => setMessageInput(event.target.value)}
                        required />
                </form > */}
                <form className="messageInput" onSubmit={submitMessage}>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Message"
                            aria-label="Message"
                            aria-describedby="basic-addon2"
                            value={messageInput}
                            onChange={event => setMessageInput(event.target.value)}
                            required
                        />
                        <InputGroup.Append>
                            <Button onClick={submitMessage} variant="primary">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
                {/* <button onClick={submitMessage} className="Button1" type="button">
                    Send
                </button> */}
            </div>
            <div ref={messagesEndRef} />

        </div>
    );
}
