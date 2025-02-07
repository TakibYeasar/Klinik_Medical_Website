import { apiSlice } from "../../api/api";
import { APPOINTMENT_URL } from "../../constant";

export const appointmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all appointments
        fetchAppointments: builder.query({
            query: () => `${APPOINTMENT_URL}/appointments/`,
        }),

        // Create an appointment
        createAppointment: builder.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/appointments-create/`,
                method: "POST",
                body: data,
            }),
        }),

        // Fetch appointment details
        fetchAppointmentDetail: builder.query({
            query: (slug) => `${APPOINTMENT_URL}/appointments/${slug}/`,
        }),

        // Update appointment
        updateAppointment: builder.mutation({
            query: ({ slug, data }) => ({
                url: `${APPOINTMENT_URL}/appointments/${slug}/update/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete appointment
        deleteAppointment: builder.mutation({
            query: (slug) => ({
                url: `${APPOINTMENT_URL}/appointments/${slug}/delete/`,
                method: "DELETE",
            }),
        }),

        // Fetch doctor-specific appointments
        fetchDoctorAppointments: builder.query({
            query: (slug) => `${APPOINTMENT_URL}/doctors/${slug}/appointments/`,
        }),

        // Create appointment for doctor
        createDoctorAppointment: builder.mutation({
            query: ({ slug, data }) => ({
                url: `${APPOINTMENT_URL}/doctors/${slug}/appointments-create/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update doctor-specific appointment
        updateDoctorAppointment: builder.mutation({
            query: ({ slug, appointment_id, data }) => ({
                url: `${APPOINTMENT_URL}/doctors/${slug}/appointments/${appointment_id}/update/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Cancel doctor-specific appointment
        cancelDoctorAppointment: builder.mutation({
            query: ({ slug, appointment_id }) => ({
                url: `${APPOINTMENT_URL}/doctors/${slug}/appointments/${appointment_id}/cancel/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useFetchAppointmentsQuery,
    useCreateAppointmentMutation,
    useFetchAppointmentDetailQuery,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    useFetchDoctorAppointmentsQuery,
    useCreateDoctorAppointmentMutation,
    useUpdateDoctorAppointmentMutation,
    useCancelDoctorAppointmentMutation,
} = appointmentApi;
