'use client';

import { StatCard } from '@/components/molecules/StatCard';
import { RealTimeLogConsole } from '@/components/organisms/RealTimeLogConsole';
import { RevenueChart } from '@/components/organisms/RevenueChart';
import { Users, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { AlertBanner } from '@/components/molecules/AlertBanner';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value="$45,231.89"
                    icon={DollarSign}
                    description="+20.1% from last month"
                    trend="up"
                    trendValue="20.1%"
                />
                <StatCard
                    title="Active Users"
                    value="+2350"
                    icon={Users}
                    description="+180 new users"
                    trend="up"
                    trendValue="180"
                />
                <StatCard
                    title="System Health"
                    value="99.9%"
                    icon={Activity}
                    description="All systems operational"
                    trend="neutral"
                    trendValue="0%"
                />
                <StatCard
                    title="Pending Issues"
                    value="12"
                    icon={AlertTriangle}
                    description="+2 since last hour"
                    trend="down"
                    trendValue="2"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <RevenueChart />
                <div className="col-span-4 lg:col-span-3">
                    <RealTimeLogConsole />
                </div>
            </div>

            {/* Example Global Alerts */}
            <div className="grid gap-4 md:grid-cols-2">
                <AlertBanner
                    variant="warning"
                    title="FinancePage Latency Warning"
                    description="Response times for financePage are higher than usual (400ms)."
                />
                <AlertBanner
                    variant="success"
                    title="Backup Completed"
                    description="Daily database backup for FinancePro completed successfully at 03:00 AM."
                />
            </div>
        </div>
    );
}
