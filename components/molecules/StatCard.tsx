import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    trendValue,
}: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">
                        {trend && (
                            <span
                                className={cn('mr-1 font-medium', {
                                    'text-green-500': trend === 'up',
                                    'text-red-500': trend === 'down',
                                    'text-yellow-500': trend === 'neutral',
                                })}
                            >
                                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
