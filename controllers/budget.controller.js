import { Budget, Transaction } from '../models/budget.model.js';

// Créer un nouveau budget
const create = async (req, res) => {
    try {
        const budget = new Budget(req.body)
        await budget.save()
        return res.status(200).json({ message: "Budget ajouté avec succès!" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de l'ajout du budget." });
    }
}

// Récupérer la liste des transactions
const list = async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la récupération des budgets." });
    }
};

// Extraire un budget par ID
const budgetId = async (req, res, next, id) => {
    try {
        const budget = await Budget.findById(id);

        if (!budget) {
            return res.status(404).json({ error: "Budget introuvable!" });
        }

        req.profile = budget;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de l'extraction du budget." });
    }
};

// Lire les détails d'un budget
const read = (req, res) => {
    return res.json(req.profile);
};

// Mettre à jour un budget
const update = async (req, res) => {
    try {
        let budget = req.profile;
        budget.set(req.body); // Mettre à jour les propriétés directement
        budget.modifier = Date.now();
        await budget.save();
        res.json(budget);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la modification du budget."  });
    }
};

// Supprimer une budget
const remove = async (req, res) => {
    try {
        let budget = req.profile;
        await budget.deleteOne();
        res.json({ message: "Budget supprimée avec succès!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la suppression du budget." });
    }
};


export default { create, list, budgetId, read, update, remove};