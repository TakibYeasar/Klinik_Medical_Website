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
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('No access token found');
            }

            const response = await axios.get(`${API_URL}/api/auth/current-user/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
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
    async (emailToken, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/verify-email/`, { token: emailToken });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login/`, credentials);

            const { email, access_token, refresh_token, role } = response.data;

            // console.log('AccessToken:', access_token);
            // console.log('RefreshToken:', refresh_token);
            // console.log('User Email:', email);

            // Store tokens and email (user) in localStorage
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('user', JSON.stringify({ email, role })); // Store the user email or any other info you want

            return { access_token, refresh_token, email, role };
        } catch (error) {
            return rejectWithValue(handleApiError(error));
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

            // Clear tokens from local storage after successful server logout
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            // Return success response or status
            return response.data;  // or just return if no specific data is required

        } catch (error) {
            // Ensure tokens are removed from local storage even if the API call fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            // Return error handling to reject the thunk with appropriate error
            return rejectWithValue(handleApiError(error));
        }
    }
);


// Request password reset
export const passwordReset = createAsyncThunk(
    'auth/passwordReset',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/password-reset/`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Confirm password reset
export const passwordResetConfirm = createAsyncThunk(
    'auth/passwordResetConfirm',
    async ({ uidb64, token, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/password-reset-confirm/${uidb64}/${token}/`, {
                new_password: newPassword,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
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
