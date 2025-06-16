'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardHome() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/admin/dashboard/applied');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}