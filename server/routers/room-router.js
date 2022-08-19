const express = require('express')

const {
    getAllUsers,
    createRoom,
    joinRoom,
    leaveRoom
} = require('../controllers/room-controller')

const router = express.Router()

router.route('/users').get(getAllUsers);

router.route('/create').post(createRoom);
//no leave delete because once every user leaves the room it's deleted

router.route('/join').post(joinRoom);
router.route('/leave').post(leaveRoom);

module.exports = router