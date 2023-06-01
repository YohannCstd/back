const db = require("../db/db");

class Pet {
  constructor(pet) {
    this.name = pet.name;
    this.userId = pet.userId;
    this.photo = pet.photo;
    this.description = pet.description;
    this.type = pet.type;
  }

  static create(newPet) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO pets (name, user_id, photo, description, type)
        VALUES (?, ?, ?, ?, ?)`,
        [
          newPet.name,
          newPet.userId,
          newPet.photo,
          newPet.description,
          newPet.type,
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

  static findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM pets WHERE user_id = ?`, userId, (err, pets) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(pets);
        }
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM pets`, (err, pets) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(pets);
        }
      });
    });
  }
}

module.exports = Pet;
