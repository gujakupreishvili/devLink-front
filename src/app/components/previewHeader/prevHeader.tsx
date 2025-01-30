import { useRouter } from 'next/navigation';
import React from 'react'

export default function PrevHeader() {
  const router = useRouter();

  const backHome = () =>{
    router.push('/')
  }
  return (
    <div>
      <div className='flex justify-center items-center pt-[30px] gap-[20px]'>
        <button 
        onClick={backHome}
        className='w-[160px] h-[46px] rounded-[8px] border-[1px] border-[#633CFF] text-[#633CFF] text-[16px]'>Back to Editor</button>
        <button className='w-[160px] h-[46px] rounded-[8px] border-[1px] bg-[#633CFF] text-white text-[16px]'>Share Link</button>
      </div>
      
    </div>
  )
}
