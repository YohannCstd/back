const db = require('../db/db');

const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
};

User.create = (newUser, result) => {
  console.log(newUser.email, newUser.password, newUser.firstname, newUser.lastname);
  db.run(`INSERT INTO users (email, password, firstname, lastname)
          VALUES (?, ?, ?, ?)`, [newUser.email, newUser.password, newUser.firstname, newUser.lastname], (err) => {
    if (err) {
      console.error(err);
      result(err, null);
    } else {
      result(null, { email: newUser.email });
    }
  });
};

User.findByEmail = (email, result) => {
  db.get(`SELECT * FROM users WHERE email = ?`, email, (err, user) => {
    if (err) {
      console.error(err);
      result(err, null);
    } else {
      result(null, user);
    }
  });
};

User.findAll = (result) => {
  db.all(`SELECT * FROM users`, (err, users) => {
    if (err) {
      console.error(err);
      result(err, null);
    } else {
      result(null, users);
    }
  });
};

module.exports = User;