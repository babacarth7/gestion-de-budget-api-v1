import mongoose from 'mongoose';
import config from '../config/config.js';
import app from './express.js';

// Définir une route pour la page d'accueil
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "API Gestion de Budget v1" 
    });
});

// Fonction pour démarrer le serveur
const startServer = async () => {
    try {
        // Se connecter à MongoDB en utilisant async/await
        await mongoose.connect(config.db);
        console.log(`MongoDB connecté à : ${config.db}`);

        // Démarrer l'application Express après une connexion MongoDB réussie
        app.listen(config.port, (err) => {
            if (err) {
                console.log(err);
            }
            console.info(`Serveur démarré sur le port ${config.port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

// Appeler la fonction asynchrone pour démarrer le serveur
startServer();
