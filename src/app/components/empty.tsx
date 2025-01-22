import React from 'react'
import empty from "../../../public/assets/mobile/empty.png"
import Image from 'next/image'

export default function Empty() {
  return (
    <div className='bg-[#FAFAFA] rounded-[10px] flex flex-col justify-center items-center h-[377px] mb-[40px]'>
      <Image src={empty} alt="empty" />
      <h1 className='text-[24px] font-bold text-[#333333] pt-[20px]'>Let’s get you started</h1>
      <p className='text-[#737373] text-[16px] font-medium text-center pt-[40px] px-[34px]'>
        Use the “Add new link” button to get started. 
        Once you have more than one link
        , you can reorder and edit them. We’re here to
         help you share your profiles with everyone!
        </p>
    </div>
  )
}
