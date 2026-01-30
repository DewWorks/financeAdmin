'use client';

import { useState, useEffect } from 'react';
import { User, UserRow } from '@/components/molecules/UserRow';
import { userService } from '@/lib/services/userService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/Card';
import { SearchBar } from '@/components/molecules/SearchBar';

export function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        userService.getUsers().then(setUsers);
    }, []);

    const handleEdit = (id: string) => {
        console.log('Edit user', id);
        alert(`Edit user ${id}`);
    };

    const handleBlock = (id: string) => {
        console.log('Block user', id);
        alert(`Block/Unblock user ${id}`);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Manage your users and their permissions.</CardDescription>
                    </div>
                    <div className="w-[300px]">
                        <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-x-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
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
