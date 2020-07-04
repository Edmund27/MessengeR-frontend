import React from "react";
import MessageInstance from "./MessageInstance"
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chats/selectors";
import { selectUser } from "../store/user/selectors";
require('../styles/general.css');

export default function Messages() {
    const messages = useSelector(selectMessages);
    const user = useSelector(selectUser)
    const userId = user.id
    let received = false


    return (
        <div className='homeContainer'>
            {messages.map((message, id) => {
                if (userId === message.senderId) {
                    received = false
                } else {
                    received = true
                }
                return (
                    <MessageInstance
                        key={id}
                        username={message.senderId}
                        message={message.text}
                        received={received}
                    />
                )
            })
            }
        </div>
    );
}