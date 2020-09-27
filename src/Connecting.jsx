import React from "react";

const Connecting = ({ pageOpen }) => {

    if (pageOpen !== "Connecting") return null

    return (
        <>
            <div style={{ color: 'white' }}><h2>Connecting...</h2></div>
        </>
    );
}

export default Connecting