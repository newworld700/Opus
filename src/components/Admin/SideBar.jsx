import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UsersIcon } from 'lucide-react';
import { UserCogIcon } from 'lucide-react';
import { PlusCircleIcon } from 'lucide-react';
import { LogOutIcon } from 'lucide-react';
import { CogIcon } from 'lucide-react';
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => {
    return pathname.includes(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="bg-white p-1 rounded-lg">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Dealership Admin</h1>
          <p className="text-indigo-300 text-sm">Management Dashboard</p>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-1">
          <Link
            href="/admin/dashboard/applied"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive('applied') 
                ? 'bg-indigo-700 text-white' 
                : 'text-indigo-200 hover:bg-indigo-700'
            }`}
          >
            <UsersIcon className="h-5 w-5 mr-3" />
            Applied Users
          </Link>
          
          <Link
            href="/admin/dashboard/registered"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive('registered') 
                ? 'bg-indigo-700 text-white' 
                : 'text-indigo-200 hover:bg-indigo-700'
            }`}
          >
            <UserCogIcon className="h-5 w-5 mr-3" />
            Registered Users
          </Link>
          
          <Link
            href="/admin/dashboard/create"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive('create') 
                ? 'bg-indigo-700 text-white' 
                : 'text-indigo-200 hover:bg-indigo-700'
            }`}
          >
            <PlusCircleIcon className="h-5 w-5 mr-3" />
            Create New User
          </Link>
          
          <button
            className="flex items-center w-full px-4 py-3 text-indigo-200 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <CogIcon className="h-5 w-5 mr-3" />
            Settings
          </button>
        </nav>
      </div>
      
      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-indigo-200 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <LogOutIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}