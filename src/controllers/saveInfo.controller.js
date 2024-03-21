const Notes = require('../models/notifications.js')

const controller = {}

// ----- Save Notification -----
controller.regNote = async (req, res) => {
  try {
    const note = {id_boss, title_note, content_note} = req.body

    const filterNotes = Object.keys(note)

    if (filterNotes.length > 0) {
      const verify = await Notes.verifyNote(note)

      if (verify.code == 200) {
        const infoNote = await Notes.regNote(note)
        res.status(infoNote.code).json(infoNote)
      } else {
        res.status(500).json({ message: "Note already registered", status: false, code: 500 })
      }

    } else {
      res.status(400).json({ message: "No notes provided in the request", status: false, code: 400 })
    }

  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
    console.log(error)
  }
}

// ----- Edit Note -----
controller.editNote = async (req, res) => {
  try {
    const note = {id_notification, title_note, content_note} = req.body

    infoNote = await Notes.editNote(note)
    res.status(infoNote.code).json(infoNote)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

// ----- Delete Note -----
controller.deleteNote = async (req, res) => {
  try {
    const data = {id_notification , activation_status } = req.params

    infoNote = await Notes.deleteNote(data)
    res.status(infoNote.code).json(infoNote)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
