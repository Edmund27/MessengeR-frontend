import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import socket from '../socket'
import { selectUsers } from "../store/users/selectors";
import { selectUser } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setSenderName } from "../store/chats/actions";
require('../styles/general.css');


export default function Home() {
    const users = useSelector(selectUsers)
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);




    // const openChat = (receiver) => {
    //     console.log('hello', receiver)
    // }

    // const openChat(receiver) {
    //     console.log("GOING TO TEXT USER:", receiver)
    // }

    const openChat = (receiver) => {
        const usersObject = {
            user: currentUser,
            receiver: receiver
        }
        console.log('messagesSelector:', usersObject)
        socket.emit('chat', usersObject)
        dispatch(setSenderName(receiver));
    }


    return (
        <div>
            {users.map((user) => {
                return (
                    <p key={user.id}>
                        <Link to="/chat-screen">
                            <button onClick={() => openChat(user)} class="Button1" type="button">
                                {user.name}
                            </button>
                        </Link>
                        {/* <Link to="/chat-screen">
                            {user.name}
                        </Link> */}
                    </p>
                )
            })}
        </div>
        // <div className='secondContainer'>
        //     <h4>Friends online:</h4>
        //     <p><Link to="/chat-screen">Donald
        //     </Link></p>
        //     <p><Link to="/chat-screen">Barrack
        //     </Link></p>
        //     <h4>Friends offline:</h4>
        //     <p><Link to="/chat-screen">Hillary
        //     </Link></p>
        //     <p><Link to="/chat-screen">George
        //     </Link></p>
        //     <h4 className='thirdContainer'><Link to="/add-friend">Add friend
        //     </Link></h4>
        // </div>
    );
}