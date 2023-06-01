const db = require("../db/db");

class User {
  constructor(user) {
    this.name = user.name;
    this.firstname = user.firstname;
    this.birthdate = user.birthdate;
    this.password = user.password;
    this.email = user.email;
    this.description = user.description;
    this.avatar = user.avatar;
    this.address = user.address;
    this.latitude = user.latitude;
    this.longitude = user.longitude;
    this.isAdmin = user.isAdmin;
  }

  static create(newUser) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (name, firstname, birthdate, password, email, address, latitude, longitude, avatar, description)
              VALUES (?, ?, ?, ?,?,?,?,?,?,?)`,
        [
          newUser.name,
          newUser.firstname,
          newUser.birthdate,
          newUser.password,
          newUser.email,
          newUser.adress,
          newUser.latitude,
          newUser.longitude,
          newUser.avatar,
          newUser.description,
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

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, email, (err, user) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id,name,firstname, birthdate, email, description, avatar, address, latitude, longitude, isAdmin FROM users WHERE id = ?`, id, (err, user) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM users`, (err, users) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
  }
}

module.exports = User;