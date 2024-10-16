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

// Register user
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/register/`, userData);
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
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);
