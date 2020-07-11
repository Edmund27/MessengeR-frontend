import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import { selectUser } from "../store/user/selectors";
import { selectOnlineUsers } from "../store/users/selectors";
import { selectSender } from "../store/chats/selectors";
import '../styles/chat.css'
import Messages from "../components/Messages"
import socket from "../socket"

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


export default function ChatScreen() {
    const [messageInput, setMessageInput] = useState('')
    const [showEmojis, setShowEmojis] = useState(false)
    const allMessages = useSelector(selectMessages);
    const user = useSelector(selectUser);
    const receiver = useSelector(selectSender);
    const onlineUsers = useSelector(selectOnlineUsers);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    const onlineToggle = onlineUsers.includes(receiver.id.toString()) ? <div className="onlineChat">●</div> : <div className="offlineChat">●</div>

    useEffect(scrollToBottom, [allMessages]);

    const addEmoji = e => {
        let emoji = e.native;
        setMessageInput(messageInput + emoji)
        setShowEmojis(false)
    };

    const submitMessage = (e) => {
        e.preventDefault()
        if (messageInput) {
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
                        className="avatar"
                    >
                    </img>

                    {receiver.name}
                    {onlineToggle}

                </Card.Body>
            </Card>
            <Messages />

            <div className='textInput'>
                {/* <span><Picker onSelect={addEmoji} /> </span> */}
                <form className="messageInput" onSubmit={submitMessage}>
                    <InputGroup className="mb-1">
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
                            {showEmojis ? (
                                <div>
                                    <span style={styles.emojiPicker} >
                                        {/* ref={el => setEmojiPicker(el)} */}
                                        <Picker
                                            onSelect={addEmoji}
                                            emojiTooltip={true}
                                            title="MessengeR"
                                        />
                                    </span>
                                    <Button onClick={event => setShowEmojis(false)} variant="secondary">{String.fromCodePoint(0x1f60a)}</Button>
                                </div>
                            ) : (
                                    // <p style={styles.getEmojiButton} onClick={event => setShowEmojis(true)}>
                                    //     {String.fromCodePoint(0x1f60a)}
                                    // </p>
                                    <Button onClick={event => setShowEmojis(true)} variant="primary">{String.fromCodePoint(0x1f60a)}</Button>
                                )}
                        </InputGroup.Append>

                        <InputGroup.Append>
                            <Button style={styles.sendButton} onClick={submitMessage} variant="primary">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
            </div>
            <div ref={messagesEndRef} />

        </div>
    );
}



const styles = {
    getEmojiButton: {
        cssFloat: "right",
        border: "none",
        margin: 0,
        cursor: "pointer"
    },
    emojiPicker: {
        position: "absolute",
        bottom: 30,
        right: 0,
        cssFloat: "right",
        // marginLeft: "200px"
    },
};
