require('dotenv').config()

/* ----------- SERVER ----------- */
const PORT                      = process.env.PORT

/* ----------- DATABASE ----------- */
const PG_HOST                   = process.env._HOST
const PG_USER                   = process.env._USER
const PG_PASS                   = process.env._PASS
const PG_NAME                   = process.env._NAME

/* ----------- ROUTES ----------- */

// Users
const GET_NOTIFICATION           = process.env.GET_NOTIFICATION
const GET_NOTIFICATIONS          = process.env.GET_NOTIFICATIONS
const REGISTER_NOTIFICATION      = process.env.REGISTER_NOTIFICATION
const EDIT_NOTIFICATION          = process.env.EDIT_NOTIFICATION
const DELETE_NOTIFICATION        = process.env.DELETE_NOTIFICATION


module.exports = {
	// Server
  PORT,
  // Database
  PG_HOST, PG_USER, PG_PASS, PG_NAME,
  // Notifications
  GET_NOTIFICATION, GET_NOTIFICATIONS, REGISTER_NOTIFICATION, EDIT_NOTIFICATION, DELETE_NOTIFICATION
 }
