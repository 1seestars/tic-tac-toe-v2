import React from "react";

const NotFoundPage = ({ pageOpen, changePage }) => {

    if (pageOpen !== "NotFoundPage") return null

    return (
        <>
            <h2>Sorry, there's no game with such identifier! Please, try again or go back to home page</h2>
            <button onClick={() => changePage("StartPage")}>Home</button>
        </>
    );
}

export default NotFoundPage