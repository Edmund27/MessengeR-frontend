import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import socket from '../socket'
import { selectUsers, selectOnlineUsers } from "../store/users/selectors";
import { selectUser } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setSenderName } from "../store/chats/actions";
require('../styles/general.css');


export default function Home() {
    const users = useSelector(selectUsers)
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const onlineUsers = useSelector(selectOnlineUsers)

    //console.log("ONLINE USERS", onlineUsers)

    const openChat = (receiver) => {
        const usersObject = {
            user: currentUser,
            receiver: receiver
        }
        socket.emit('chat', usersObject)
        dispatch(setSenderName(receiver));
    }



    return (
        <div
            className="card-deck"
            style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}
        >
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <Card style={{ width: '10rem' }}>
                            <Card.Img
                                object-fit="cover"
                                variant="top"
                                src={user.imageUrl}
                                width="150" height="100"
                            />
                            <Card.Body>
                                <Card.Title>{user.name}
                                    {onlineUsers.map((u) => {
                                        if (u == user.id) {
                                            return <div className="online" key={u}>●</div>
                                        } else {
                                            //<div className="online" key={u}>●</div>
                                            return
                                            //<div className="offline" key={u}>●</div>
                                        }
                                    })}
                                </Card.Title>
                                <Link to="/chat-screen">
                                    <Button onClick={() => openChat(user)} variant="primary">Open Chat</Button>
                                </Link>
                            </Card.Body>

                        </Card>
                    </div>
                )
            })}
        </div>
    );
}