// Importation d'Express
const express = require("express");

const authMiddleware = require('../middleware/auth');

// Importation du controller scan.js
const versionController = require("../controllers/version");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/version",authMiddleware.authenticateToken,versionController.version);

//AUTHENTIFICATION
router.post("/register",userController.register);
router.post("/login",userController.login);

// USER
router.get("/user",userController.findAll);

// Exportation du module
module.exports =router;