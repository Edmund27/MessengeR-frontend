import React from "react";
require('../styles/message.css');

export default function MessageInstance(props) {
    let from
    props.received ? from = 'him' : from = 'me'
    const timeArray = props.time.split(/[ T.:|]+/)

    return (
        <div className={`message ${from}`}>
            <div className={`username ${from}`}>
                <img
                    className="avatar"
                    width="30" height="30"
                    src={props.imageUrl}
                    alt="profile" />

            </div>
            <div className={`message-body ${from}`}>
                {props.message}
                <div className="message-time" >
                    {timeArray[1] + ":" + timeArray[2]}
                </div>
            </div>
        </div>
    );
}