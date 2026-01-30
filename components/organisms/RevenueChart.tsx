'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/Card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface RevenueChartProps {
    data: { name: string; total: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <Card className="col-span-4 border-none shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl font-medium">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue transaction data (Last 6 Months).</CardDescription>
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
