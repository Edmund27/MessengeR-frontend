import React from "react";
import MessageInstance from "./MessageInstance"
import { useSelector } from "react-redux";
import { selectClientId } from "../store/user/selectors";
import { selectMessages } from "../store/chat/selectors";

export default function Messages(props) {
    const messages = useSelector(selectMessages);
    const clientId = useSelector(selectClientId);
    console.log('message', messages)
    let received = false


    return (
        <div>
            {messages.map((message, id) => {
                if (clientId === message.clientId) {
                    received = false
                } else {
                    received = true
                }
                return (
                    <MessageInstance
                        key={id}
                        username={message.username}
                        message={message.message}
                        received={received}
                    />
                )
            })
            }
        </div>
    );
}