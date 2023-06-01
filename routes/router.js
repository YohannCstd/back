// Importation d'Express
const express = require("express");

const authMiddleware = require('../middleware/auth');

// Importation du controller scan.js
const versionController = require("../controllers/version");
const userController = require("../controllers/user");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/version",authMiddleware.authenticateToken,versionController.version);

//AUTHENTIFICATION
router.post("/register",userController.register);
router.post("/login",userController.login);

// USER
router.get("/user",userController.findAll);

// POST
router.post("/post",authMiddleware.authenticateToken,postController.createPost);
router.get("/post",authMiddleware.authenticateToken,postController.Allposts);
router.delete("/post/:id",authMiddleware.authenticateToken,postController.deleteById);
router.put("/post/:id",authMiddleware.authenticateToken,postController.updateById);

// Exportation du module
module.exports =router;