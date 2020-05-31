const express = require('express')
const socket = require('socket.io')

//App setup
const app = express()

//controller imports
const { multiplayerRouter } = require('./controllers/multiplayer')

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('listening to requests on port 3000')
})

app.use(express.json())

//Static files
app.use(express.static(__dirname + "/public"))

app.set('view engine', 'hbs')

app.use('/', multiplayerRouter)

//Socket setup
const io = socket(server)

io.on('connection', (socket) => {
    console.log(`${socket.id} made connection`)

    socket.on('play', () => {
        console.log("Play has been clicked")
        io.sockets.emit('play')
    })
    socket.on('addRows', (data) => {
        socket.broadcast.emit('addRows', data)
    })
    socket.on('updateSocket', (data) => {
        socket.broadcast.emit('updateSocket', data)
    })
    socket.on("gameOver", () => {
        socket.broadcast.emit('gameOver')
    })
})