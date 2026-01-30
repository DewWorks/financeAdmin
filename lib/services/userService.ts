import { User } from '@/components/molecules/UserRow';

const MOCK_USERS: User[] = [
    { id: '1', name: 'Alice Admin', email: 'alice@finance.pro', role: 'admin', status: 'active', lastActive: 'Just now' },
    { id: '2', name: 'Bob Manager', email: 'bob@finance.pro', role: 'manager', status: 'active', lastActive: '2 min ago' },
    { id: '3', name: 'Charlie User', email: 'charlie@client.com', role: 'user', status: 'blocked', lastActive: '5 days ago' },
    { id: '4', name: 'David User', email: 'david@client.com', role: 'user', status: 'active', lastActive: '1 hour ago' },
    { id: '5', name: 'Eve Hacker', email: 'eve@sus.com', role: 'user', status: 'pending', lastActive: 'Never' },
];

export const userService = {
    getUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...MOCK_USERS]), 500);
        });
    },

    updateUser(id: string, data: Partial<User>): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userIndex = MOCK_USERS.findIndex(u => u.id === id);
                if (userIndex > -1) {
                    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data };
                    resolve(MOCK_USERS[userIndex]);
                }
            }, 500);
        });
    }
};
