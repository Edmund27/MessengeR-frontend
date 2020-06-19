import React, { useState } from "react";
import Messages from "../components/Messages";


export default function ChatScreen() {

    const [messagesState, setMessagesState] = useState([
        //seed messages
        {
            id: 1,
            userName: 'Michael',
            message: 'Hey, how are you',
            myMessage: false
        },
        {
            id: 2,
            userName: 'Edmund',
            message: 'I am good, what about you?',
            myMessage: true
        }
    ]);


    return (
        <div>
            <h4>MessengeR</h4>
            <Messages messages={messagesState} />
            <p>here you type a message</p>
        </div>
    );
}
