const { removeUserFromRoom, getAllUsersInRoom } = require('../helpers')
const UserSchema = require('../schemas/user-schema')
const RoomSchema = require('../schemas/room-schema')
const { StatusCodes } = require('http-status-codes')

const createRoom = async (req, res) => {
    const userId = req.user._id

    try {
        const room = await RoomSchema.create({ creatorId: userId })
        
        await UserSchema.updateOne({ _id: userId }, { roomId: room._id })
    
        res.status(StatusCodes.CREATED)
        .cookie('roomId', room._id)
        .redirect('/room')
    } catch(err) {
        if (err.message.includes('duplicate key error collection')) {
            const oldRoomId = (await UserSchema.findById(userId).select('-_id roomId'))._id
            await removeUserFromRoom(oldRoomId, userId)

            const newRoomId = (await RoomSchema.create({ creatorId: userId }))._id
            await UserSchema.updateOne({ _id: userId }, { roomId: newRoomId })

            res.status(StatusCodes.CONFLICT)
            .cookie('roomId', newRoomId)
            .redirect('/room')
        } else {
            throw new Error(err.message)
        }
    }
}

const joinRoom = async (req, res) => {
    const roomId = req.body.roomId
    const userId = req.user._id

    const updateData = await RoomSchema.updateOne(
        { _id: roomId },
        { $addToSet: { userIds: userId } }
    ).catch(async err => {
        if (err.message.includes('duplicate')) {
            const oldRoomId = (await UserSchema.findById(userId)).roomId
            await removeUserFromRoom(oldRoomId, req.user._id)
            await UserSchema.updateOne({ _id: userId }, { roomId: roomId })

            res.status(StatusCodes.OK)
            .cookie('roomId', roomId)
            .redirect('/room')
        } else if (err.message.includes('Cast to ObjectId failed')) {
            throw new Error("Room Id doesn't exist.")
        }
    })

    
    if (updateData.modifiedCount) {
        await UserSchema.updateOne({ _id: userId }, { roomId: roomId })

        res.status(StatusCodes.OK)
        .cookie('roomId', roomId)
        .redirect('/room')
    } else {
        throw new Error('That room Id is invalid.')
    }
}

const leaveRoom = async (req, res) => {
    await removeUserFromRoom(req.cookies.roomId, req.user._id)

    res.status(StatusCodes.OK)
    .clearCookie('roomId')
    .redirect('/')
}

const getAllUsers = async (req, res) => {
    const users = await getAllUsersInRoom(req.cookies.roomId)
    
    res.status(StatusCodes.OK)
    .send(users)
}

module.exports = {
    createRoom,
    getAllUsers,
    joinRoom,
    leaveRoom,
}