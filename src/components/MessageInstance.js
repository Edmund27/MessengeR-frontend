import React from "react";
require('../styles/message.css');

export default function MessageInstance(props) {
    //console.log('should render on the right?', props.received === true)

    let from
    props.received ? from = 'him' : from = 'me'
    //console.log('From who?', from)

    return (
        <div className={`message ${from}`}>
            <div className={`username ${from}`}>
                {props.username}
            </div>
            <div className={`message-body ${from}`}>
                {props.message}
            </div>
        </div>
    );
}