import React from "react";

export default function MessageInstance(props) {

    return (
        <div>
            <div>
                {props.userName}
            </div>
            <div>
                {props.message}
            </div>
        </div>
    );
}