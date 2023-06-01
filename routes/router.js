// Importation d'Express
const express = require("express");

const authMiddleware = require('../middleware/auth');

// Importation du controller scan.js
const versionController = require("../controllers/version");
const userController = require("../controllers/user");
const postController = require("../controllers/post");
const participantController = require("../controllers/participant");
const contactController = require("../controllers/contact");

const router = express.Router();

router.get("/version",authMiddleware.authenticateToken,versionController.version);

//AUTHENTIFICATION
router.post("/register",userController.register);
router.post("/login",userController.login);

// USER
router.get("/user",userController.findAll);
router.get("/user/:id",userController.findById);
router.post("/userEmail",userController.checkIfEmailExist);
router.post("/confirmUser",userController.confirmEmail);

// POST
router.post("/post",postController.createPost);
router.get("/post",postController.Allposts);
router.get("/post/:id",postController.postById);
router.delete("/post/:id",authMiddleware.authenticateToken,postController.deleteById);
router.put("/post/:id",authMiddleware.authenticateToken,postController.updateById);

// Participant
router.get("/participant",authMiddleware.authenticateToken,participantController.Allparticipants);
router.delete("/participant/:id",authMiddleware.authenticateToken,participantController.deleteById);

// Contact 
router.get("/contact/:userId",contactController.getAllContactsByUserId);
// Exportation du module
module.exports =router;