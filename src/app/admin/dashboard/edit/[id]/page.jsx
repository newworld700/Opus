'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import UserForm from '@/components/Admin/UserForm';
import { mockRegisteredUsers } from '@/lib/data';
import { useDispatch, useSelector } from 'react-redux';
import { getregisterdUserByid} from '@/store/slices/authSlice';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch=useDispatch()
  const [userd, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {user,loading}=useSelector((state)=>state.auth);

  useEffect(() => {
   if(params.id){
    const id=params.id
    dispatch(getregisterdUserByid({id}))
    setUser(user)
   }
    
  }, [dispatch]);
 


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">User not found</h2>
        <button 
          onClick={() => router.push('/admin/dashboard/registered')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Back to registered users
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
        <button 
          onClick={() => router.push('/admin/dashboard/registered')}
          className="text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <UserForm 
          user={user} 
   
          isSubmitting={isSubmitting}
          isEditing={true}
        />
      </div>
    </div>
  );
}