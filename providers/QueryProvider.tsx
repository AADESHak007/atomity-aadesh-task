"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"


export const QueryProvider = ({children} : {children:React.ReactNode})=>{
    const [queryClient] = useState(()=> new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus:false,
                staleTime:1000*60*3, //3min
                retry:1,
            }
        }
    }))

    return (
    <QueryClientProvider client = {queryClient}>
    {children}
    </QueryClientProvider>
    )
}