'use client';

import { useActionState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/atoms/Card';
import { login } from '@/lib/actions/auth';
import { ShieldCheck } from 'lucide-react';
import { Spinner } from '@/components/atoms/Spinner';

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center items-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the Finance Admin Dashboard.
                    </CardDescription>
                </CardHeader>
                <form action={action}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@finance.pro"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {state?.error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {state.error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" loading={isPending}>
                            Sign In
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
