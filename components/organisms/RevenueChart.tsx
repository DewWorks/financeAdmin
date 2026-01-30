'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/Card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const data = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 2100 },
    { name: 'Mar', total: 800 },
    { name: 'Apr', total: 1600 },
    { name: 'May', total: 900 },
    { name: 'Jun', total: 1700 },
    { name: 'Jul', total: 2400 },
];

export function RevenueChart() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue transaction data (Mock).</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                labelStyle={{ color: 'var(--foreground)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="currentColor"
                                strokeWidth={2}
                                dot={false}
                                className="stroke-primary"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
