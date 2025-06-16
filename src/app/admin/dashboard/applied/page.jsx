'use client';
import { useState, useEffect } from 'react';
import AppliedTable from '@/components/Admin/AppliedTable';

import { useDispatch, useSelector } from 'react-redux';
import { getapplyUser } from '@/store/slices/authSlice';

export default function AppliedUsersPage() {


  const dispatch=useDispatch()

  const {appliedUser,loading}=useSelector((state)=>state.auth);
  useEffect(() => {
  dispatch(getapplyUser())

  }, [dispatch]);
 
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Applied Users</h1>
        <div className="text-gray-500">{appliedUser.length} records found</div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <AppliedTable />
      )}
    </div>
  );
}