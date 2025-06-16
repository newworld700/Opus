'use client';
import UserForm from '@/components/Admin/UserForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateUserPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Register New User</h1>
        <button 
          onClick={() => router.push('/admin/dashboard/registered')}
          className="text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <UserForm 
         
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}