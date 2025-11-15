export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

const SECRET = process.env.ADMIN_PASSWORD!;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_key';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== SECRET) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '2h' });
  const response = NextResponse.json({ success: true });

  response.cookies.set('admin_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 2 * 60 * 60, // 2 hours
    sameSite: 'lax',
  });

  return response;
}
