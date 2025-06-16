import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { generateOtp, login } from '@/store/slices/authSlice';

export default function AuthForm() {
  const dispatch=useDispatch()
  
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await dispatch(generateOtp({email})).unwrap();
      setStep('otp');
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      const response=await dispatch(login({email,otp})).unwrap()
      if(response.status===200){

        router.push('/admin/dashboard');
      }
   

    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Admin Login</h2>
        <p className="text-gray-600">
          {step === 'email' 
            ? 'Enter your email to receive OTP' 
            : `Enter OTP sent to ${email}`}
        </p>
      </div>

      {step === 'email' ? (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <button
            onClick={handleSendOTP}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setStep('email')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors flex justify-center items-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Login'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}