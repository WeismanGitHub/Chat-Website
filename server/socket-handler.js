const { getAllUsersInRoom } = require('./helpers')
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// No need to sanitize input because jsx is automatically sanitized.
function socketHandler(socket) {
    const token = cookie.parse(socket.handshake.headers.cookie ?? "").token
    const { name, _id } = jwt.verify(token, process.env.JWT_SECRET)
        
    socket.on('join_room', async (data) => {
        const roomId = data.roomId
        socket.join(roomId)

        socket.to(roomId).emit('receiveMessage', { userName: name, message: ' joined!' });
    })

    socket.on('update_users', async (data) => {
        const roomId = data.roomId
        const users = await getAllUsersInRoom(roomId)
        .catch(err => {
            if (err.message == 'Room has been deleted.') {
                return
            } else {
                console.log(err.message)
            }
        })

        socket.to(roomId).emit('sendAllUsers', users)
    })

    socket.on('send_message', (data) => {
        console.log(data.token)
        delete data.token
        socket.to(data.roomId).emit('receiveMessage', {...data, userName: name });
    });

    socket.on('leave_room', async (data) => {
        const roomId = data.roomId
        delete data.token
        socket.to(roomId).emit('receiveMessage', { userName: name, message: 'Left!' })
        socket.leave(roomId)
    })
}

module.exports = socketHandler