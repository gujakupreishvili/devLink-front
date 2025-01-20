'use client'
import { getCookie, } from 'cookies-next';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

export default function Content() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<null | string>()
  useEffect(() =>{
    const token = getCookie("accessToken")
    if(!token)router.push('/auth/signUp')
      setAccessToken(token)

  },[])
  if(!accessToken) return
  return (
    <div>

      <h1>hello</h1>
    </div>
  )
}
