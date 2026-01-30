import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String, // Storing as String based on inspection, typically ObjectId but keeping flexible
        required: true,
        index: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'failed', 'refunded'],
        default: 'pending',
    },
    type: {
        type: String,
        default: 'subscription',
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
