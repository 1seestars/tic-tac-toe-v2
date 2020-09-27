import React from "react";
import styled from 'styled-components'

const Button = styled.button`
    padding: 0.5rem 2rem;
    border-radius: .5rem;
    display: block;
    margin: 1rem auto;
    background: rgb(255, 150, 150);
    border: none;
    cursor: pointer;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    transition: .2s;
    outline: none;
    &:hover {
        background: rgb(255, 109, 109);
    }
`

const StartPage = ({ pageOpen, createNewGame, gameId, copyInvitationURL, playWithComputer }) => {

    if (pageOpen !== "StartPage") return null

    return (
        <>
            <h2 style={{ fontSize: "10vw" }}>
                <span style={{ color: "rgb(73, 192, 137)"}}>TIC</span>
                <span style={{ color: "white"}}>-</span>
                <span style={{ color: "orange"}}>TAC</span>
                <span style={{ color: "white"}}>-</span>
                <span style={{ color: "rgb(198, 92, 98)"}}>TOE</span>
            </h2>
            {gameId
                ? <Button onClick={copyInvitationURL}>Copy invitation link</Button>
                : <Button onClick={createNewGame}>Create new online game</Button>
            }
            <span style={{ color: "white"}}>- or -</span>
            <Button onClick={playWithComputer}>Play with the computer</Button>
        </>
    );
}

export default StartPage