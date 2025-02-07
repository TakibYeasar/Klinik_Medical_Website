import { apiSlice } from "../../api/api";
import { USERS_URL } from "../../constant";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch Doctor Profile
        fetchDoctorProfile: builder.query({
            query: (slug) => ({
                url: `${USERS_URL}/doctors/${slug}/`,
            }),
        }),

        // Admin Management of Doctors
        fetchAdminManageDoctors: builder.query({
            query: () => ({
                url: `${USERS_URL}/admin-doctors/`,
            }),
        }),
        approveDoctor: builder.mutation({
            query: (user_id) => ({
                url: `${USERS_URL}/admin-doctors/${user_id}/`,
                method: "PUT",
            }),
        }),
        fetchAdminApprovedDoctors: builder.query({
            query: () => ({
                url: `${USERS_URL}/admin-approved-doctors/`,
            }),
        }),

        // Patient Management
        fetchPatientRecords: builder.query({
            query: ({ patient_id, action_type }) => ({
                url: `${USERS_URL}/patients/${patient_id}/${action_type}/`,
            }),
        }),
        updatePatientRecord: builder.mutation({
            query: ({ patient_id, action_type, record_id }) => ({
                url: `${USERS_URL}/patients/${patient_id}/${action_type}/${record_id}/`,
                method: "PUT",
            }),
        }),

        // Patient Feedback
        fetchPatientFeedback: builder.query({
            query: () => ({
                url: `${USERS_URL}/patients-feedback/`,
            }),
        }),

        // Doctor Feedback
        fetchDoctorFeedback: builder.query({
            query: () => ({
                url: `${USERS_URL}/doctors-feedback/`,
            }),
        }),

        // Newsletter Management
        subscribeNewsletter: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/newsletter-subscribe/`,
                method: "POST",
                body: data,
            }),
        }),
        unsubscribeNewsletter: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/newsletter-unsubscribe/`,
                method: "POST",
                body: data,
            }),
        }),
        sendNewsletter: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/newsletter-send/`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchDoctorProfileQuery,
    useFetchAdminManageDoctorsQuery,
    useApproveDoctorMutation,
    useFetchAdminApprovedDoctorsQuery,
    useFetchPatientRecordsQuery,
    useUpdatePatientRecordMutation,
    useFetchPatientFeedbackQuery,
    useFetchDoctorFeedbackQuery,
    useSubscribeNewsletterMutation,
    useUnsubscribeNewsletterMutation,
    useSendNewsletterMutation,
} = userApi;
