import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground flex">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-6 space-y-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
