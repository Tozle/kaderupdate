// Next.js custom middleware for security headers (CSP, Referrer, X-Frame, etc.)
import { NextResponse } from 'next/server';

export function middleware() {
    const response = NextResponse.next();
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self';",
            "img-src 'self' data: https:;",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://plausible.io;",
            "script-src-elem 'self' https://plausible.io;",
            "frame-src 'self' https://www.youtube.com/;",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
            "font-src 'self' https://fonts.gstatic.com;",
            "connect-src 'self' https://*.supabase.co;",
            "frame-ancestors 'none';"
        ].join(' ')
    );
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    return response;
}

export const config = {
    matcher: '/:path*',
};
