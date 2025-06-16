'use client';

import Sidebar from '@/components/Admin/SideBar';

export default function DashboardLayout({ children }) {


  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}