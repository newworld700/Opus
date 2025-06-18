import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://opus-1.onrender.com/api/v0.1/admin/";
// const API_URL = "http://localhost:5000/api/v0.1/admin/";





export const checkAuth = createAsyncThunk("auth/check", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${API_URL}check`, { withCredentials: true });

    return { status: response.status, data: response.data };
  } catch (err) {
    localStorage.setItem('isAuthenticated', 'false');
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});




export const generateOtp = createAsyncThunk("auth/generateOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}generate-otp`, data, { withCredentials: true });
   
    return {
      status: response.status,
      data: response.data,
      message: response.data?.message || "Success",
    };
  } catch (err) {
    return rejectWithValue({
      status: err.response?.status || 400,
      data: err.response?.data || null,
      message: err.response?.data?.message || "Something went wrong",
    });
  }
});





export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}login`, data, { withCredentials: true });
   
    return { status: response.status, data: response.data,message:response.data.message||"success", };
  } catch (err) {
    return rejectWithValue({  message: err.response?.data?.message || "Something went wrong",data:err.response?.data || "Something went wrong"});
  }
});


export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}logOut`,{}, {  withCredentials: true });
  
    return { 
      message: response.data?.message || "Logged out successfully",
      status: response.status
    };

  } catch (err) {
    return rejectWithValue( err.response?.data?.message || 
      "Failed to logout. Please try again.");
  }
});


export const getapplyUser = createAsyncThunk("auth/getapply", async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}get-applied-user`,{ withCredentials: true });

      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });


  export const getregisterdUser = createAsyncThunk("auth/getregistered", async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}get-register-user`,{ withCredentials: true });

      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });


  export const getregisterdUserByid = createAsyncThunk("auth/getregisteredByid", async ({id}, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}get-register-user/${id}`,{ withCredentials: true });

      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });


  export const updateUser = createAsyncThunk("auth/updateUser", async ({id,data}, { rejectWithValue, dispatch }) => {
    try {
    
      const response = await axios.put(`${API_URL}update-register-user/${id}`,data,{ withCredentials: true });

      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });
  
  export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async ({id}, { rejectWithValue, dispatch }) => {
      try {
      
        const response = await axios.delete(
          `${API_URL}delete/${id}`, 
          {
            withCredentials: true,
          
          }
        );
  
        return { status: response.status, data: response.data };
      } catch (err) {
        return rejectWithValue(err.response?.data || "Something went wrong");
      }
    }
  );
  

  export const registerUser = createAsyncThunk("auth/registerUser", async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}register`,data,{ withCredentials: true });

      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });

  const initialState = {
    user: null,
    isAuthenticated: false,
    loading:false,
    authCheckComplete: false,
    appliedUser:[],
    registeredUser:[],
    message: null,
    error: null,
    errordata:null
  };
  
  // Auth Slice
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder

   // Handle Logout
   .addCase(logout.pending, (state) => {
    state.loading = true;
    state.error=null;
  })
  .addCase(logout.fulfilled, (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
  })
  .addCase(logout.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  //forget

// Generate OTP
.addCase(generateOtp.pending, (state) => {
state.loading = true;
state.error = null;
})
.addCase(generateOtp.fulfilled, (state, action) => {
state.loading = false;
state.otpSent = true;
state.message = action.payload.message;
})
.addCase(generateOtp.rejected, (state, action) => {
state.loading = false;
state.otpSent = false;
state.error = action.payload;
})



      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //check-auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        
        state.isAuthenticated = action.payload.data.isAuthenticated;
        state.authCheckComplete = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.authCheckComplete = true;
        state.error = action.payload;
      })


        .addCase(getapplyUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getapplyUser.fulfilled, (state, action) => {
          state.loading = false;
          state.appliedUser=action.payload.data.data
        
        })
        .addCase(getapplyUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })




        .addCase(getregisterdUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getregisterdUser.fulfilled, (state, action) => {
          state.loading = false;
          state.registeredUser=action.payload.data.data
        
        })
        .addCase(getregisterdUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  


        .addCase(getregisterdUserByid.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getregisterdUserByid.fulfilled, (state, action) => {
          state.loading = false;
          state.user=action.payload.data.data
        
        })
        .addCase(getregisterdUserByid.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })



        .addCase(updateUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user=action.payload.data.data
        
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
    
      


      
       
    },
  });
  





  export default authSlice.reducer;

