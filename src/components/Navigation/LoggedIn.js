import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import socket from "../../socket";

export default function LoggedIn() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    function logOutHandler(e) {
        window.location.reload(true);
        //e.preventDefault();
        socket.disconnect()
        //dispatch(disconnectSocket())
        dispatch(logOut())
    }

    //dispatch(logOut()), dispatch(disconnectSocket()



    return (
        <>
            <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
            <Button onClick={logOutHandler}>Logout</Button>
            {/* dispatch(logOut()), dispatch(disconnectSocket())}>Logout</Button> */}
        </>
    );
}
