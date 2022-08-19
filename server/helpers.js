const RoomSchema = require('./schemas/room-schema')
const UserSchema = require('./schemas/user-schema')

async function getAllUsersInRoom(roomId) {
    const userIds = (await RoomSchema.findById(roomId).select('-_id users').lean())?.userIds
    
    if (!userIds) {
        throw new Error('Room does not exist.')
    }

    const userPromises = userIds.map(userId => UserSchema.findById(userId).select('-password').lean())
    return await Promise.all(userPromises)
}

async function removeUserFromRoom(roomId, userId) {
    const room = await RoomSchema.findOneAndUpdate(
        { _id: roomId },
        { $pull: { usersIds: userId } },
        { new: true }
    ).select('-_id userIds').lean()

    if (!room) {
        throw new Error("Room doesn't exist.")
    }

    if (!room.userIds.length) {
        await RoomSchema.deleteOne( { _id: roomId })
    }
    
    await UserSchema.updateOne(
        { _id: userId },
        { $unset: { roomId: "" } }
    )
}

module.exports = {
    getAllUsersInRoom,
    removeUserFromRoom,
}