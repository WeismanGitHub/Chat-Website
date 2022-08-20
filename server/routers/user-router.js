const express = require('express')

const {
    updateUser,
    deleteUser,
    getUser,
} = require('../controllers/user-controller')

const router = express.Router()

router.route('/update').post(updateUser);
router.route('/delete').post(deleteUser);
router.route('/:userId?').get(getUser)

module.exports = router