const Notes = require('../models/notifications.js')

const controller = {}

controller.getNotifications = async (req, res) => {
  try {
    const { id_boss } = req.params
    const user  = await Notes.getNotes(id_boss)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

controller.getNotificationsSeller = async (req, res) => {
  try {
    const { id_seller } = req.params
    const user  = await Notes.getNotesSeller(id_seller)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
