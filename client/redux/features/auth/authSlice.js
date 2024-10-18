import { createSlice } from '@reduxjs/toolkit';
import {
    fetchCurrentUser,
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    passwordReset,
    passwordResetConfirm,
    setNewPassword,
    refreshToken
} from './authApi';

// Initial state for the auth slice
const initialState = {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'), // Set to true if token exists
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch current user
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload; // Set user data from the response
                state.isAuthenticated = true; // Assume user is authenticated after fetching
            })
            .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
        // Register user
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Verify email
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyEmail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Login user
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.accessToken = payload.access;
                state.refreshToken = payload.refresh;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Logout user
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Password reset request
        builder
            .addCase(passwordReset.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordReset.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(passwordReset.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Password reset confirm
        builder
            .addCase(passwordResetConfirm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordResetConfirm.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(passwordResetConfirm.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Set new password
        builder
            .addCase(setNewPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setNewPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(setNewPassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Refresh token
        builder
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.accessToken = payload.access; // Update access token
            })
            .addCase(refreshToken.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
