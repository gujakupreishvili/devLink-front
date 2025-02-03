"use client"
import Header from '@/app/components/header/header'
import React, { useEffect } from 'react'
import Img from './uploadImg'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'

export default function UploadImg() {
  const router = useRouter()
  useEffect(() =>{
    const token = getCookie("accessToken");
    if (!token) {
      router.push('/auth/signUp');
      return;
    }
  },[])
  return (
    <>
      <Header />
      <div className='m-[20px] bg-white flex flex-col px-[15px] py-[12px] h-[80vh] justify-between'>
        <div>
          <h2 className='text-[#333333] text-[24px] font-bold'>Profile Details</h2>
          <p className='text-[#737373] text-[16px] w-[320px]'>Add your details to create a personal touch to your profile.</p>
        </div>
        <Img />
        <div>
          <hr />
          <button className='w-full bg-[#633CFF] text-white rounded-[8px] h-[46px]'>Save</button>
        </div>
      </div>
    </>

  )
}
