import { createSlice } from '@reduxjs/toolkit';
import {
    fetchCurrentUser,
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    passwordReset,
    setNewPassword,
    refreshToken,
    changePassword,
} from './authApi';

// Initial state for the auth slice
const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
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
        setTokens: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true; // Set authenticated to true when tokens are available
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true; // Set authenticated to true when user is set
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch current user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.isAuthenticated = true; // User authenticated after fetching
            })
            .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.isAuthenticated = true; // Authenticated after registration
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Verify email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.loading = false; // No additional state change needed after successful verification
            })
            .addCase(verifyEmail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = { email: payload.email }; // Store user email or other info here
                state.accessToken = payload.access_token;
                state.refreshToken = payload.refresh_token;
                state.isAuthenticated = true; // Authenticated after login
            })

            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Logout user
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false; // User is logged out
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Password reset request
            .addCase(passwordReset.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordReset.fulfilled, (state, { meta }) => {
                state.loading = false;

                // Determine success message based on the action payload
                if (meta.arg.email) {
                    state.successMessage = 'Password reset link sent to your email.';
                } else if (meta.arg.uidb64 && meta.arg.token && meta.arg.newPassword) {
                    state.successMessage = 'Password reset successful.';
                }
            })
            .addCase(passwordReset.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Set new password
            .addCase(setNewPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setNewPassword.fulfilled, (state) => {
                state.loading = false; // No additional state change needed after setting new password
            })
            .addCase(setNewPassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Change password
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Refresh token
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.accessToken = payload.access; // Update the access token
            })
            .addCase(refreshToken.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

// Export actions and reducer
export const { resetAuthState, setTokens, setUser } = authSlice.actions;
export default authSlice.reducer;
