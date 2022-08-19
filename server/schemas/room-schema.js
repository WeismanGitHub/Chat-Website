const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Types.ObjectId, unique: true},
    deck: [CardSchema],
    userIds: [{
        type: mongoose.Types.ObjectId,
        maxlength: [15, 'Max Users: 15'],
    }]
})

RoomSchema.pre('save', function() {
    this.userIds.push(this.creatorId)

})
module.exports = mongoose.model('rooms', RoomSchema);