import React from "react";
import Board from "./Board";
import styled from 'styled-components'

const RetryButton = styled.button`
    box-sizing: border-box;
    padding: 0.5rem 2rem;
    border-radius: .5rem;
    display: block;
    margin: 0.5rem;
    height: 3rem;
    background: transparent;
    border: .2rem solid rgb(95, 217, 250);
    cursor: pointer;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: rgb(95, 217, 250);
    display: ${props => props.winner ? 'inline-block' : 'none'};
    transition: .2s;
    outline: none;
    &:hover {
        color: rgb(41,40,61);
        background: rgb(95, 217, 250);
    }
`

const QuitButton = styled(RetryButton)`
    display: inline-block;
    background: rgb(255, 150, 150);
    color: white;
    border: none;
    &:hover {
        color: white;
        background: rgb(255, 109, 109);
    }
`

const PlayerName = styled.span`
    transition: 1s;
    font-size: 3rem;
    color: ${props => props.color}
`

const Playmark = styled.span`
    transition: 1s;
    color: ${props => props.color}
`

const Status = styled.div`
    color: white;
    font-size: 1.5rem;
`

const MainPage = ({ pageOpen, xIsNext, winner, squares, handleClick, retryGame, quitGame, currentMark }) => {

    if (pageOpen !== "MainPage") return null

    let status;
    let playerName;
    if (winner) {
        status = 'Winner:'
        playerName = winner
    } else {
        status = 'Next player:'
        playerName = xIsNext ? 'X' : 'O'
    }

    const selectColor = player => {
        if (player === "X") {
            return 'rgb(73, 192, 137)'
        } else if (player === "O") {
            return 'rgb(198, 92, 98)'
        } else {
            return 'orange'
        }
    }

    return (
        <>
            <Board
                squares={squares}
                onClick={(i) => handleClick(i)}
                winner={winner}
            />
            <Status>You play <Playmark color={selectColor(currentMark)}>{currentMark}</Playmark></Status>
            <Status>{status} <PlayerName color={selectColor(playerName)}>{playerName}</PlayerName></Status>
            <RetryButton winner={winner} onClick={retryGame}>Retry</RetryButton>
            <QuitButton onClick={quitGame}>Quit game</QuitButton>
        </>
    );
}

export default MainPage