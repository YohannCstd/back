const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database/app.db", (err) => {
  if (err) throw err;
  console.log("Database start");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    firstname TEXT,
    birthdate TEXT,
    password TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    description TEXT,
    avatar TEXT,
    address TEXT,
    latitude REAL,
    longitude REAL,
    isAdmin INTEGER DEFAULT 0
  )`);

db.run(`CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    user_id INTEGER,
    avatar TEXT,
    description TEXT,
    type TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    created_at TEXT,
    updated_at TEXT,
    appointment_date TEXT,
    title TEXT,
    description TEXT,
    limitParticipants INTEGER
  )`);

db.run(`CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    pet_id INTEGER,
    status TEXT,
    status_message TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id INTEGER,
    contact_id INTEGER,
    group_id INTEGER,
    content TEXT,
    date TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact1_id INTEGER,
    contact2_id INTEGER,
    status TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    title TEXT,
    avatar TEXT
  )`);

module.exports = db;
