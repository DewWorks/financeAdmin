
export interface Transaction {
    id: string;
    user: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    type: 'subscription' | 'one-time';
}

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'TXN-001', user: 'Alice Admin', amount: 49.99, status: 'completed', date: '2024-01-29', type: 'subscription' },
    { id: 'TXN-002', user: 'Bob Manager', amount: 99.99, status: 'completed', date: '2024-01-28', type: 'subscription' },
    { id: 'TXN-003', user: 'Charlie User', amount: 15.00, status: 'failed', date: '2024-01-28', type: 'one-time' },
    { id: 'TXN-004', user: 'David User', amount: 200.00, status: 'pending', date: '2024-01-27', type: 'one-time' },
    { id: 'TXN-005', user: 'Alice Admin', amount: 12.00, status: 'completed', date: '2024-01-26', type: 'one-time' },
];

export const transactionService = {
    getTransactions(): Promise<Transaction[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...MOCK_TRANSACTIONS]), 600);
        });
    },

    getStats() {
        return {
            totalRevenue: 376.98,
            pending: 200.00,
            failed: 15.00
        };
    }
};
