import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import { selectUser } from "../store/user/selectors";
import { selectSender } from "../store/chats/selectors";
import '../styles/chat.css'
import Messages from "../components/Messages"
import socket from "../socket"


import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


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
        if (messageInput !== '') {
            const message = {
                user: user,
                receiver: receiver,
                text: messageInput,
            }

            setMessageInput('')
            socket.emit('newMessage', message);
        }
    }

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
            </div>
            <div ref={messagesEndRef} />

        </div>
    );
}
