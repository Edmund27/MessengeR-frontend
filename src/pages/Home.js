import React from "react";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import socket from '../socket'
import { selectUsers, selectOnlineUsers } from "../store/users/selectors";
import { selectUser } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setSenderName } from "../store/chats/actions";
import { useHistory } from "react-router-dom";
require('../styles/general.css');


export default function Home() {
    const users = useSelector(selectUsers)
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const onlineUsers = useSelector(selectOnlineUsers)
    const history = useHistory()


    //const intOnlineUsers = onlineUsers.split(',').map(Number);
    //console.log("ONLINE USERS", onlineUsers)

    const openChat = (receiver) => {
        history.push('/chat-screen')
        const usersObject = {
            user: currentUser,
            receiver: receiver
        }
        socket.emit('chat', usersObject)
        dispatch(setSenderName(receiver));
    }

    const homePageRender = <div>
        <ListGroup >
            {users.map((user) => {
                return (
                    <ListGroup.Item variant="primary" key={user.id} as="li" action onClick={() => openChat(user)}>
                        <img
                            className="avatar"
                            variant="top"
                            src={user.imageUrl}
                            width="100" height="60"
                            alt="profile"
                        >
                        </img>
                        {user.name}
                        {onlineUsers.map((u) => {
                            const onlineDot = u === user.id.toString() ?
                                <Spinner key={u} animation="grow" variant="success" size="sm" /> : null
                            //<div className="online" key={u}>●</div> : null
                            return onlineDot
                        })}

                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    </div>





    return (
        <div>
            {homePageRender}
        </div>
    );
}