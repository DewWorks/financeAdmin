import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export default async function DebugDBPage() {
    await connectToDatabase();

    // FORCE RECONNECT TRICK: If connected to wrong DB, disconnect.
    if (mongoose.connection.readyState === 1 && mongoose.connection.db?.databaseName !== 'financeApp') {
        console.log('Wrong DB detected (' + mongoose.connection.db?.databaseName + '). Disconnecting...');
        await mongoose.disconnect();
    }

    // If disconnected, reconnect explicitly
    if (mongoose.connection.readyState !== 1) {
        console.log('Connecting to financeApp...');
        await mongoose.connect(process.env.FINANCEPRO_URI!, { dbName: 'financeApp', bufferCommands: false });
    }

    const db = mongoose.connection.db;
    const dbName = db ? db.databaseName : 'Unknown';

    let collectionsInfo = [];
    let usersFound = [];
    let collectionsList = [];

    try {
        if (db) {
            const cols = await db.listCollections().toArray();
            collectionsList = cols.map(c => c.name);

            for (const col of cols) {
                const count = await db.collection(col.name).countDocuments();
                collectionsInfo.push({ name: col.name, count });
            }
        }

        usersFound = await User.find({}).limit(5).lean();

    } catch (e: any) {
        return <div>Error: {e.message}</div>
    }

    return (
        <div className="p-10 font-mono text-sm max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Database Debugger (Fixed)</h1>

            <div className="mb-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
                <h2 className="font-bold text-lg mb-2">Connection Info</h2>
                <div className="grid grid-cols-2 gap-2">
                    <div>Status:</div>
                    <div>{mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}</div>

                    <div>Database Name:</div>
                    <div className="font-bold text-green-600">{dbName}</div>

                    <div>User Model Collection:</div>
                    <div>{User.collection.collectionName}</div>
                </div>
            </div>

            <div className="mb-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
                <h2 className="font-bold text-lg mb-2">Collections in DB</h2>
                <ul className="list-disc pl-5">
                    {collectionsInfo.length === 0 && <li>No collections found (Check permissions or DB name)</li>}
                    {collectionsInfo.map(c => (
                        <li key={c.name}>
                            <span className="font-bold">{c.name}</span>: {c.count} documents
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
                <h2 className="font-bold text-lg mb-2">Sample Users (via Mongoose Model)</h2>
                {usersFound.length === 0 ? (
                    <p className="text-red-500">No users found in collection "{User.collection.collectionName}"</p>
                ) : (
                    <pre className="bg-black text-white p-4 rounded overflow-auto max-h-96">
                        {JSON.stringify(usersFound, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}
