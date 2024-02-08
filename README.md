# Documentation de l'API Budget

Cette API permet de gérer des budgets et des transactions associées.

## Endpoints disponibles

- `GET /api/budgets`: Récupérer la liste des budgets.
- `POST /api/budgets`: Créer un nouveau budget.
- `GET /api/budgets/:id`: Lire les détails d'un budget spécifique.
- `PUT /api/budgets/:id`: Mettre à jour un budget existant.
- `DELETE /api/budgets/:id`: Supprimer un budget existant.

- `GET /api/transactions`: Récupérer la liste des transactions.
- `POST /api/transactions`: Créer une nouvelle transaction.
- `GET /api/transactions/:id`: Lire les détails d'une transaction spécifique.
- `PUT /api/transactions/:id`: Mettre à jour une transaction existante.
- `DELETE /api/transactions/:id`: Supprimer une transaction existante.

## Paramètres acceptés

### Budgets
- `name` (string, required): Nom du budget.
- `amount` (number, required): Montant du budget.

### Transactions
- `name` (string, required): Nom de la transaction.
- `amount` (number, required): Montant de la transaction.
- `type` (string, required): Type de la transaction (dépense ou revenu).
- `category` (string, required): Catégorie de la transaction.
- `budgetId` (string, required): ID du budget associé à la transaction.

## Réponses renvoyées

Toutes les réponses renvoyées par l'API sont au format JSON.

### Succès
- `200 OK`: La requête a été traitée avec succès.

### Erreurs
- `400 Bad Request`: Requête invalide, paramètres manquants ou incorrects.
- `404 Not Found`: Ressource non trouvée, ID invalide ou introuvable.
- `500 Internal Server Error`: Erreur interne du serveur, veuillez réessayer ultérieurement.

## Exemples d'utilisation

### Créer un budget
```json
POST /api/budgets
{
    "name": "Alimentation",
    "amount": 500
}


## Ajouter un Budget

Pour ajouter un nouveau budget, utilisez la méthode POST sur l'endpoint `/api/budgets`. Le corps de la requête doit être au format JSON avec les propriétés `name` et `amount`.

Exemple de corps de requête JSON pour ajouter un budget :

```json
{
    "name": "Budget alimentation",
    "amount": 10000
}
```

Réponse en cas de succès :

```json
{
    "message": "Budget ajouté avec succès!"
}
```

## Effectuer des Transactions

Pour effectuer une transaction, utilisez la méthode POST sur l'endpoint `/api/transactions`. Le corps de la requête doit être au format JSON avec les propriétés `name`, `amount`, `type`, `category` et `budgetId`.

Exemple de corps de requête JSON pour effectuer une transaction :

```json
{
    "name": "Achat de nourriture",
    "amount": 50,
    "type": "depense", // ou "revenu"
    "category": "Nourriture",
    "budgetId": "ID_DU_BUDGET_ASSOCIÉ"
}
```

Pour le champ `type`, utilisez `"depense"` pour une dépense et `"revenu"` pour un revenu.

Réponse en cas de succès :

```json
{
    "message": "Transaction ajoutée avec succès!"
}
```

## Lire les détails d'un Budget ou d'une Transaction

Pour lire les détails d'un budget ou d'une transaction spécifique, utilisez la méthode GET sur l'endpoint correspondant avec l'identifiant de l'objet dans l'URL.

Exemple d'URL pour lire les détails d'un budget :
- `/api/budgets/ID_DU_BUDGET`

Exemple d'URL pour lire les détails d'une transaction :
- `/api/transactions/ID_DE_LA_TRANSACTION`

Réponse attendue :
Les détails complets du budget ou de la transaction spécifiée au format JSON.

## Mettre à jour ou Supprimer un Budget ou une Transaction

Pour mettre à jour ou supprimer un budget ou une transaction spécifique, utilisez les méthodes PUT ou DELETE respectivement sur l'endpoint correspondant avec l'identifiant de l'objet dans l'URL.

Exemple d'URL pour mettre à jour ou supprimer un budget :
- Mettre à jour : `/api/budgets/ID_DU_BUDGET`
- Supprimer : `/api/budgets/ID_DU_BUDGET`

Exemple d'URL pour mettre à jour ou supprimer une transaction :
- Mettre à jour : `/api/transactions/ID_DE_LA_TRANSACTION`
- Supprimer : `/api/transactions/ID_DE_LA_TRANSACTION`

Dans le cas de la méthode PUT, le corps de la requête doit contenir les données mises à jour au format JSON. Dans le cas de la méthode DELETE, aucune donnée n'est nécessaire dans le corps de la requête.

---
