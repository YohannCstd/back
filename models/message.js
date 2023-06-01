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
        `INSERT INTO messages (from_user_id, contact_id, group_id, content, date)
        VALUES (?, ?, ?, ?, ?)`,
        [
          newMessage.fromUserId,
          newMessage.contactId,
          newMessage.groupId,
          newMessage.content,
          newMessage.date,
        ],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve("created");
          }
        }
      );
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM messages`, (err, messages) => {
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
      db.get(`SELECT * FROM messages WHERE id = ?`, id, (err, message) => {
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
        `UPDATE messages SET from_user_id = ?, contact_id = ?, group_id = ?, content = ?, date = ? WHERE id = ?`,
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
      db.run(`DELETE FROM messages WHERE id = ?`, id, (err) => {
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
        `SELECT content,date FROM messages WHERE contact_id = ? ORDER BY date DESC LIMIT 1`,
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
}

module.exports = Message;
