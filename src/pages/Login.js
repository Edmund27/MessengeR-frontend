import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setUsername } from '../store/user/actions.js';
import { useDispatch } from "react-redux";
require('../styles/general.css');


export default function Login() {
    const [usernameInput, setUsernameInput] = useState('')
    const dispatch = useDispatch();

    const submitUsername = (e) => {
        console.log('messagesSelector:', usernameInput)

        dispatch(setUsername(usernameInput))
    }


    return (
        <div className='container'>
            <h4>Your nickname</h4>
            <form >
                <input
                    type="text"
                    value={usernameInput}
                    onChange={event => setUsernameInput(event.target.value)}
                    required />
            </form>
            <Link to="/chat-screen">
                <button onClick={submitUsername} class="Button1" type="button">
                    Submit
                </button>
            </Link>
        </div>
    );
}

