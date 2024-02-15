const { GET_NOTIFICATION , GET_NOTIFICATIONS , REGISTER_NOTIFICATION , EDIT_NOTIFICATION , DELETE_NOTIFICATION } = require('../global/_var.js')

// Dependencies
const express = require('express')
const router = express.Router()

// Controllers
const dataController = require('../controllers/getInfo.controller.js')
const saveController = require('../controllers/saveInfo.controller.js')

// Routes
router.get(GET_NOTIFICATION , dataController.getNotifications)

router.get(GET_NOTIFICATIONS , dataController.getNotificationsSeller)

router.post(REGISTER_NOTIFICATION , saveController.regNote)

router.post(EDIT_NOTIFICATION , saveController.editNote)

router.post(DELETE_NOTIFICATION , saveController.deleteNote)

module.exports = router
