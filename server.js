// Importer le package HTTP de Node.js pour avoir les outils pour créer le serveur
const http = require("http");

// Importer l'application app.js
const app = require("./app");

// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// Paramètrage du port avec la méthode set d'Express
app.set("port", process.env.PORT);

// La méthode createServer() prend en argument
// La fonction qui sera appelé à chaque requête reçu par le
// Serveur ici les fonctions seront dans app.js
const server = http.createServer(app);

// Le serveur écoute les requêtes sur le port
server.listen(process.env.PORT, function () {
    console.log("Listening on port %s...", process.env.PORT);
  });
