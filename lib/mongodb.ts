/* eslint-disable no-var */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.FINANCEPRO_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the FINANCEPRO_URI environment variable inside .env');
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // Use a unique key to force new connection in dev mode if needed
    var mongooseFinanceApp: MongooseCache;
}

let cached = global.mongooseFinanceApp;

if (!cached) {
    cached = global.mongooseFinanceApp = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: 'financeApp', // Explicitly connect to the correct DB
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
