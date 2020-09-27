const WebSocket = require("ws")
const uniqid = require("uniqid")

const server = new WebSocket.Server({ port: 4000 }, () => console.log('Server started...'))

class Game {
    constructor(id, playerX) {
        this.id = id
        this.openToEnter = true
        this.playerX = playerX
        this.gameProcess = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: false
        }
    }

    calculateWinner = () => {
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
            if (this.gameProcess.squares[a] && this.gameProcess.squares[a] === this.gameProcess.squares[b] && this.gameProcess.squares[a] === this.gameProcess.squares[c]) {
                this.gameProcess.winner = this.gameProcess.squares[a];
            }
        }
        const emptySquare = this.gameProcess.squares.find(item => item === null)
        if (emptySquare === undefined) this.gameProcess.winner = 'friendship'
    }
}

let games = []

server.on('connection', ws => {
    ws.id = uniqid()
    const response = {
        id: ws.id
    }
    ws.send(JSON.stringify(response))

    ws.on('message', clientPayload => {
        const payload = JSON.parse(clientPayload)

        if (payload.method === "create") {
            // creating new game
            const game = new Game(uniqid(), ws.id)

            games.push(game)
            ws.send(JSON.stringify({ gameId: game.id }))
        }

        if (payload.method === "join") {
            // join the game
            let foundSuchGame = false
            games.forEach(g => {
                if (g.id === payload.idFromURL && g.openToEnter) {
                    g.playerO = ws.id
                    g.openToEnter = false
                    server.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN && (client.id === g.playerX || client.id === g.playerO)) {
                            client.send(JSON.stringify({ message: 'confirmed', gameId: g.id }))
                            client.gameId = g.id
                        }
                    })
                    foundSuchGame = true
                }
            })
            if (!foundSuchGame) ws.send(JSON.stringify({ message: 'noGameFound' }))
        }

        if (payload.method === "play") {
            // paying the game
            games.forEach(g => {
                if (g.id === payload.gameId) {
                    const playerMark = g.playerX === ws.id ? 'X' : 'O'
                    if (!g.gameProcess.winner && !g.gameProcess.squares[payload.i]) {
                        if (g.gameProcess.xIsNext && playerMark === 'X' || !g.gameProcess.xIsNext && playerMark === 'O') {
                            g.gameProcess.squares[payload.field] = playerMark

                            g.gameProcess.xIsNext = !g.gameProcess.xIsNext
                            g.calculateWinner()

                            server.clients.forEach(client => {
                                if (client.readyState === WebSocket.OPEN && (client.id === g.playerX || client.id === g.playerO)) {
                                    client.send(JSON.stringify({ gameProcess: g.gameProcess }))
                                }
                            })
                        }
                    }
                }
            })
        }

        if (payload.method === "retry") {
            // restart the game
            games.forEach(g => {
                if (g.id === payload.gameId) {
                    if (g.gameProcess.winner) {

                        g.gameProcess = {
                            squares: Array(9).fill(null),
                            xIsNext: true,
                            winner: false
                        }

                        server.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN && (client.id === g.playerX || client.id === g.playerO)) {
                                client.send(JSON.stringify({ gameProcess: g.gameProcess }))
                            }
                        })
                    }
                }
            })
        }

        if (payload.method === "quit") {
            // quit the game
            games.forEach((g, index, array) => {
                if (g.id === payload.gameId) {
                    games = array.filter(game => game.id !== payload.gameId)

                    server.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN && (client.id === g.playerX || client.id === g.playerO)) {
                            client.send(JSON.stringify({ message: 'gameOver' }))
                            client.gameId = ''
                        }
                    })
                }
            })
        }
    })

    // ws.on('close', () => {
    //     if (ws.gameId) {
    //         games.forEach((g, index, array) => {
    //             if (g.id === ws.gameId) {
    //                 games = array.filter(game => game.id !== g.id)
    //
    //                 server.clients.forEach(client => {
    //                     if (client.readyState === WebSocket.OPEN && (client.id === g.playerX || client.id === g.playerO)) {
    //                         client.send(JSON.stringify({ message: 'gameOver' }))
    //                         client.gameId = ''
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // })
})