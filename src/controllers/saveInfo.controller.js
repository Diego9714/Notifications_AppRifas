const Notes = require('../models/notifications.js')

const controller = {}

// ----- Save Notification -----
controller.regNote = async (req, res) => {
  try {
    const { notes } = req.body

    const filterNotes = Object.keys(notes)

    if (filterNotes.length > 0) {
      const verify = await Notes.verifyNote(notes)

      console.log(verify)

      const regNotes = verify.info.regNote
      const noteExists = verify.info.noteExists

      let registeredNotes = []
      let existingNotes = []

      if (regNotes.length > 0) {
        const infoNote = await Notes.regNote(regNotes)

        console.log(infoNote)

        registeredNotes = infoNote.completed.map(note => note.note)
        existingNotes = noteExists.map(note => note.title_note)
        
        res.status(infoNote.code).json({
          message: "Registration process completed",
          status: true,
          code: infoNote.code,
          registeredNotes: registeredNotes,
          existingNotes: existingNotes,
          notRegisteredNotes: infoNote.notCompleted
        })
      } else {
        res.status(500).json({ message: "All notes are already registered", status: false, code: 500 })
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
    const { notes } = req.body

    infoNote = await Notes.editNote(notes)
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
