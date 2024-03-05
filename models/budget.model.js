import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nom du budget requis!']
        },

        amount: {
            type: Number,
            required: [true, 'Montant du budget requis!'],
            min: [0, 'Le montant du budget doit être supérieur à 0']
        },

        balance: {
            type: Number,
            required: true,
            default: 0
        }

    },

    {
        collection: 'Budget',

        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const transactionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nom de la transaction requis']
        },

        amount: {
            type: Number,
            required: [true, 'Montant de la transaction requis!'],
            min: [0, 'Le montant de la transaction doit être supérieur à 0']
        },

        type: {
            type: String,
            enum: ['depense', 'revenu'],
            required: [true, 'Type de transaction requis!']
        },

        category: {
            type: String,
            required: [true, 'Categorie de la transaction requis!']
        },

        budgetId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Budget'
        }
    },

    {
        collection: 'Transaction',
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const Budget = mongoose.model('Budget', budgetSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

export { Budget, Transaction };