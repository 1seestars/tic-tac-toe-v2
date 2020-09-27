import React from "react";
import MainPage from "./MainPage";
import StartPage from "./StartPage";
import NotFoundPage from "./NotFoundPage";
import ReadySteadyGo from "./ReadySteadyGo";

const URL = "http://localhost:3000/"

class Game extends React.Component {
    ws = new WebSocket('ws://localhost:4000')

    state = {
        id: '',
        gameId: '',
        pageOpen: "StartPage",
        gameProcess: {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: false
        }
    }

    componentDidMount() {
        this.ws.onopen = () => {
            const idFromURL = window.location.pathname.slice(1, window.location.pathname.length)
            if (idFromURL) this.sendToServer({ method: 'join', idFromURL })
        }
    }

    sendToServer(value) {
        this.ws.send(JSON.stringify(value))
    }

    retryGame() {
        this.sendToServer({
            squares: Array(9).fill(null),
            xIsNext: true
        })
    }

    handleClick(i) {
        console.log(this)
        this.sendToServer({ method: "play", gameId: this.state.gameId, field: i })
        // if (this.state.gameProcess.winner || this.state.gameProcess.squares[i]) {
        //     return;
        // }
        //
        // const squares = this.state.squares
        // squares[i] = this.state.xIsNext ? 'X' : 'O'
        // this.sendToServer({ ...this.state, xIsNext: !this.state.xIsNext })
    }

    // calculateWinner(squares) {
    //     const lines = [
    //         [0, 1, 2],
    //         [3, 4, 5],
    //         [6, 7, 8],
    //         [0, 3, 6],
    //         [1, 4, 7],
    //         [2, 5, 8],
    //         [0, 4, 8],
    //         [2, 4, 6],
    //     ];
    //     for (let i = 0; i < lines.length; i++) {
    //         const [a, b, c] = lines[i];
    //         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //             return squares[a];
    //         }
    //     }
    //     const emptySquare = squares.find(item => item === null)
    //     if (emptySquare === undefined) return 'friendship'
    //     return null;
    // }

    createNewGame = () => {
        const payload = {
            method: 'create'
        }

        this.sendToServer(payload)
    }

    copyInvitationURL = () => {
        navigator.clipboard.writeText(URL + this.state.gameId)
            .then(() => alert("Invitation link copied"))
            .catch(err => alert(err))
    }

    changePage = (page) => {
        this.setState(state => ({
            ...state, pageOpen: page
        }))
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
        }

        return (
            <div>
                <StartPage
                    pageOpen={this.state.pageOpen}
                    createNewGame={this.createNewGame}
                    gameId={this.state.gameId}
                    copyInvitationURL={this.copyInvitationURL}
                />
                <MainPage
                    pageOpen={this.state.pageOpen}
                    xIsNext={this.state.gameProcess.xIsNext}
                    squares={this.state.gameProcess.squares}
                    handleClick={this.handleClick}
                    retryGame={this.retryGame}
                    winner={this.state.gameProcess.winner}
                />
                <NotFoundPage
                    pageOpen={this.state.pageOpen}
                    changePage={this.changePage}
                />

                <ReadySteadyGo
                    pageOpen={this.state.pageOpen}
                    changePage={this.changePage}
                />
            </div>
        )
    }
}

export default Game