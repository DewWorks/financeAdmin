'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Activity,
    Settings,
    LogOut,
    ShieldCheck
} from 'lucide-react';
import { Text } from '@/components/atoms/Text';
import { logout } from '@/lib/actions/auth';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: CreditCard, label: 'Transactions', href: '/admin/transactions' },
    { icon: Activity, label: 'System Logs', href: '/admin/logs' },
    // { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen w-64 bg-card border-r fixed left-0 top-0 z-30">
            <div className="p-6 flex items-center gap-2 border-b">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <Text variant="h3" className="text-xl m-0 p-0 !mt-0">AdminPro</Text>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Button
                        key={item.href}
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className={cn(
                            'w-full justify-start',
                            pathname === item.href && 'bg-secondary font-medium'
                        )}
                        asChild
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Link>
                    </Button>
                ))}
            </div>

            <div className="p-4 border-t">
                <form action={logout}>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
}
