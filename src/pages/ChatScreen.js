import React, { useState, useEffect } from "react";
import Messages from "../components/Messages";
//import ChatInput from "../components/ChatInput";

import io from "socket.io-client";
const socket = io.connect(`http://localhost:4000`);



export default class ChatScreen extends React.Component {
    client = null
    username = ''
    state = {
        messages: [],
        input: ''
    }

    componentDidMount() {
        this.client = io.connect(`http://localhost:4000`);
        //console.log('Client id:', this.client.id)
        this.client.on('chat', (message) => {
            //console.log('Client id:', this.client.id)
            //console.log('Message Client id:', message.clientId)

            console.log('onChat', message)
            if (this.client.id === message.clientId) {
                return
            } else {
                this.setState({
                    ...this.state,
                    messages: [
                        ...this.state.messages,
                        {
                            ...message,
                            received: true
                        }
                    ]
                })
                //console.log('State', this.state.messages)
            }
        })
    }

    onInputChange = (event) => {
        this.setState({
            ...this.state,
            input: event.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const message = {
            username: 'username',
            message: this.state.input,
            clientId: this.client.id,
        }

        this.setState({
            ...this.state,
            input: '',
            messages: [
                ...this.state.messages,
                message,
            ]
        })

        socket.emit('chat', message)
    }

    render() {
        return (
            <div>
                <h4>MessengeR</h4>
                <Messages messages={this.state.messages} />
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={this.state.input}
                        onChange={this.onInputChange}
                        required />
                </form>
            </div>
        )
    }
}



// export default function ChatScreen(props) {
//     const [userName, setUserName] = useState('')
//     const [messageInput, setMessageInput] = useState('')
//     const [messagesState, setMessagesState] = useState([
//         {
//             id: 1,
//             userName: 'Michael',
//             message: 'Hey, how are you',
//             from: 'him'
//         },
//         {
//             id: 2,
//             userName: 'Edmund',
//             message: 'I am good, what about you?',
//             from: 'me'
//         }
//     ]);
//     console.log('onRender', messagesState)

//     //setUserName(props.userName)

//     // const socket = io.connect(`http://localhost:4000`);
//     //     socket.on('chat', data => {
//     //         addMessage(data)
//     //     })


//     useEffect(() => {
//         console.log('registering chat event handler')
//         const handleChatEvent = (obj, state, setter) => {
//             setter([...state, obj])
//         }

//         socket.on('chat', messageObject => {
//             console.log('MessageObject: ', messageObject)
//             handleChatEvent(messageObject, messagesState, setMessagesState)
//             // console.log('onChat', messagesState, messageObject)
//             // addMessage(messageObject)


//             //console.log("SUCCESS:", messageObject.message)
//             // const messagesState = [messagesState + messageObject]
//             // //setMessagesState([...messagesState, messageObject])

//             // console.log('II:', messagesState)
//             //addMessage(data)
//         }, [])

//     }, [])

//     let clientSocketId
//     const sendMessage = (event) => {
//         event.preventDefault();
//         clientSocketId = socket.id;
//         // console.log('clientID:', clientSocketId)
//         const messageObject = {
//             userName: 'Edmund',
//             message: messageInput,
//             clientId: clientSocketId,
//         }
//         socket.emit('chat', messageObject)
//         setMessagesState([...messagesState, messageObject])
//         setMessageInput('')
//         console.log('sendMessage', messageObject)

//         // messageObject.from = 'me'
//         // console.log(messageObject)
//         //addMessage(messageObject)
//     }




//     function addMessage(messageObject) {
//         console.log('addMessage', messagesState)

//         const { userName, message, clientId } = messageObject
//         messageObject.from = (clientId === socket.id) ? 'him' : 'me'
//         setMessagesState([...messagesState, messageObject])
//     }



//     return (
//         <div>
//             <h4>MessengeR</h4>
//             <Messages messages={messagesState} />
//             <form onSubmit={sendMessage}>
//                 <input
//                     type="text"
//                     value={messageInput}
//                     onChange={event => setMessageInput(event.target.value)}
//                     required />
//             </form>
//         </div>
//     );
// }
