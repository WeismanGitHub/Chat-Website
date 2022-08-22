const RoomSchema = require('./schemas/room-schema')
const UserSchema = require('./schemas/user-schema')

async function getAllUsersInRoom(roomId) {
    const userIds = (await RoomSchema.findById(roomId).select('-_id userIds').lean())?.userIds
    
    if (!userIds) {
        return console.log('Room does not exist.')
    }

    const userPromises = userIds.map(userId => UserSchema.findById(userId).select('-password').lean())
    return await Promise.all(userPromises)
}

async function removeUserFromRoom(roomId, userId) {
    const room = await RoomSchema.findOneAndUpdate(
        { _id: roomId },
        { $pull: { userIds: userId } },
        { new: true }
    ).select('-_id userIds').lean()

    if (!room) {
        return console.log("Room doesn't exist.")
    }

    await UserSchema.updateOne(
        { _id: userId },
        { $unset: { roomId: "" } }
    )

    if (!room.userIds.length) {
        await RoomSchema.deleteOne( { _id: roomId })
        return false
    } else {
        return true
    }
    
}

module.exports = {
    getAllUsersInRoom,
    removeUserFromRoom,
}