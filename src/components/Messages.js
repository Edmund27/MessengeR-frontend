import React from "react";
import MessageInstance from "./MessageInstance"
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import { selectUser } from "../store/user/selectors";
import { selectSender } from "../store/chats/selectors";
require('../styles/general.css');

export default function Messages() {
    const messages = useSelector(selectMessages);
    const user = useSelector(selectUser)
    const sender = useSelector(selectSender)
    console.log("SENDER NAME", sender)
    const userId = user.id
    let received = false
    let senderName



    return (
        <div className='homeContainer'>
            {messages.map((message, id) => {
                if (userId === message.senderId) {
                    received = false
                    senderName = user.name
                } else {
                    received = true
                    senderName = sender.name
                }

                return (
                    <MessageInstance
                        key={id}
                        username={senderName}
                        message={message.text}
                        received={received}
                    />
                )
            })
            }
        </div>
    );
}