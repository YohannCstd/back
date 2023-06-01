const db = require("../db/db");

class Contact {
  constructor(contact) {
    this.id = contact.id;
    this.userId1 = contact.userId1;
    this.userId2 = contact.userId2;
    this.status = contact.status;
  }

  static create(newContact) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO contacts (user_id1, user_id2, status)
        VALUES (?, ?, ?)`,
        [newContact.userId1, newContact.userId2, newContact.status],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve('created');
          }
        }
      );
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM contacts`, (err, contacts) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(contacts);
        }
      });
    });
  }

  static findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM contacts WHERE user_id1 = ? OR user_id2 = ?`,
        [userId, userId],
        (err, contacts) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(contacts);
          }
        }
      );
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE contacts SET status = ? WHERE id = ?`,
        [status, id],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve('updated');
          }
        }
      );
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM contacts WHERE id = ?`, id, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve('deleted');
        }
      });
    });
  }

  static findAllContactsByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM contacts WHERE contact1_id = ? OR contact2_id = ?`,
        [userId, userId],
        (err, contacts) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(contacts);
          }
        }
      );
    });
  }
}

module.exports = Contact;
