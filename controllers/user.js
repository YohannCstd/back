const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const generateToken = require("../middleware/auth");
const mailService = require("../services/mail");
const shortid = require('shortid');
const multer = require('multer');

// Définir le dossier de destination pour les avatars
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(),'../stockage'));
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique en ajoutant un timestamp au nom d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Configurer le middleware multer avec la configuration de stockage
const uploadAvatar = multer({ storage: avatarStorage }).single('avatar');

exports.register = async (req, res) => {
  let { name, firstname, birthdate, password, email, adress, latitude, longitude, avatar, description } = req.body;

  if (
    !name ||
    !firstname ||
    !birthdate ||
    !password ||
    !email ||
    !adress ||
    !latitude ||
    !longitude ||
    !avatar ||
    !description
  ) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Vérifier si l'utilisateur existe déjà
  const user = await userModel.findByEmail(email);

  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Appeler le middleware multer pour gérer le téléchargement de l'avatar
  uploadAvatar(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Une erreur de téléchargement s'est produite
      return res.status(500).json({ error: 'Avatar upload error' });
    } else if (err) {
      // Une autre erreur s'est produite
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Le téléchargement de l'avatar s'est déroulé avec succès

    // Récupérer le chemin du fichier téléchargé
    const avatarPath = req.file.path;

    // Crypter le mot de passe
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        password = hash;

        // Enregistrer l'utilisateur dans la base de données avec le chemin de l'avatar
        await userModel.create({
          name,
          firstname,
          birthdate,
          password,
          email,
          adress,
          latitude,
          longitude,
          avatar: avatarPath,
          description
        });

        return res.status(200).json({ message: "User registered successfully" });
      });
    });
  });
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    // Rechercher l'utilisateur dans la base de données avec l'adresse email fournie
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Vérifier si le mot de passe est correct
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Si l'utilisateur existe et le mot de passe est correct, générer un token d'accès et le renvoyer au client
      const token = generateToken.generateAccessToken({ id: user._id });

      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await userModel.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkIfEmailExist = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const user = await userModel.findByEmail(email);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.confirmEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const code = shortid.generate().substring(0, 6);
    mailService.sendMail(email, code);
    return res.status(200).json({ code: code });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}