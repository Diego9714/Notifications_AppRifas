const pool = require('../utils/mysql.connect.js') 

// ----- Verify Note -----
const verifyNote = async ({note}) => {
  try {
    let msg = {
      status: false,
      message: "Notification already exist",
      code: 500
    }

    const connection = await pool.getConnection()

    const sql = `SELECT id_notification FROM notifications WHERE title_note = ?;`
    const [rows] = await connection.execute(sql, [title_note])

    if (rows.length == []) {
      msg = {
        status: true,
        message: "Notification for registration",
        code: 200
      }
    }

    connection.release()

    return msg
  } catch (err) {
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Save Note -----
const regNote = async ({note}) => {
  try {
    let msg = {
      status: false,
      message: "Notification not registered",
      code: 500
    }

    const connection = await pool.getConnection()

    const fechaActual = new Date()
    const date_created = fechaActual.toISOString().split('T')[0]

    let sql = `INSERT INTO notifications ( id_boss , title_note , content_note , date_created , activation_status) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(sql, [id_boss ,title_note , content_note , date_created, 1])

    if (result.affectedRows > 0) {
      msg = {
        status: true,
        message: "Notification registered succesfully",
        code: 200
      }
    }

    connection.release()


    return msg

  } catch (err) {
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Get Note -----
const getNotes = async (id_boss) => {
  try {
    let msg = {
      status: false,
      message: "Notes not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_notification , id_boss , title_note , content_note , date_created , activation_status FROM notifications WHERE id_boss = ? ;`
    let [note] = await connection.execute(sql,[id_boss])

    if (note.length > 0) {
      msg = {
        status: true,
        message: "Notes found",
        data: note,
        code: 200
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Get Note -----
const getNotesSeller = async (id_seller) => {
  try {
    let msg = {
      status: false,
      message: "Notes not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_boss FROM sellers WHERE id_seller = ? ;`
    let [seller] = await connection.execute(sql,[id_seller])

    if (seller.length > 0) {
      let idBoss = seller[0].id_boss

      let sql = `SELECT title_note , content_note , date_created FROM notifications WHERE id_boss = ? ;`
      let [note] = await connection.execute(sql,[idBoss])

      if (note.length > 0) {
        msg = {
          status: true,
          message: "Notes found",
          data: note,
          code: 200
        }
      }

      connection.release()
    }



    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Edit Note -----
const editNote = async ({note}) => {
  try {
    let msg = {
      status: false,
      message: "Notification not found",
      code: 404
    }

    const connection = await pool.getConnection()

    const [verify] = await connection.execute(`SELECT id_notification FROM notifications WHERE id_notification = ?;`, [id_notification])

    if (verify.length > 0) {
      const [result] = await connection.execute(`UPDATE notifications SET title_note = ?, content_note = ? WHERE id_notification = ?;`, [title_note , content_note, id_notification])

      if (result.affectedRows > 0) {
        msg = {
          status: true,
          message: "Notification edited succesfully",
          code: 404
        }
      } else {
        msg = {
          status: false,
          message: "Notification not edited",
          code: 500
        }
      }
    }

    connection.release()
  
    return msg

  } catch (err) {
    console.log(err)
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Delete Note -----
const deleteNote = async ({ data }) => {
  try {
    const connection = await pool.getConnection();

    let sql = `SELECT id_notification FROM notifications WHERE id_notification = ?;`;
    let [verify] = await connection.execute(sql, [id_notification]);

    let msg;

    if (verify.length > 0) {
      let updateSql = `UPDATE notifications SET activation_status = ? WHERE id_notification = ?;`;
      const [note] = await connection.execute(updateSql, [activation_status, id_notification]);

      if (note.affectedRows > 0 && activation_status == 1) {
        msg = {
          status: true,
          message: "Note Activated succesfully",
          code: 200
        };
      } else if (note.affectedRows > 0 && activation_status == 0) {
        msg = {
          status: true,
          message: "Note Disabled succesfully",
          code: 200
        };
      } else {
        msg = {
          status: false,
          message: "Note not activated or deactivated",
          code: 500
        };
      }
    } else {
      msg = {
        status: false,
        message: "Note not found",
        code: 404
      };
    }

    connection.release();
    return msg;

  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    };
  }
};

module.exports = {
  getNotes,
  getNotesSeller,
  verifyNote,
  regNote,
  editNote,
  deleteNote
}
