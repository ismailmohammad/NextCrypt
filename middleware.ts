import { NextRequest, NextResponse } from 'next/server';
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = ['/','/login', '/login/verify', '/login/register'].includes(path);
  console.log("is public", isPublic)
  const token = request.cookies.get('auth_token')?.value || '';
  if(isPublic && token && path !== '/') {
    return NextResponse.redirect(new URL('/dash', request.nextUrl))
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/login/register',
    '/login/verify',
    '/dash'
  ]
}