const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articlesRoute");
const authRoutes = require("./routes/authRoutes"); // si tu l’as
const commentRoutes = require('./routes/commentRoutes');


const app = express();

// Connexion DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes); 
app.use('/api/articles', commentRoutes); 

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur sur le port ${PORT}`));
