import React from "react";
require('../styles/message.css');

export default function MessageInstance(props) {
    return (
        <div className={`message ${props.from}`}>
            <div className={`userName ${props.from}`}>
                {props.userName}
            </div>
            <div className={`message-body ${props.from}`}>
                {props.message}
            </div>
        </div>
    );
}