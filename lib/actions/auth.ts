'use server';

import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Please enter both email and password.' };
    }

    await connectToDatabase();

    try {
        // DEBUG: Check DB Connection Details
        if (mongoose.connection.db) {
            console.log('Connected to DB Name:', mongoose.connection.db.databaseName);
        }
        // Check if collection exists/name
        console.log('Querying Collection: users (via User model)');

        // DEBUG: Check if ANY user exists?
        const count = await User.countDocuments();
        console.log('Total Users in DB:', count);

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();
        console.log('Searching for:', normalizedEmail);

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            console.log('Error: User not found in DB.');
            // Try to find *any* similar user to see what's wrong
            const allUsers = await User.find({}).limit(3);
            console.log('Sample users in DB:', allUsers.map(u => u.email));

            return { error: 'Debug: User not found in database.' };
        }

        console.log('User found. Admin status:', user.admin);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return { error: 'Debug: Password does not match hash.' };
        }

        if (!user.admin) {
            console.log('Error: User is not admin.');
            return { error: 'Debug: User exists but is not an admin.' };
        }

        // Success - Create Session
        await createSession(user._id.toString());
        console.log('Session created successfully for user:', user._id);

    } catch (error) {
        console.error('Login error:', error);
        return { error: 'An unexpected error occurred.' };
    }

    redirect('/admin');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
