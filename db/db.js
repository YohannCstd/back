const sqlite3 = require('sqlite3');

const db = new sqlite3.Database("./database/app.db", (err) => {
    if (err) throw err;
    console.log('Database start');
})

sql = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      firstname TEXT,
      lastname TEXT,
      isAdmin INTEGER DEFAULT 0
    )`;
db.run(sql);

module.exports = db;
