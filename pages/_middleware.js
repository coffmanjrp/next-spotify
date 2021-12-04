import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (req) => {
  // token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // allow the requests if the followings are true
  // 1) its a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // redirect to login if dont have token and are requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
};
