import { apiSlice } from "../../api/api";
import { CORE_URL } from "../../constant";

export const coreApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch Contact Info
        fetchContactInfo: builder.query({
            query: () => ({
                url: `${CORE_URL}/contact-info/`,
            }),
        }),

        // Create Contact Info
        createContactInfo: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/create-contact-info/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Contact Info
        updateContactInfo: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/update-contact-info/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Contact Info
        deleteContactInfo: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/delete-contact-info/${id}/`,
                method: "DELETE",
            }),
        }),

        // Fetch Banners
        fetchBanners: builder.query({
            query: () => ({
                url: `${CORE_URL}/banners/`,
            }),
        }),

        // Create Banner
        createBanner: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/banners-create/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Banner
        updateBanner: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/banners-update/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Banner
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/banners-delete/${id}/`,
                method: "DELETE",
            }),
        }),

        // Fetch Services
        fetchServices: builder.query({
            query: () => ({
                url: `${CORE_URL}/services/`,
            }),
        }),

        // Create Service
        createService: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/services-create/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Service
        updateService: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CORE_URL}/services-update/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Service
        deleteService: builder.mutation({
            query: (id) => ({
                url: `${CORE_URL}/services-delete/${id}/`,
                method: "DELETE",
            }),
        }),

        // Create Contact
        createContact: builder.mutation({
            query: (data) => ({
                url: `${CORE_URL}/contact/`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchContactInfoQuery,
    useCreateContactInfoMutation,
    useUpdateContactInfoMutation,
    useDeleteContactInfoMutation,

    useFetchBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,

    useFetchServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,

    useCreateContactMutation,
} = coreApi;
