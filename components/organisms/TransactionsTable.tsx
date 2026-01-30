'use client';

import { useState, useEffect } from 'react';
import { getTransactions, TransactionType } from '@/lib/services/transactionService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

    return (
        <Card className="border-none shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl font-medium">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border bg-white dark:bg-zinc-900 overflow-hidden">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">ID</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">User</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Date</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Amount</th>
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {transactions.map(txn => (
                                <tr key={txn.id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                    <td className="p-4 align-middle font-medium text-xs text-muted-foreground">{txn.id.substring(0, 8)}...</td>
                                    <td className="p-4 align-middle font-medium">{txn.user}</td>
                                    <td className="p-4 align-middle text-muted-foreground">{txn.date}</td>
                                    <td className="p-4 align-middle font-medium">${txn.amount.toFixed(2)}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={txn.status === 'completed' ? 'success' : txn.status === 'failed' ? 'destructive' : 'warning'}>
                                            {txn.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
