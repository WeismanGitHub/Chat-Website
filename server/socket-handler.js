const { getAllUsersInRoom, removeUserFromRoom } = require('./helpers')
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// No need to sanitize input because jsx is automatically sanitized.
function socketHandler(socket) {
    try {
        const { token } = cookie.parse(socket.handshake.headers.cookie ?? "")
        const { name, _id } = jwt.verify(token, process.env.JWT_SECRET)
            
        socket.on('join_room', async (data) => {
            console.log('join_room')
            const roomId = data.roomId
            socket.join(roomId)

            const users = await getAllUsersInRoom(roomId)
            socket.to(roomId).emit('send_users', users)
            socket.to(roomId).emit('receive_message', { userName: name, message: ' joined!' });
        })
    
        socket.on('update_users', async (data) => {
            console.log('update_users')
            const roomId = data.roomId
            const users = await getAllUsersInRoom(roomId)

            console.log(roomId, users)
            socket.to(roomId).emit('send_users', users)
        })
    
        socket.on('send_message', (data) => {
            console.log('send_message')
            socket.to(data.roomId).emit('receive_message', {...data, userName: name });
        });
    
        socket.on('leave_room', async (data) => {
            const roomId = data.roomId
            const roomExists = await removeUserFromRoom(roomId, _id)

            if (roomExists) {
                const users = await getAllUsersInRoom(roomId)
                socket.to(roomId).emit('send_users', users)
                socket.to(roomId).emit('receive_message', { userName: name, message: 'Left!' })
            }
            
            socket.leave(roomId)
        })
    } catch(err) {
        console.log(err)
    }
}

module.exports = socketHandler