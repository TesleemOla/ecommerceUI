import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken, user } = body as {
    accessToken: string;
    user: { role?: string };
  };

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Missing access token' },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
  if (user?.role) {
    res.cookies.set('userRole', user.role, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
  }
  return res;
}

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const role = req.cookies.get('userRole')?.value;

  return NextResponse.json({
    authenticated: Boolean(accessToken),
    role: role ?? null,
  });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
  res.cookies.set('userRole', '', { maxAge: 0, path: '/' });
  return res;
}

