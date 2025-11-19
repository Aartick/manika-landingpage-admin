import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('adminToken')?.value;

  if (!token) return NextResponse.json({ admin: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ admin: true });
  } catch {
    return NextResponse.json({ admin: false });
  }
}
