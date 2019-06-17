const path = require('path')  // no need to install
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)  //express does it implicitly but for socket.io we needed this server(see below line)
const io = socketio(server)

const port = process.env.PORT || 3000
const  publicDirectoryPath = path.join(__dirname, '../public')

let count = 0

io.on('connection', (socket) => {   //socket contains info of that particular connection
    
    console.log("New websocket connection")
    
    

    socket.on('join', ({ unique_id }, callback) => {
        const {error, user} = addUser({ id: socket.id, room: unique_id })

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', 'Welcome!')
        socket.broadcast.to(unique_id).emit('message', 'A new user has joined')

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', message)
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', 'A user has left')
        }

        
    })

})


app.use(express.static(publicDirectoryPath))



server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})

