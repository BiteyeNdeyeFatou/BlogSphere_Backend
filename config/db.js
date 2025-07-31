const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connexion à la base de données reussie ");

    } catch (err) {
        console.log("Une erreur s'est produite", err.message);
    }
};

module.exports = connectDB;