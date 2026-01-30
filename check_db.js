const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function check() {
    const uri = process.env.FINANCEPRO_URI;
    if (!uri) {
        console.log('No URI');
        return;
    }

    try {
        await mongoose.connect(uri, { dbName: 'financeApp' });
        const cols = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', cols.map(c => c.name));

        // Check if 'transactions' exists, if not, check for something similar
        const transactionCol = cols.find(c => c.name.toLowerCase().includes('transaction') || c.name.toLowerCase().includes('payment'));

        if (transactionCol) {
            console.log('Found transaction collection:', transactionCol.name);
            // Peek at one doc to see schema
            const sample = await mongoose.connection.db.collection(transactionCol.name).findOne({});
            console.log('Sample Transaction:', JSON.stringify(sample, null, 2));
        } else {
            console.log('No transaction collection found.');
        }

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

check();
