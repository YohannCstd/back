const db = require("../db/db");

class Post {
  constructor(post) {
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.appointmentDate = post.appointmentDate;
    this.description = post.description;
    this.limitParticipants = post.limitParticipants;
  }

  static create(newPost) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO posts (user_id, created_at, updated_at, appointment_date, description, limitParticipants)
              VALUES (?, ?, ?, ?,?,?)`,
        [
          newPost.userId,
          newPost.createdAt,
          newPost.updatedAt,
          newPost.appointmentDate,
          newPost.description,
          newPost.limitParticipants,
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
      db.get(`SELECT * FROM posts WHERE id = ?`, id, (err, post) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(post);
        }
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM posts WHERE id = ?`, id, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve('deleted');
        }
      });
    });
  }

  static updateById(id, updatedAt,appointmentDate, description, limitParticipants) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE posts SET updated_at = ?, appointment_date = ?, description = ?, limitParticipants = ? WHERE id = ?`,
        [updatedAt,appointmentDate, description, limitParticipants, id],
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
      db.all(`SELECT * FROM posts`, (err, posts) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(posts);
        }
      });
    });
  }
}

module.exports = Post;