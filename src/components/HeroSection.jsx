"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDispatch,useSelector } from "react-redux";

import { AnimatePresence,motion } from "framer-motion";
import { useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "@/store/slices/authSlice";



const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch=useDispatch()

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format");
      return;
    }
    
    // Mock authentication
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try{
  const response=await dispatch(loginUser({email,password})).unwrap()
  if(response.status===200){
  
  }
    }catch(error){
      setError(error.message||"An error occurred while login");
    }

    // Clear error on success
    setError("");
    onLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-md  text-gray-800 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          
          <div className="mb-4 ">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            Sign In
          </Button>
        </form>
      </motion.div>
    </div>
  );
};






const HeroSection = () => {

  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const dispatch=useDispatch()
 const {isAuthenticated,user} =useSelector((state)=>state.auth)


  const handleLogin = () => {
    setShowLoginModal(false);
    router.push("/dashboard");
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    setIsLoggedIn(false);
  };
    
const slides = [
    {
      title: 'Opus Paint Partner',
      content: 'Step into Birla Opus Paints, a realm where painting excellence is pioneered through imagination. We go beyond aesthetics to create beautiful spaces with thoughtful innovations that bring inspiration to life.',
    },
    {
      title: 'Opus Goal',
      content: 'Today announced the launch of products and services under its new decorative paints brand, “Birla Opus”, aiming for Rs. 10,000 Cr gross revenue within 3 years of full-scale operations.',
    },
    {
      title: 'Opus Goal',
      content: 'Transforming Paint Retail: Birla Opus Franchise stores play a key role in premium & luxury products, painting services, e-commerce fulfilment & Brand experience.',
    },
  ]



  const [index, setIndex] = useState(0);



  return (
    <div className="relative  bg-gradient-to-b from-gray-100 to-[#fef0e3]">
      {/* Header with logo */}
      
      <div className="absolute top-6 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <Image
              src="/birla.png"
              alt="Birla Opus Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated  ? (
              <div 
                onClick={() => router.push('/dashboard')}
                className="flex items-center cursor-pointer group bg-gray-200 px-2 py-1 rounded-xl"
              >
                {user?.profile ? (
                  <Image
                    src={user.photo}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-orange-500"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Profile</span>
                  </div>
                )}
                <span className="ml-2 text-gray-600 font-medium group-hover:underline">
                  {user?.firstName} {user?.lastName }
                </span>
              </div>
            ) : null}
            
            <Button 
              onClick={isAuthenticated ? handleLogout : () => setShowLoginModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-semibold"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
      {/* Store Image */}
      <div className="pt-24 pb-16 lg:pb-24">
      <img
    src="/opus.webp"
    alt="Opus Store Showcase"
    className="w-full h-[250px] object-cover 
               md:h-[580px] md:object-cover 
               sm:h-auto sm:object-contain"
  />
</div>
      <div className="max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto px-4 pt-2 lg:pt-16 text-center pb-8 lg:pb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{slides[index].title}</h1>
          <p className="text-sm lg:text-lg text-gray-800 leading-relaxed mb-8 px-4">
            {slides[index].content}
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 mt-4 text-lg font-semibold transition-colors">
            Apply Dealership
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots with hover-to-slide */}
      <div className="flex justify-center mt-8 lg:mt-24 space-x-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => setIndex(i)} // Change slide on hover
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? "bg-gray-900 scale-110" : "bg-orange-300"
            }`}
          />
        ))}
      </div>
    </div>
    <hr className="h-[2px] w-full bg-black"/>
    </div>
       <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
        
</div>
  );
};

export default HeroSection;