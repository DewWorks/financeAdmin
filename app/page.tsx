import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { ShieldCheck, Server, Database, Globe, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b bg-white dark:bg-black">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">FinancePro Admin</span>
        </div>
        <Link href="/login">
          <Button>Login to Console</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
          System Administration & <br className="hidden sm:inline" />
          <span className="text-primary">Ecosystem Monitoring</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
          Centralized control plane for FinancePro and FinancePage services.
          Monitor transactions, manage users, and view real-time system logs from a secure environment.
        </p>

        {/* Status Grid */}
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto text-left">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">FinancePro API</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                Online
                <Badge variant="success" className="h-5">99.9% Uptime</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Latency: 45ms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Primary Database</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                Healthy
                <Badge variant="success" className="h-5">Synced</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Connections: 124 Active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">FinancePage Web</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                Operational
                <Badge variant="success" className="h-5">Live</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last Deploy: 2h ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-16 flex justify-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Lock className="h-4 w-4" />
            This system is restricted to authorized administrators only.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t text-center text-sm text-muted-foreground bg-white dark:bg-black">
        &copy; {new Date().getFullYear()} FinancePro Ecosystem. All rights reserved.
      </footer>
    </div>
  );
}
