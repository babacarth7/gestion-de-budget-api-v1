import express from 'express';
import transactionController from '../controllers/transaction.controller.js';

const router = express.Router();

// Routes pour la gestion des transactions
router.post('/api/transactions', transactionController.create); // Créer une nouvelle transaction
router.get('/api/transactions', transactionController.list); // Obtenir la liste des transactions

// Routes pour une transaction spécifique par ID
router.get('/api/transactions/:trsId', transactionController.read); // Obtenir les détails d'une transaction spécifique
router.put('/api/transactions/:trsId', transactionController.update); // Mettre à jour une transaction spécifique
router.delete('/api/transactions/:trsId', transactionController.remove); // Supprimer une transaction spécifique

// Middleware pour extraire une transaction par ID
router.param('trsId', transactionController.transactionById);

export default router;
