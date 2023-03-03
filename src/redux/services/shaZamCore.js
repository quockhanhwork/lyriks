import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
  
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers)=>{
            headers.set('X-RapidAPI-Key','1e73189b45mshb868b5508a19e7cp167e15jsn193f8d5fb77a')
            return headers;
        },
    }),
    endpoints: (builder) =>({
        getTopCharts: builder.query({query: () => '/charts/world'}),
    }),
})
export const{
    useGetTopChartsQuery, 
} = shazamCoreApi;