// Beispiel für sichere Cookies in Next.js API-Routes
import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.json({ ok: true });
    response.cookies.set('kaderupdate_session', 'dummy', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 Woche
    });
    return response;
}
