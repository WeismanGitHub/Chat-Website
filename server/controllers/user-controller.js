const { removeUserFromRoom } = require('../helpers')
const UserSchema = require('../schemas/user-schema')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
    const { name, password } = req.body
    //If a password or name is entered then it's added to updateObject.
    const updateObject = { ...password && { password: password }, ...name && { name: name } }
    
    if (Object.keys(updateObject).length) {
        const user = await UserSchema.findByIdAndUpdate(
            req.user._id,
            updateObject,
            { new: true }
        ).select('name')

        const token = user.createJWT()

        res.status(StatusCodes.OK)
        .cookie('token', token)
        .json({ user: user })
    } else {
        throw new Error('Nothing updated!')
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user._id
    const roomId = (await UserSchema.findById(userId).select('-_id roomId').lean()).roomId

    if (roomId) {
        await removeUserFromRoom(roomId, userId)
    }

    await UserSchema.deleteOne({ _id: userId })

    res.status(StatusCodes.OK)
    .clearCookie('token')
    .clearCookie('roomId')
    .redirect('/authentication')
}

const getUser = async (req, res) => {
    const user = await UserSchema.findById(req.params.userId || req.user._id).select('-_id name').lean()

    if (!user) throw new Error('User does not exist.')

    res.status(StatusCodes.OK)
    .json({ user: user })
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
}