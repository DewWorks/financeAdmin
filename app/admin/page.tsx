import { StatCard } from '@/components/molecules/StatCard';
import { Users, DollarSign, Activity, AlertCircle } from 'lucide-react';
import { RevenueChart } from '@/components/organisms/RevenueChart';
import { RealTimeLogConsole } from '@/components/organisms/RealTimeLogConsole';
import { getStats, getRevenueHistory } from '@/lib/services/transactionService';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const stats = await getStats();
    const revenueHistory = await getRevenueHistory();

    // Calculate generic trend (Mock logic for trend direction if history is empty)
    // In a real scenario, we'd compare current month vs last month
    const currentMonthIndex = new Date().getMonth(); // 0-11
    // Use last available data point as current if index mismatch or just take last element
    const currentMonthRev = revenueHistory[revenueHistory.length - 1]?.total || 0;
    const lastMonthRev = revenueHistory[revenueHistory.length - 2]?.total || 0;

    const trendPercent = lastMonthRev > 0
        ? ((currentMonthRev - lastMonthRev) / lastMonthRev) * 100
        : 0;

    const trendDir = trendPercent > 0 ? 'up' : trendPercent < 0 ? 'down' : 'neutral';

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    description="Total earnings this year"
                    trend={trendDir}
                    trendValue={`${Math.abs(trendPercent).toFixed(1)}%`}
                />
                <StatCard
                    title="Active Users"
                    value={stats.activeUsers ? stats.activeUsers.toString() : '0'}
                    icon={Users}
                    description="Active ecosystem users"
                    trend="up"
                    trendValue="+5%"
                />
                <StatCard
                    title="Pending Transactions"
                    value={stats.pending.toString()}
                    icon={Activity}
                    description="Requires attention"
                    trend="neutral"
                    trendValue="Waiting"
                />
                <StatCard
                    title="Failed Transactions"
                    value={stats.failed.toString()}
                    icon={AlertCircle}
                    description="Failed payments"
                    trend="down"
                    trendValue="-2%"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <RevenueChart data={revenueHistory} />
                </div>
                <div className="col-span-3">
                    <RealTimeLogConsole />
                </div>
            </div>
        </div>
    );
}
