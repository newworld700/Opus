import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// const API_URL = "https://api.anveraesports.com/api/user/";
const API_URL = "http://localhost:5000/api/v0.1/user/";




export const checkAuth = createAsyncThunk("auth/check", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${API_URL}check`, { withCredentials: true });
    if (response.data.isAuthenticated) {
      localStorage.setItem("isAuthenticated","true")
      dispatch(getData()); 
    }
    return { status: response.status, data: response.data };
  } catch (err) {
    localStorage.setItem("isAuthenticated",false)
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});


export const getData = createAsyncThunk("auth/getData", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}me`, {  withCredentials: true });
   
    return { status: response.status, data: response.data }; ;

  } catch (err) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});


export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}login`, data, { withCredentials: true });
    return { status: response.status, data: response.data };
  } catch (err) {
    return rejectWithValue(err.response?.data || "Something went wrong");
  }
});


export const applyUser = createAsyncThunk("auth/apply", async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}apply`, data,{ withCredentials: true });
  
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });


  export const logoutUser = createAsyncThunk("auth/logOut", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}logOut`,{}, {  withCredentials: true });
  
      return response.message;
  
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  });
  


  const initialState = {
    user: null,
    isAuthenticated: false,
    loading:false,

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
        // Handle Login
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  


        .addCase(getData.pending, (state) => {
          state.loading= true;
          state.errordata = null;
        })
        .addCase(getData.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
        })
        .addCase(getData.rejected, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.errordata = action.payload;
        })



       
        .addCase(checkAuth.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = action.payload.isAuthenticated;
        })
        .addCase(checkAuth.rejected, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = action.payload;
        })
  
      
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

      
       
    },
  });
  





  export default authSlice.reducer;

