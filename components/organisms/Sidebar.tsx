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
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={cn(
                "flex flex-col h-screen w-64 bg-zinc-950 text-white border-r border-zinc-900/50 fixed left-0 top-0 z-50 transition-transform duration-200 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="p-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <Text variant="h3" className="text-base font-semibold m-0 p-0 !mt-0 tracking-tight text-white">AdminPro</Text>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Finance Control</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.href}
                            variant="ghost"
                            className={cn(
                                'w-full justify-start h-10 px-4 rounded-md transition-all duration-200',
                                pathname === item.href
                                    ? 'bg-indigo-600/10 text-indigo-400 font-medium'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                            )}
                            asChild
                            onClick={onClose}
                        >
                            <Link href={item.href}>
                                <item.icon className={cn("mr-3 h-4 w-4", pathname === item.href && "text-indigo-400")} />
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </div>

                <div className="p-4 border-t border-zinc-900">
                    <form action={logout}>
                        <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-950/20">
                            <LogOut className="mr-3 h-4 w-4" />
                            Logout
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
