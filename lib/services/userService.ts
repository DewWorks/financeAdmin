'use server';

import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { User as UserType } from '@/components/molecules/UserRow';

export async function getUsers(): Promise<UserType[]> {
    await connectToDatabase();

    const docs = await User.find({}).sort({ createdAt: -1 }).limit(50).lean();

    return docs.map((doc: any) => ({
        id: doc._id.toString(),
        name: doc.name || 'Unknown',
        email: doc.email,
        role: doc.admin ? 'admin' : 'user',
        status: doc.status || 'active', // Assuming status field exists or defaulting
        lastActive: doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'N/A'
    }));
}

export async function updateUser(id: string, data: Partial<UserType>): Promise<UserType | null> {
    await connectToDatabase();
    // Implementation for update if needed
    return null;
}
