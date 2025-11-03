// File: src/app/api/signup/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // xử lý logic signup, ví dụ:
    const { email, password } = body;

    // TODO: save user vào DB (tuỳ bạn dùng Firebase, Supabase, Prisma, v.v...)
    return NextResponse.json({ success: true, email });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
