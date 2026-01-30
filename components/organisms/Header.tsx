'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Bell, Search, User } from 'lucide-react';

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
            <div className="flex-1">
                {/* Search Bar - Hidden for now as requested or simple implementation */}
                {/* <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
          </div> */}
                <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
            </Button>
        </header>
    );
}
