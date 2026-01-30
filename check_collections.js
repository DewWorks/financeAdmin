const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function check() {
    const uri = process.env.FINANCEPRO_URI;
    if (!uri) { console.log('No URI'); return; }

    try {
        await mongoose.connect(uri, { dbName: 'financeApp' });
        const cols = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in financeApp:', cols.map(c => c.name));

        for (const col of cols) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`Collection ${col.name}: ${count} docs`);
            if (col.name.toLowerCase().includes('transaction') || col.name.toLowerCase().includes('payment')) {
                const docs = await mongoose.connection.db.collection(col.name).find({}).toArray();
                console.log(`Contents of ${col.name}:`, JSON.stringify(docs, null, 2));
            }
        }

        await mongoose.disconnect();
    } catch (e) { console.error(e); }
}

check();
