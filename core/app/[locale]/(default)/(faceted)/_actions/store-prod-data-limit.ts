'use server';
import { cookies } from 'next/headers';

export async function storeProductLimitInCookies(limit: number) {
  (await cookies()).set({
    name: 'productLimit',
    value: limit.toString(),
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
  });
}
