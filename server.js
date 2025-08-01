const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Route test
app.get('/', (req, res) => {
  res.send("🚀 API BlogSphere en marche");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur sur le port ${PORT}`));
