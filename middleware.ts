import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/admin'];
const publicRoutes = ['/login', '/'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value;
    const session = cookie ? await decrypt(cookie) : null;

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // 5. Redirect to /admin if the user is authenticated and tries to access /login
    if (session?.userId && path.startsWith('/login')) {
        return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
