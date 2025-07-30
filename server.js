//1 -> Importation des packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB =  require('./config/db');



const app = express();
//2 -> Connexion à la base de donnée
connectDB();


//3 => Middleware Cors
app.use(cors());
app.use(express.json());

//4 -> Importation des routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de la gestion des articles !");
});

const PORT = process.env.PORT || 5000;

//5 -> Lancement du serveur
app.listen(PORT, () => {
    console.log('Serveur lancé sur le port ${PORT} ');
});