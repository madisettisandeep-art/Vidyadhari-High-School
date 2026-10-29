import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Default admin credentials (customizable in production via env variables)
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'Vidyadhari@2026';

    if (username === validUsername && password === validPassword) {
      const response = NextResponse.json({ success: true, message: 'Authentication successful' });
      // Set secure session cookie
      response.cookies.set('vhs_admin_auth', 'authenticated_token_2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid administrative username or passcode.' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Server authentication error' }, { status: 500 });
  }
}
