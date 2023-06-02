// Importation d'Express
const express = require("express");

const authMiddleware = require('../middleware/auth');

// Importation du controller scan.js
const versionController = require("../controllers/version");
const userController = require("../controllers/user");
const postController = require("../controllers/post");
const participantController = require("../controllers/participant");
const contactController = require("../controllers/contact");
const messageController = require("../controllers/message");
const petController = require("../controllers/pet");

const router = express.Router();

router.get("/version", authMiddleware.authenticateToken, versionController.version);

//AUTHENTIFICATION
router.post("/register", userController.register);
router.post("/login", userController.login);

// USER
router.get("/user", authMiddleware.authenticateToken, userController.findAll);
router.get("/user/:id", authMiddleware.authenticateToken, userController.findById);
router.post("/userEmail", userController.checkIfEmailExist);
router.post("/confirmUser", userController.confirmEmail);

// POST
router.post("/post", authMiddleware.authenticateToken, postController.createPost);
router.get("/post", authMiddleware.authenticateToken, postController.Allposts);
router.get("/post/:id", authMiddleware.authenticateToken, postController.postById);
router.delete("/post/:id", authMiddleware.authenticateToken, postController.deleteById);
router.put("/post/:id", authMiddleware.authenticateToken, postController.updateById);

// Participant
router.post("/participant", authMiddleware.authenticateToken, participantController.addParticipant);
router.get("/participant", authMiddleware.authenticateToken, participantController.Allparticipants);
router.delete("/participant/:id", authMiddleware.authenticateToken, participantController.deleteById);

// Contact 
router.post("/contact", contactController.createContact);
router.get("/contact/:userId", contactController.getAllContactsByUserId);

// Message
router.post("/message", messageController.createMessage);
router.get("/message", messageController.getAllMessages);
router.get("/message/:contactId", messageController.getMessagesByContactId);

// Pets
router.post("/pet", authMiddleware.authenticateToken, petController.createPet);

// Exportation du module
module.exports = router;
