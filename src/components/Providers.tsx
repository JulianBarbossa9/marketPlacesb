"use client"

import React, { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { trpc } from '@/trpc/client'
import { httpBatchLink } from '@trpc/client'

const Providers = () => {
 const [ queryClient ] = useState(() => new QueryClient()) 
 const [ trpcClient ] = useState(() => trpc.createClient({
  links: [
    httpBatchLink({
      url:`${process.env.NEXT_PUBLIC_SERVER_URL}/api/`
    })
  ]
 }))
}

export default Providers