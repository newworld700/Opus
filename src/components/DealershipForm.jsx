"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from 'react-redux';
import { applyUser } from '@/store/slices/authSlice';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

const DealershipForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    pincode: '',
    investmentRange: '',
    franchiseType: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    if (!formData.investmentRange) newErrors.investmentRange = 'Investment range is required';
    if (!formData.franchiseType) newErrors.franchiseType = 'Franchise type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: '',
      city: '',
      pincode: '',
      investmentRange: '',
      franchiseType: ''
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await dispatch(applyUser(formData)).unwrap();

      if (response.status === 200) {
      
        setShowSuccessModal(true);
        resetForm();
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        error.message || 
        error.response?.data?.message || 
        'An error occurred while submitting your application. Please try again.'
      );
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full bg-[#fef0e3] px-2'>
      <div className="max-w-6xl mx-auto py-16">
        <Card className="bg-white overflow-hidden">
          <CardHeader className="bg-white py-6">
            <CardTitle className="text-2xl lg:text-3xl font-bold text-orange-500 text-center">
              APPLY FOR BIRLA PAINT DEALERSHIP
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* First Name */}
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-gray-700">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500 focus:border-dotted focus:border-blue-800"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-gray-700">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-gray-700">Email Id *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Id"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <Label htmlFor="mobile" className="text-gray-700">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="91xxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-1">
                  <Label htmlFor="state" className="text-gray-700">Your State Name *</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="Your State Name"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1">
                  <Label htmlFor="city" className="text-gray-700">Your City name *</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Your City name"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>

                {/* Pin Code */}
                <div className="space-y-1">
                  <Label htmlFor="pinCode" className="text-gray-700">Your area Pin Code *</Label>
                  <Input
                    id="pinCode"
                    type="text"
                    placeholder="Your area Pin Code"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="h-10 border-gray-700 bg-white text-orange-500"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm">{errors.pincode}</p>
                  )}
                </div>

                {/* Investment */}
                <div className="space-y-1">
                  <Label htmlFor="investment" className="text-gray-700">Investment Range *</Label>
                  <Select 
                    value={formData.investmentRange} 
                    onValueChange={(value) => handleInputChange('investmentRange', value)}
                  >
                    <SelectTrigger className="h-10 border-gray-700 bg-white text-orange-500">
                      <SelectValue placeholder="Select your investment" />
                    </SelectTrigger>
                    <SelectContent className="text-orange-500 bg-white">
                      <SelectItem value="3 to 5">3 Lakh to 5 Lakh</SelectItem>
                      <SelectItem value="5 to 10">5 Lakh to 10 Lakh</SelectItem>
                      <SelectItem value="above 10">10 Lakh Above</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.investmentRange && (
                    <p className="text-red-500 text-sm">{errors.investmentRange}</p>
                  )}
                </div>
              </div>

              {/* Franchise Type */}
              <div className="space-y-1">
                <Label htmlFor="franchiseType" className="text-gray-700">Franchise Type *</Label>
                <Select 
                  value={formData.franchiseType} 
                  onValueChange={(value) => handleInputChange('franchiseType', value)}
                >
                  <SelectTrigger className="h-10 border-gray-700 bg-white text-orange-500">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="text-orange-500 bg-white">
                    <SelectItem value="dealership">Dealership</SelectItem>
                    <SelectItem value="distributorship">Distributorship</SelectItem>
                    <SelectItem value="super stockiest">Super Stockiest (C&F)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.franchiseType && (
                  <p className="text-red-500 text-sm">{errors.franchiseType}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-lg transition-colors mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader className="bg-green-100 py-4">
              <CardTitle className="text-green-700 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                Application Submitted!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your dealership application has been submitted successfully.
                </p>
              
                
                <p className="text-gray-600 text-sm">
                  Our team will review your application and contact you shortly.
                  
                </p>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-opacity-80 backdrop-blur flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader className="bg-red-100 py-4">
              <CardTitle className="text-red-700 flex items-center gap-2">
                <XCircle className="h-6 w-6" />
                Submission Error
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  {errorMessage}
                </p>
                
                <p className="text-gray-600 text-sm">
                  Please check your information and try again. If the problem persists, 
                  contact our support team.
                </p>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="flex-1 border-gray-300"
                    onClick={() => setShowErrorModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      setShowErrorModal(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DealershipForm;