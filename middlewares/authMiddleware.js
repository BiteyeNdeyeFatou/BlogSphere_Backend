const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
  let token;

  // Vérifie s'il y a un token dans l'en-tête Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Récupère juste le token (après "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      // Vérifie et décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Trouve l'utilisateur dans la base
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Passe au prochain middleware
    } catch (error) {
      console.error("Erreur middleware protect :", error.message);
      return res.status(401).json({ message: "Token invalide" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Pas de token, accès refusé" });
  }
};

module.exports = { protect };
