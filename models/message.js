const db = require("../db/db");

class Message {
  constructor(message) {
    this.id = message.id;
    this.fromUserId = message.fromUserId;
    this.contactId = message.contactId;
    this.groupId = message.groupId;
    this.content = message.content;
    this.date = message.date;
  }

  static create(newMessage) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO message (from_user_id, contact_id, group_id, content, date)
        VALUES (?, ?, ?, ?, ?)`,
        [
          newMessage.fromUserId,
          newMessage.contactId,
          newMessage.groupId,
          newMessage.content,
          newMessage.date,
        ],
        function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...newMessage });
          }
        }
      );
    });
  }
  
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM message`, (err, messages) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(messages);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM message WHERE id = ?`, id, (err, message) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(message);
        }
      });
    });
  }

  static updateById(id, newMessage) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE message SET from_user_id = ?, contact_id = ?, group_id = ?, content = ?, date = ? WHERE id = ?`,
        [
          newMessage.fromUserId,
          newMessage.contactId,
          newMessage.groupId,
          newMessage.content,
          newMessage.date,
          id,
        ],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve("updated");
          }
        }
      );
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM message WHERE id = ?`, id, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve("deleted");
        }
      });
    });
  }

  static findLastMessageByContactId(contactId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT content,date FROM message WHERE contact_id = ? ORDER BY date DESC LIMIT 1`,
        contactId,
        (err, message) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(message);
          }
        }
      );
    });
  }

  static findByContactId(contactId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM message WHERE contact_id = ? ORDER BY date ASC`,
        contactId,
        (err, messages) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(messages);
          }
        }
      );
    });
  }
}

module.exports = Message;
