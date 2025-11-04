import authApiRequest from '@/apiRequests/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    // Gọi API đăng ký ở backend
    const { payload } = await authApiRequest.SRegister(body);

    // Lưu access token và refresh token vào cookie
    const { accessToken, refreshToken } = payload.data;

    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return Response.json(payload);
  } catch (error) {
    const errorResponse = error as {
      payload?: { message?: string };
      status?: number;
    };
    return Response.json(
      {
        message: errorResponse?.payload?.message || 'Đăng ký thất bại',
      },
      {
        status: errorResponse?.status || 500,
      }
    );
  }
}
