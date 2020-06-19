import React from "react";
import MessageInstance from "./MessageInstance"

export default function Messages(props) {

    return (
        <div>
            {props.messages.map((message, id) => {
                return (
                    <MessageInstance
                        key={id}
                        userName={message.userName}
                        message={message.message}
                        from={message.from}
                    />
                )
            })
            }
        </div>
    );
}