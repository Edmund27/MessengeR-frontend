import React from "react";
import MessageInstance from "./MessageInstance"

export default function Messages(props) {

    return (
        <div>
            {props.messages.map((message, id) => {
                return (
                    <MessageInstance
                        key={id}
                        username={message.username}
                        message={message.message}
                        received={message.received}
                    />
                )
            })
            }
        </div>
    );
}