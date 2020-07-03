import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setUsername, setUser } from '../store/user/actions.js';
import { setPassword } from '../store/user/actions.js';
import { useDispatch } from "react-redux";
import socket from '../socket'

require('../styles/general.css');



export default function Login() {
    const [nameInput, setNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const dispatch = useDispatch();

    const submitUser = (e) => {
        console.log('messagesSelector:', nameInput, passwordInput)
        const credentials = {
            name: nameInput,
            password: passwordInput
        }
        socket.emit('newUser', credentials)
        // dispatch(setUser({
        //     username: usernameInput,
        //     password: passwordInput
        // }))
    }


    return (
        <div className='container'>
            <h4>Log In</h4>
            <form >
                <label>
                    Name:
                <input
                        type="text"
                        value={nameInput}
                        onChange={event => setNameInput(event.target.value)}
                        required />
                </label>
            </form>

            <form >
                <label>
                    Password:
                <input
                        type="password"
                        value={passwordInput}
                        onChange={event => setPasswordInput(event.target.value)}
                        required />
                </label>
            </form>

            <Link to="/home">
                <button onClick={submitUser} class="Button1" type="button">
                    Submit
                </button>
            </Link>
        </div>
    );
}

