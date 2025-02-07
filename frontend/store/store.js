import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import { coreApi } from "./features/core/coreApi";
import authReducer from "./features/auth/authSlice";
import { userApi } from "./features/user/userApi";
import { appointmentApi } from "./features/appointment/appointmentApi";
// import { medicalrecordsApi } from "./features/medicalrecords/medicalrecordsApi";
// import { billingApi } from "./features/billing/billingApi";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, coreApi.middleware, userApi.middleware, appointmentApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
