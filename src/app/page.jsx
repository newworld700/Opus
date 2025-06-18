'use client';
import AuthForm from '@/components/Admin/AuthForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const router=useRouter()
  const {isAuthenticated}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isAuthenticated){
      router.push('/admin/dashboard/applied');
    }
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <AuthForm />
    </div>
  );
}