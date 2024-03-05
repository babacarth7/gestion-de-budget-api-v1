import { Budget } from "../models/budget.model.js";
import { Transaction } from "../models/budget.model.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

// Créer un nouveau budget
const create = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const budget = await Budget.findById(transaction.budgetId);

    if (!budget) {
      throw new Error("Budget inexistant");
    }

    if (transaction.type === "depense" && transaction.amount > budget.balance) {
      throw new Error("Fond insuffisant");
    }

    if (transaction.type === "depense") {
      budget.balance -= transaction.amount;
    } else if (transaction.type === "revenu") {
      budget.amount += transaction.amount;
      budget.balance += transaction.amount;
    }

    await Promise.all([transaction.save(), budget.save()]);

    return res.status(200).json({ message: "Transaction ajoutée avec succès!" });
  } catch (err) {
    if (err.message === "Budget inexistant") {
      return res.status(400).json({ error: "Identifiant de budget incorrect" });
    }
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

// Récupérer la liste des transactions
const list = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("budgetId");
    res.json(transactions);
  } catch (err) {
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

// Middleware pour extraire une transaction par ID
const transactionById = async (req, res, next, id) => {
  try {
    const transaction = await Transaction.findById(id).populate("budgetId");

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction inexistante!",
      });
    }

    req.profile = transaction;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de l'extraction de la transaction.",
    });
  }
};

// Lire les détails d'une transaction
const read = (req, res) => {
  return res.json(req.profile);
};

// Mettre à jour une transaction
const update = async (req, res) => {
  try {
    let transaction = req.profile;
    transaction.set(req.body); // Mettre à jour les propriétés directement
    transaction.modifier = Date.now();
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de la modification de la transaction.",
    });
  }
};

// Supprimer une transaction
const remove = async (req, res) => {
  try {
    let transaction = req.profile;
    await transaction.deleteOne();
    res.json({ message: "Transaction supprimée avec succès!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de la suppression de la transaction.",
    });
  }
};

export default { create, list, transactionById, read, update, remove };
