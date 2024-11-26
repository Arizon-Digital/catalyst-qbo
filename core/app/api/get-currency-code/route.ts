import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (
  _request: NextRequest
) => {
  let cookieStore = await cookies();
  return NextResponse.json({currencyCode: cookieStore.get('currencyCode')?.value});
};

export const runtime = 'edge';
