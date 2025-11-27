import { NextRequest, NextResponse } from 'next/server';
import { apiFetch } from '@/lib/apiClient';

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.json(
      { message: 'You must be logged in to checkout.' },
      { status: 401 },
    );
  }

  const body = await req.json();

  try {
    const order = await apiFetch('/orders', {
      method: 'POST',
      token: accessToken,
      body,
    });
    return NextResponse.json(order);
  } catch (err) {
    const msg = (err as Error).message ?? 'Failed to create order';
    return NextResponse.json({ message: msg }, { status: 400 });
  }
}


