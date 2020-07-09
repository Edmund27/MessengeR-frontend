import React from "react";
require('../styles/message.css');

export default function MessageInstance(props) {
    //console.log('should render on the right?', props.received === true)

    let from
    props.received ? from = 'him' : from = 'me'
    //console.log('From who?', from)
    const timeArray = props.time.split(/[ T.:|]+/)

    return (
        <div className={`message ${from}`}>
            <div className={`username ${from}`}>
                <img
                    width="30" height="30"
                    src={props.imageUrl}
                    alt="profile" />
                {/* {props.username} */}
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