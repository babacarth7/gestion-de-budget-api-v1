import express from 'express';
import budgetController from '../controllers/budget.controller.js';

const router = express.Router();


// Routes pour la gestion des budget
router.post('/api/budgets', budgetController.create); 
router.get('/api/budgets', budgetController.list); 

// Routes pour une transaction spécifique par ID
router.get('/api/budgets/:budgetId', budgetController.read); 
router.put('/api/budgets/:budgetId', budgetController.update); 
router.delete('/api/budgets/:budgetId', budgetController.remove); 

// Middleware pour extraire un budget par ID
router.param('budgetId', budgetController.budgetId);

export default router;