import { registerUser, updateUser } from '@/store/slices/authSlice';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '@/context/toastContext';


const UserForm = ({ user, isSubmitting, isEditing = false }) => {
  const {showToast}=useToast()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    referenceNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    city: '',
    pincode: '',
    regAmount: '',
    status: 'pending',
    caste: '',
    gender: '',
    dob: '',
    fatherName: '',
    address: '',
    casteCategory: '',
    storeAddress: '',
    storeMap: ''
  });

  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleDocumentsChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocuments(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!isEditing && !formData.password) newErrors.password = 'Password is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    // Password strength validation (only on create)
    if (!isEditing && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      let response;
      const formDataToSend = new FormData();
      
      // Add text data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Add files
      if (photo) {
        formDataToSend.append('photo', photo);
      }
      
      if (documents.length > 0) {
        documents.forEach(file => {
          formDataToSend.append('documents', file);
        });
      }
      if (isEditing) {
        response = await dispatch(updateUser({ 
          id: user._id, 
          data: formDataToSend 
        })).unwrap();
        if (response.status === 200) {
          showToast(response.message || 
           'User updated successfully!' ,'success');
   
        } 
      } else {
        response = await dispatch(registerUser(formDataToSend)).unwrap();
        if (response.status === 200) {
          showToast(response.message || 
           'User created successfully!' ,'success');
      
        } 
      }
      
 
    } catch (error) {
      showToast(error.message || 'An error occurred. Please try again.','error');

    } 
  };

 
  return (
    <div className="relative">
      {/* Modal for Success/Error Messages */}
 

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Personal Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference Number
              </label>
              <input
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                placeholder="Enter reference number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First name"
                  className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last name"
                  className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email address"
                className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            {!isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                    className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone number"
                className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Father's Name
              </label>
              <input
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>


            <div>
        <label className="block text-sm font-medium mb-1">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full text-sm text-gray-500"
        />
        {photo && (
          <div className="mt-2 flex items-center">
            <p className="text-sm text-gray-600 mr-3">
              Selected: {photo.name}
            </p>
            <div className="w-16 h-16 border rounded-md overflow-hidden">
              <img 
                src={URL.createObjectURL(photo)} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Documents */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Documents (PDF or Images)
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleDocumentsChange}
          className="w-full text-sm text-gray-500"
        />
        {documents.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Selected files:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {documents.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
          </div>
          
          {/* Address and Registration Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Address & Registration
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="State"
                className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">{errors.state}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode *
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                placeholder="Pincode"
                className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.pincode && (
                <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste
              </label>
              <input
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                placeholder="Caste"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste Category
              </label>
              <select
                name="casteCategory"
                value={formData.casteCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select category</option>
                <option value="gen">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Address
              </label>
              <textarea
                name="storeAddress"
                value={formData.storeAddress}
                onChange={handleChange}
                placeholder="Store address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows="2"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Map URL
              </label>
              <input
                name="storeMap"
                value={formData.storeMap}
                onChange={handleChange}
                placeholder="Map URL"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Amount
              </label>
              <input
                name="regAmount"
                value={formData.regAmount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update User' : 'Create User'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;