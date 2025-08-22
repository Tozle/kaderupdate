// Simple rate limiting middleware (memory, for demo only)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT = 10; // max 10 requests
const WINDOW = 60 * 1000; // pro Minute
const ipMap = new Map<string, { count: number; time: number }>();

export function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const entry = ipMap.get(ip) || { count: 0, time: now };
    if (now - entry.time > WINDOW) {
        entry.count = 1;
        entry.time = now;
    } else {
        entry.count++;
    }
    ipMap.set(ip, entry);
    if (entry.count > RATE_LIMIT) {
        return new NextResponse('Rate limit exceeded', { status: 429 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/(.*)'],
};
