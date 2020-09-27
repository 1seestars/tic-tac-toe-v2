import React from "react";
import MainPage from "./MainPage";
import StartPage from "./StartPage";
import NotFoundPage from "./NotFoundPage";
import ReadySteadyGo from "./ReadySteadyGo";
import Connecting from "./Connecting";
import styled from 'styled-components'

const URL = "http://localhost:3000/"

const Container = styled.div`
box-sizing: border-box;
    margin: 8rem 0 0;
    text-align: center;
`

class Game extends React.Component {
    ws = new WebSocket('ws://localhost:4000')

    state = {
        id: '',
        gameId: '',
        pageOpen: "Connecting",
        currentMark: '',
        withComputer: false,
        gameProcess: {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: false
        }
    }

    componentDidMount() {
        this.ws.onopen = () => {
            const idFromURL = window.location.pathname.slice(1, window.location.pathname.length)
            if (idFromURL) {
                this.sendToServer({ method: 'join', idFromURL })
                this.setState(state => ({ ...state, currentMark: 'O' }))
            } else {
                this.setState(state => ({
                    ...state, pageOpen: "StartPage"
                }))
            }
        }
    }

    sendToServer = (value) => {
        this.ws.send(JSON.stringify(value))
    }

    retryGame = () => {
        if (this.state.withComputer) {
            this.setState(state => ({
                ...state, gameProcess: {
                    ...state.gameProcess,
                    squares: Array(9).fill(null),
                    winner: ''
                }
            }))
        } else {
            this.sendToServer({ method: "retry", gameId: this.state.gameId })
        }
    }

    quitGame = () => {
        if (this.state.withComputer) {
            this.setState(state => ({
                ...state,
                gameId: '',
                currentMark: '',
                withComputer: false,
                gameProcess: {
                    squares: Array(9).fill(null),
                    xIsNext: true,
                    winner: false
                },
                pageOpen: "StartPage"
            }))
        } else {
            this.sendToServer({ method: "quit", gameId: this.state.gameId })
        }
    }

    handleClick = (i) => {
        if (this.state.withComputer) {
            if (this.state.gameProcess.winner || this.state.gameProcess.squares[i]) {
                return;
            }

            const squares = this.state.gameProcess.squares
            squares[i] = 'X'
            this.setState(state => ({ ...state, squares }))

            if (!this.setWinner(squares)) this.computerPlayer(squares)
        } else {
            this.sendToServer({ method: "play", gameId: this.state.gameId, field: i })
        }
    }

    createNewGame = () => {
        this.sendToServer({ method: 'create' })
        this.setState(state => ({ ...state, currentMark: 'X' }))
    }

    copyInvitationURL = () => {
        navigator.clipboard.writeText(URL + this.state.gameId)
            .then(() => alert("Invitation link copied"))
            .catch(err => alert(err))
    }

    changePage = page => {
        this.setState(state => ({
            ...state, pageOpen: page
        }))
    }

    playWithComputer = () => {
        this.setState(state => ({
            ...state, withComputer: true, pageOpen: "ReadySteadyGo", currentMark: 'X'
        }))
    }

    computerPlayer = squares => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const linesArray = []

        for (let i = 0; i < lines.length; i++) {

            let xCounter = 0
            let oCounter = 0
            let emptyField = false

            lines[i].forEach(item => {
                if (squares[item] === "O") {
                    ++oCounter
                } else if (squares[item] === "X") {
                    ++xCounter
                } else {
                    emptyField = item
                }
            })
            linesArray.push({ oCounter, xCounter, line: i, emptyField })
        }

        const possibleMoves = {}

        for (let i = 0; i < linesArray.length; i++) {
            if (linesArray[i].xCounter === 2 && linesArray[i].emptyField !== false) {
                possibleMoves.withTwoX = linesArray[i].emptyField
            } else if (linesArray[i].oCounter === 2 && linesArray[i].emptyField !== false) {
                possibleMoves.withTwoO = linesArray[i].emptyField
            } else if (linesArray[i].oCounter === 1 && linesArray[i].emptyField !== false) {
                possibleMoves.withOneO = linesArray[i].emptyField
            }
        }

        const possibleMovesArray = [possibleMoves.withTwoO, possibleMoves.withTwoX, possibleMoves.withOneO]

        for (const move of possibleMovesArray) {
            if (move !== undefined) {
                squares[move] = "O"
                this.setWinner(squares)
                return
            }
        }

        const randomNumber = () => {
            if (!squares[4]) return 4
            const num = Math.round(Math.random() * 10)
            if (num > 8 || num%2 !== 0 || squares[num]) {
                return randomNumber()
            }
            return num
        }
        squares[randomNumber()] = "O"
    }

    calculateWinner = squares => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        const emptySquare = squares.find(item => item === null)
        if (emptySquare === undefined) {
            return 'friendship'
        }
        return null
    }

    setWinner = squares => {
        if (this.calculateWinner(squares)) {
            this.setState(state => ({
                ...state, gameProcess: {
                    ...state.gameProcess,
                    winner: this.calculateWinner(squares)
                }
            }))
            return true
        } else {
            return false
        }
    }

    render() {
        this.ws.onmessage = response => {
            const res = JSON.parse(response.data)
            if (res.id) this.setState(state => ({
                ...state, id: res.id
            }))

            if (res.gameId) this.setState(state => ({
                ...state, gameId: res.gameId
            }))

            if (res.message && res.message === "confirmed") {
                this.changePage("ReadySteadyGo")
            }

            if (res.message && res.message === "noGameFound") {
                this.changePage("NotFoundPage")
            }

            if (res.gameProcess) {
                this.setState(state => ({
                    ...state, gameProcess: res.gameProcess
                }))
            }

            if (res.message && res.message === "gameOver") {
                this.setState(state => ({
                    ...state,
                    gameId: '',
                    currentMark: '',
                    withComputer: false,
                    gameProcess: {
                        squares: Array(9).fill(null),
                        xIsNext: true,
                        winner: false
                    },
                    pageOpen: "StartPage"
                }))
            }
        }

        return (
            <Container>
                <Connecting
                    pageOpen={this.state.pageOpen}
                />
                <StartPage
                    pageOpen={this.state.pageOpen}
                    createNewGame={this.createNewGame}
                    gameId={this.state.gameId}
                    copyInvitationURL={this.copyInvitationURL}
                    playWithComputer={this.playWithComputer}
                />
                <MainPage
                    pageOpen={this.state.pageOpen}
                    xIsNext={this.state.gameProcess.xIsNext}
                    squares={this.state.gameProcess.squares}
                    handleClick={this.handleClick}
                    retryGame={this.retryGame}
                    quitGame={this.quitGame}
                    winner={this.state.gameProcess.winner}
                    currentMark={this.state.currentMark}
                />
                <NotFoundPage
                    pageOpen={this.state.pageOpen}
                    changePage={this.changePage}
                />

                <ReadySteadyGo
                    pageOpen={this.state.pageOpen}
                    changePage={this.changePage}
                />
            </Container>
        )
    }
}

export default Game