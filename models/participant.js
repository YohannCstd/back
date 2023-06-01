const db = require("../db/db");

class Participant {
  constructor(participant) {
    this.postId = participant.postId;
    this.userId = participant.userId;
    this.petId = participant.petId;
    this.status = participant.status;
    this.statusMessage = participant.statusMessage;
  }

  static create(newParticipant) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO participants (post_id, user_id, pet_id, status, sstatus_message)
              VALUES (?, ?, ?, ?,?)`,
        [
          newParticipant.postId,
          newParticipant.userId,
          newParticipant.petId,
          newParticipant.status,
          newParticipant.statusMessage
        ],
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

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM participants WHERE id = ?`, id, (err, participant) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(participant);
        }
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM participants WHERE id = ?`, id, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve('deleted');
        }
      });
    });
  }

  static updateById(id, petId, status, statusMessage) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE participants SET pet_id = ?, status = ?, status_message = ? WHERE id = ?`,
        [petId,status, statusMessage, limitParticipants, id],
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

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM participants`, (err, participants) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(participants);
        }
      });
    });
  }
}

module.exports = Participant;