'use server';

import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

export interface TransactionType {
    id: string;
    user: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    type: string;
}

export async function getTransactions(): Promise<TransactionType[]> {
    await connectToDatabase();

    const docs = await Transaction.find({}).sort({ createdAt: -1 }).limit(20).lean();

    // Enhance with User names
    const userIds = [...new Set(docs.map((d: any) => d.userId))];
    const users = await User.find({ _id: { $in: userIds } }).lean();
    const userMap = new Map(users.map((u: any) => [u._id.toString(), u.name || u.email]));

    return docs.map((doc: any) => ({
        id: doc._id.toString(),
        user: userMap.get(doc.userId) || 'Unknown User',
        amount: doc.amount,
        status: doc.status || 'completed',
        date: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'N/A',
        type: doc.type || 'one-time'
    }));
}

export async function getStats() {
    await connectToDatabase();

    // Aggregation for stats
    const totalRevenue = await Transaction.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const failedCount = await Transaction.countDocuments({ status: 'failed' });
    const pendingCount = await Transaction.countDocuments({ status: 'pending' });
    const activeUsers = await User.countDocuments();

    return {
        totalRevenue: totalRevenue[0]?.total || 0,
        pending: pendingCount,
        failed: failedCount,
        activeUsers
    };
}

export async function getRevenueHistory() {
    await connectToDatabase();

    // Get last 6 months
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 5);
    start.setDate(1); // Start of that month

    const result = await Transaction.aggregate([
        {
            $match: {
                status: 'completed',
                createdAt: { $gte: start, $lte: end }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' }
                },
                total: { $sum: '$amount' }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Generate label array for last 6 months
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];

    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const m = d.getMonth() + 1; // 1-12
        const y = d.getFullYear();
        const name = monthNames[m - 1];

        const found = result.find(r => r._id.month === m && r._id.year === y);
        data.push({
            name,
            total: found ? found.total : 0
        });
    }

    return data;
}
