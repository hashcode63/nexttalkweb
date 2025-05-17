// src/app/login/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  return <AuthForm mode={mode} />;
}