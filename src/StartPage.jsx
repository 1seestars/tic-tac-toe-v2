import React from "react";

const StartPage = ({ pageOpen, createNewGame, gameId, copyInvitationURL }) => {

    if (pageOpen !== "StartPage") return null

    return (
        <>
            {gameId
                ? <button onClick={copyInvitationURL}>Copy invitation link</button>
                : <button onClick={createNewGame}>Create new online game</button>
            }
            <button>Play with the computer</button>
        </>
    );
}

export default StartPage