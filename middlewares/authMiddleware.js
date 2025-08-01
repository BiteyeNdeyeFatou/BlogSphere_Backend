const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("Token reçu :", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Payload décodé :", decoded);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      next();
    } catch (error) {
      console.log("Erreur JWT :", error.message);
      return res.status(401).json({ message: 'Token invalide' });
    }
  } else {
    console.log("Pas de token dans l'en-tête");
    return res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

module.exports = { protect };
