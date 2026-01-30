'use client';

import { useState, useEffect } from 'react';
import { transactionService, Transaction } from '@/lib/services/transactionService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { format } from 'date-fns';

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        transactionService.getTransactions().then(setTransactions);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {transactions.map(txn => (
                                <tr key={txn.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{txn.id}</td>
                                    <td className="p-4 align-middle">{txn.user}</td>
                                    <td className="p-4 align-middle">{txn.date}</td>
                                    <td className="p-4 align-middle">${txn.amount.toFixed(2)}</td>
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
