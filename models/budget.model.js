import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },

        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount must be a positive number']
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
            required: [true, 'Name is required']
        },

        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount must be a positive number']
        },

        type: {
            type: String,
            enum: ['depense', 'revenu'],
            required: [true, 'Type is required']
        },

        category: {
            type: String,
            required: [true, 'Category is required']
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

// Pré-accrochage avant enregistrement pour ajuster le budget en fonction du type de transaction
transactionSchema.pre('save', async function(next) {
    try {
        const budget = await Budget.findById(this.budgetId);

        if (!budget) {
            throw new Error('Budget inexistant');
        }

        if (this.type === 'depense' && this.amount > budget.balance) {
            throw new Error('Solde insuffisant');
        }

        if (this.type === 'depense') {
            budget.balance -= this.amount;
        } else if (this.type === 'revenu') {
            budget.amount += this.amount; 
            budget.balance += this.amount;
        }

        await budget.save();
        next();
    } catch (error) {
        next(error);
    }
});



const Budget = mongoose.model('Budget', budgetSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

export { Budget, Transaction };