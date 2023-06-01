const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../middleware/auth');

exports.register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if(req.body.firstname === undefined || req.body.lastname === undefined || req.body.email === undefined || req.body.password === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Vérifier si l'utilisateur existe déjà
  User.findByEmail(email, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ firstname, lastname, email, password });
    
    // Crypter le mot de passe
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        newUser.password = hash;

        // Enregistrer l'utilisateur dans la base de données
        User.create(newUser, (err, user) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          return res.json({ message: 'User registered successfully' });
        });
      });
    });
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur dans la base de données avec l'adresse email fournie
  User.findByEmail(email, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Vérifier si le mot de passe est correct
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Si l'utilisateur existe et le mot de passe est correct, générer un token d'accès et le renvoyer au client
      const token = generateToken.generateAccessToken({ id: user._id });
      
      res.json({ token });
    });
  });
};

exports.findAll = (req, res) => {
  User.findAll((err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json({ users: user });
  });
};