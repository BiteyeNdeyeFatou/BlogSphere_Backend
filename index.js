const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json()); // Permet de lire les données JSON

// Route pour recevoir les données du formulaire
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log("Données reçues :", { username, email, password });
  res.status(200).json({ message: "Utilisateur reçu !" });
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});