'use client';
import { useState, useEffect } from 'react';
import RegisteredTable from '@/components/Admin/RegisteredTable';
import { mockRegisteredUsers } from '@/lib/data';
import Link from 'next/link';
import { useDispatch,useSelector } from 'react-redux';
import { getregisterdUser } from '@/store/slices/authSlice';
export default function RegisteredUsersPage() {


  const dispatch=useDispatch()

  const {loading}=useSelector((state)=>state.auth);
  useEffect(() => {
  dispatch(getregisterdUser())

  }, [dispatch]);



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Registered Users</h1>
        <Link href="/admin/dashboard/create" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Create New User
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <RegisteredTable  />
      )}
    </div>
  );
}