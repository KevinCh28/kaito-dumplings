import { NextRequest, NextResponse } from 'next/server';
import { verfiyGuest, createGuestToken } from './lib/guestAuth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('guest')?.value;
  const response = NextResponse.next();

  const verifiedToken = 
    token && 
    (await verfiyGuest(token).catch((err) => {
      console.log(err);
  }));

  if (!verifiedToken) {
    const newToken = await createGuestToken();
    response.cookies.set('guest', newToken);
  }

  return response;
};

export const config = {
  matcher: ['/',],
};