// app/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaUser, FaDownload, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "@/store/slices/authSlice";

export default function Dashboard() {
  const router = useRouter();
 
 
  const {user,loading,isAuthenticated}=useSelector((state)=>state.auth)
  const userData=user;
 const dispatch=useDispatch()
  const mockUserData = {
    referenceNumber: "REF-2023-0015",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    state: "Maharashtra",
    city: "Mumbai",
    pincode: "400001",
    photo: "/profile.jpg",
    regAmount: "₹50,000",
    status: "accepted",
    caste: "General",
    gender: "male",
    dob: new Date("1985-05-15"),
    fatherName: "Vijay Kumar",
    address: "123 Main Street, Andheri West",
    casteCategory: "gen",
    storeAddress: "456 Market Road, Near Railway Station",
    storeMap: "https://maps.google.com/store-location",
    createdAt: new Date("2023-06-01"),
    documents: [
      { name: "Aadhaar Card", url: "/docs/aadhaar.pdf" },
      { name: "PAN Card", url: "/docs/pan.pdf" },
      { name: "Business License", url: "/docs/license.pdf" }
    ]
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

  }, []);

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">No user data found</p>
          <Button 
            onClick={() => router.push("/")}
            className="mt-4 bg-orange-500 hover:bg-orange-600"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return "bg-green-100 text-green-800";
      case 'rejected':
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/birla.png"
              alt="Birla Opus Logo"
              width={80}
              height={80}
              className="mr-4"
            />
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Dealer Dashboard</h1>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative">
                {userData.photo ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.photo}`}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 flex items-center justify-center">
                    <FaUser className="text-gray-400 text-5xl" />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1">
                  <button className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600">
                    <FaEdit className="text-sm" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(userData.status)}`}>
                    {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                  </span>
                </div>
                
                <p className="mt-1 text-orange-100">
                  Reference ID: {userData.referenceNumber}
                </p>
                <p className="mt-2 flex flex-col items-center lg:flex-row lg:items-center justify-center md:justify-start">
  <span className="bg-white/20 rounded-lg px-3 py-1">
    {userData.email}
  </span>
  <span className="hidden lg:block mx-3">•</span>
  <span className="bg-white/20 rounded-lg px-3 py-1 mt-2 lg:mt-0">
    {userData.phone}
  </span>
</p>
              </div>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="mt-1 text-gray-900">
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Gender
                      </label>
                      <p className="mt-1 text-gray-900 capitalize">
                        {userData.gender}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Date of Birth
                      </label>
                      <p className="mt-1 text-gray-900">
                        {formatDate(userData.dob)}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Father's Name
                    </label>
                    <p className="mt-1 text-gray-900">
                      {userData.fatherName}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Caste
                      </label>
                      <p className="mt-1 text-gray-900">
                        {userData.caste}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Category
                      </label>
                      <p className="mt-1 text-gray-900 uppercase">
                        {userData.casteCategory}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="mt-1 text-gray-900">
                      {userData.address}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        City
                      </label>
                      <p className="mt-1 text-gray-900">
                        {userData.city}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        State
                      </label>
                      <p className="mt-1 text-gray-900">
                        {userData.state}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Pincode
                    </label>
                    <p className="mt-1 text-gray-900">
                      {userData.pincode}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Registration Amount
                    </label>
                    <p className="mt-1 text-gray-900 font-semibold">
                      {userData.regAmount}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Registration Date
                    </label>
                    <p className="mt-1 text-gray-900">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Information */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Store Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Store Address
                  </label>
                  <p className="mt-1 text-gray-900">
                    {userData.storeAddress}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Store Location
                  </label>
                  <a 
                    href={userData.storeMap} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-1 text-orange-600 hover:text-orange-800 inline-flex items-center"
                  >
                    View on Map
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            {userData.documents && userData.documents.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-200 rounded-lg p-3 mr-3">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <a 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-800 p-2 rounded-full hover:bg-orange-50"
                        title="Download"
                      >
                        <FaDownload />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
        
          </div>
        </div>
      </main>
    </div>
  );
}