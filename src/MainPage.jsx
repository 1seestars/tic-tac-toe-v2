import React from "react";
import Board from "./Board";
import {Status} from "./styled/Status";
import {PlayerName} from "./styled/PlayerName";
import {RetryButton} from "./styled/RetryButton";

const MainPage = ({ pageOpen, xIsNext, winner, squares, handleClick, retryGame }) => {

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

    let color
    if (playerName === "X") {
        color = 'rgb(73, 192, 137)'
    } else if (playerName === "O") {
        color = 'rgb(198, 92, 98)'
    } else {
        color = 'orange'
    }

    return (
        <>
            <Board
                squares={squares}
                onClick={(i) => handleClick(i)}
                winner={winner}
            />
            <Status>{status} <PlayerName color={color}>{playerName}</PlayerName></Status>
            <RetryButton winner={winner} onClick={() => retryGame()}>Retry</RetryButton>
        </>
    );
}

export default MainPage