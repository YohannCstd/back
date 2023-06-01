const db = require("../db/db");

class Group {
  constructor(group) {
    this.id = group.id;
    this.postId = group.postId;
    this.nom = group.nom;
    this.image = group.image;
  }

  static create(newGroup) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO groups (post_id, nom, image)
        VALUES (?, ?, ?)`,
        [newGroup.postId, newGroup.nom, newGroup.image],
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
      db.all(`SELECT * FROM groups`, (err, groups) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(groups);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM groups WHERE id = ?`, id, (err, group) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(group);
        }
      });
    });
  }

  static updateById(id, newGroup) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE groups SET post_id = ?, nom = ?, image = ? WHERE id = ?`,
        [newGroup.postId, newGroup.nom, newGroup.image, id],
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
      db.run(`DELETE FROM groups WHERE id = ?`, id, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve("deleted");
        }
      });
    });
  }
}

module.exports = Group;
