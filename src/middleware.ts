import { NextRequest, NextResponse } from 'next/server';
import { verfiyGuest, createGuestToken } from './lib/guestAuth';
import { useUser } from '@auth0/nextjs-auth0/client';

export async function middleware(request: NextRequest) {
  const { user } = useUser();
  const token = request.cookies.get('guest')?.value;
  const response = NextResponse.next();

  const verifiedToken = 
    token && 
    (await verfiyGuest(token).catch((err) => {
      console.log(err);
  }));

  if (user && verifiedToken) {
    response.cookies.delete('guest');
    return response;
  } else if (user) {
    return;
  }

  if (!verifiedToken) {
    const newToken = await createGuestToken();
    response.cookies.set('guest', newToken);
  }

  return response;
};

export const config = {
  matcher: ['/',],
};