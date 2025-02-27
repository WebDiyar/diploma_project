import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface Organization {
    id: number | string;
    bin: string;
    organization_code: string;
    organization_name: string;
    status: string;
    host: string;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://669f8d88b132e2c136fe5106.mockapi.io/api/v1" }),
    tagTypes: ["organizations"], // Определяет типы тегов для инвалидации кэша или инвалидации данных, связанных с конкретными запросами или мутациями.
    endpoints: (builder) => ({
        getOrganizations: builder.query<Organization[], void>({
            query: () => '/organizations',
            providesTags: ["organizations"], // Определяет теги, которые будут инвалидированы при получении данных, чтобы обновить кэш, связанный с этими данными.
        }),
        getOrganization: builder.query<Organization, string>({
            query: (orgId) => `/organizations/${orgId}`,
        }),
        addNewOrganization: builder.mutation<Organization, Partial<Organization>>({
            query: (initialOrg) => ({
                url: '/organizations',
                method: 'POST',
                body: initialOrg,
            }),
            invalidatesTags: ["organizations"], // при успешном выполнении этой мутации необходимо инвалидировать теги, связанные с организациями, чтобы обновить кэш.
        }),
        editOrganization: builder.mutation<Organization, Partial<Organization>>({
            query: ({ id, ...rest }) => ({
                url: `/organizations/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ["organizations"]
        }),
        deleteOrganization: builder.mutation<{ success: boolean; id: number }, number>({
            query: (orgId) => ({
                url: `/organizations/${orgId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["organizations"],
        }),
    }),
});

export const {
    useGetOrganizationsQuery,
    useGetOrganizationQuery,
    useAddNewOrganizationMutation,
    useEditOrganizationMutation,
    useDeleteOrganizationMutation,
} = apiSlice;
