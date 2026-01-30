'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { User, UserRow } from '@/components/molecules/UserRow';
import { getUsers, updateUser } from '@/lib/services/userService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/Card';
import { SearchBar } from '@/components/molecules/SearchBar';

export function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const handleEdit = async (id: string) => {
        console.log('Edit user', id);
        // Future: Open modal
    };

    const handleBlock = async (id: string) => {
        console.log('Block user', id);
        // Future: Call updateUser(id, { status: 'blocked' })
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Card className="border-none shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-medium">Users</CardTitle>
                        <CardDescription>Manage ecosystem users.</CardDescription>
                    </div>
                    <div className="w-[300px]">
                        <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border bg-white dark:bg-zinc-900 overflow-hidden">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">User</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Role</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Status</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Last Active</th>
                                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredUsers.map(user => (
                                <UserRow key={user.id} user={user} onEdit={handleEdit} onBlock={handleBlock} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
