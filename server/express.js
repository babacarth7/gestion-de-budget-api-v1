import express from 'express';

import BugetRoutes from '../routes/budget.routes.js';
import TransactionRoutes from '../routes/transaction.routes.js';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', BugetRoutes);
app.use('/', TransactionRoutes);

export default app;