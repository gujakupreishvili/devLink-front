import { useRouter } from 'next/navigation';
import React from 'react'

export default function PrevHeader() {
  const router = useRouter();

  const backHome = () =>{
    router.push('/')
  }
  return (
    <div className=' md:absolute md:w-full md:bg-[#633CFF] md:h-[357px] md:rounded-bl-[32px] md:rounded-br-[32px]'>
      <div className='flex justify-center items-center pt-[30px] gap-[20px] md:absolute md:bg-white md:justify-between md:items-center md:w-[80%] md:px-[20px] md:rounded-[8px] md:top-[15%] md:left-[10%] md:h-[78px] md:pt-[0px]  '>
        <button 
        onClick={backHome}
        className='w-[160px] h-[46px] rounded-[8px] border-[1px] border-[#633CFF] text-[#633CFF] text-[16px]'>Back to Editor</button>
        <button className='w-[160px] h-[46px] rounded-[8px] border-[1px] bg-[#633CFF] text-white text-[16px]'>Share Link</button>
      </div>
    </div>
  )
}
