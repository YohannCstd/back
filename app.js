// Importation d'Express
const express = require("express");

// Importation connexion base de donnée mysql
const mysql = require("./db/db");

// Importation des routes
const router = require("./routes/router");

// Pour créer l'application express
const app = express();

// Importation de body-parser
const bodyParser = require("body-parser");

// Gérer les problèmes de CORS
app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Acces-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Acces-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    next();
});

// Transformer le corps en json objet javascript utilisable
app.use(bodyParser.json());

//app.use(express.static(process.cwd() + "/my-app/dist/"));

//Les routes vers mes controller
app.use("/api",router)
// Exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;
