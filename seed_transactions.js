const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function seed() {
    const uri = process.env.FINANCEPRO_URI;
    if (!uri) { console.log('No URI'); return; }

    try {
        await mongoose.connect(uri, { dbName: 'financeApp' });

        // Find a user ID to associate transactions with
        const user = await mongoose.connection.db.collection('users').findOne({});
        if (!user) {
            console.log('No users found. Please create a user first.');
            process.exit(1);
        }

        const userId = user._id.toString();
        const now = new Date();
        const currentYear = now.getFullYear();
        const lastYear = currentYear - 1;

        // Clear existing to avoid duplicates/confusion
        await mongoose.connection.db.collection('transactions').deleteMany({});

        const transactions = [
            { userId, amount: 1200.00, status: 'completed', type: 'subscription', createdAt: new Date(`${lastYear}-08-15`) },
            { userId, amount: 1500.00, status: 'completed', type: 'subscription', createdAt: new Date(`${lastYear}-09-10`) },
            { userId, amount: 1100.00, status: 'completed', type: 'subscription', createdAt: new Date(`${lastYear}-10-15`) },
            { userId, amount: 1800.00, status: 'completed', type: 'subscription', createdAt: new Date(`${lastYear}-11-05`) },
            { userId, amount: 2200.00, status: 'completed', type: 'one-time', createdAt: new Date(`${lastYear}-12-20`) },
            { userId, amount: 850.00, status: 'completed', type: 'subscription', createdAt: new Date(`${currentYear}-01-10`) },
            { userId, amount: 450.00, status: 'completed', type: 'one-time', createdAt: new Date(`${currentYear}-01-28`) }, // Today-ish
            { userId, amount: 50.00, status: 'failed', type: 'one-time', createdAt: new Date(`${currentYear}-01-29`) },
        ];


        console.log(`Seeded ${transactions.length} transactions for user ${user.email} (${userId})`);

        await mongoose.disconnect();
    } catch (e) { console.error(e); }
}

seed();
