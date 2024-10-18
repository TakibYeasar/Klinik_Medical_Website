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
            const response = await axios.get(`${API_URL}/current-user/`);
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

// Login user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login/`, credentials);
            // Store tokens in local storage
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            return response.data;
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
            await axios.post(`${API_URL}/api/auth/logout/`);
            // Clear tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return true;
        } catch (error) {
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
