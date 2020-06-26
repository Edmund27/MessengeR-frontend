import React, { useState } from "react";

export default function ChatInput(props) {
    const [messageInput, setMessageInput] = useState('')

    function submitMessage(event) {
        event.preventDefault();
        props.onSend(messageInput)
        setMessageInput('')
    }

    return (
        <form onSubmit={submitMessage}>
            <input
                type="text"
                value={messageInput}
                onChange={event => setMessageInput(event.target.value)}
                required />
        </form>
    );
}