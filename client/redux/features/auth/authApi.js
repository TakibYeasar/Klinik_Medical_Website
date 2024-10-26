import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the Django API
const API_URL = 'http://127.0.0.1:8000';

// Helper function for error handling
const handleApiError = (error) => {
    return error.response && error.response.data
        ? error.response.data
        : { message: 'An error occurred. Please try again.' };
};

// Thunks

// Fetch current user
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            // Retrieve the authToken object from localStorage
            const authToken = JSON.parse(localStorage.getItem('authToken'));

            if (!authToken || !authToken.access_token) {
                throw new Error('No access token found');
            }

            // Check if the access token is still valid
            const currentTime = Date.now();
            if (authToken.expirationTime && currentTime > authToken.expirationTime) {
                throw new Error('Access token has expired');
            }

            // Make an authenticated request to fetch the current user
            const response = await axios.get(`${API_URL}/api/auth/current-user/`, {
                headers: {
                    Authorization: `Bearer ${authToken.access_token}`,
                },
            });

            // Return the user data on successful request
            return response.data;
        } catch (error) {
            // Handle errors and reject with a meaningful message
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Register user
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/register/`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Verify email
export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (otp, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/verify-email/`, { otp });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


// login user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password, rememberMe }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login/`, {
                email,
                password,
            });

            const { access_token, refresh_token, email: userEmail, role } = response.data;

            // Calculate expiration time based on "Remember Me" selection
            const expirationTime = new Date().getTime() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000); // 7 days or 2 days

            const tokenData = {
                access_token,
                refresh_token,
                expirationTime,
            };

            // Store tokens in localStorage for either 7 days or 2 days
            localStorage.setItem('authToken', JSON.stringify(tokenData));
            localStorage.setItem('user', JSON.stringify({ email: userEmail, role })); // Store user data

            return { access_token, refresh_token, email: userEmail, role };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            // Attempt to log the user out on the server
            const response = await axios.post(`${API_URL}/api/auth/logout/`);

            // Clear tokens and user data from both localStorage and sessionStorage
            localStorage.removeItem('authToken'); // Remove token data from localStorage
            localStorage.removeItem('user');      // Remove user data from localStorage
            sessionStorage.removeItem('accessToken'); // Remove token data from sessionStorage
            sessionStorage.removeItem('refreshToken'); // Remove refresh token from sessionStorage

            // Return success response or status
            return response.data; // Optionally return response data if needed

        } catch (error) {
            // Ensure tokens and user data are removed even if the API call fails
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');

            // Handle API error and reject the thunk with appropriate error
            return rejectWithValue(error.response?.data || 'Logout failed');
        }
    }
);


// Request password reset
export const passwordReset = createAsyncThunk(
    'auth/passwordReset',
    async ({ email, uidb64, token }, { rejectWithValue }) => {
        try {
            let response;

            // Check if it's a request for reset link or reset confirmation
            if (email) {
                // Request password reset link
                response = await axios.post(`${API_URL}/api/auth/password-reset/`, { email });
            } else if (uidb64 && authToken) {
                // Confirm password reset
                response = await axios.post(
                    `${API_URL}/api/auth/password-reset-confirm/${uidb64}/${token}/`,
                );
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Set new password
export const setNewPassword = createAsyncThunk(
    'auth/setNewPassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/set-new-password/`, passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Change password
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/change-password/`, passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Refresh token
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/token/refresh/`, { refresh: token });
            // Update access token in local storage
            localStorage.setItem('accessToken', response.data.access);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);
