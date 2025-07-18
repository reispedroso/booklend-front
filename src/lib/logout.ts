'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  // Obter instância de cookies com await
  const cookieStore = await cookies();
  
  // Método 1: Usando delete() (Next.js 14+)
  cookieStore.delete('token');
  
  // Método 2: Alternativo para versões mais antigas
  cookieStore.set({
    name: 'token',
    value: '',
    expires: new Date(0),  // Expira imediatamente
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  
  redirect('/login');
}