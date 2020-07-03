import React, { useState } from "react";
import { Link } from "react-router-dom";
import socket from '../socket'
import { selectUsers } from "../store/users/selectors";
import { useSelector } from "react-redux";
require('../styles/general.css');

export default function Home() {
    const users = useSelector(selectUsers);

    return (
        <div>
            {users.map((user) => {
                return (
                    <p key={user.id}>
                        <Link to="/chat-screen">
                            {user.name}
                        </Link>
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