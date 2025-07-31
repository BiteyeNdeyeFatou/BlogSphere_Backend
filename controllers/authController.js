const User = require("../models/User");
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Utilisez "name" au lieu de "username"

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email déjà utilisé" });
        }

        // Supprimez le hachage ici (il est déjà géré par le modèle)
        const user = new User({ name, email, password }); // Passez le mot de passe en clair
        await user.save(); // Le middleware pre("save") hachera automatiquement
        
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};