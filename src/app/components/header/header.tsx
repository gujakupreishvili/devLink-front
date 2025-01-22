import React from 'react'
import logoIcon  from "../../../../public/assets/mobile/logo icon.png"
import Image from 'next/image'
import { FaLink } from 'react-icons/fa'
import { FaRegCircleUser } from 'react-icons/fa6'
import { IoEyeOutline } from 'react-icons/io5'

export default function Header() {
  return (
    <div className='bg-white rouded-[12px] h-[75px] w-full flex justify-between items-center px-[24px] py-[16px]'>
      <Image src={logoIcon} alt='logoicon' />
      <div className='flex items-center gap-[30px]'>
        <div className='w-[74px] h-[42px] flex items-center bg-[#EFEBFF] justify-center rounded-[8px] text-[16px]'>
        <FaLink className='text-[#633CFF]' />
         <p className='hidden'>Links</p>
        </div>
        <div>
        <FaRegCircleUser className='hover:text-[#633CFF] cursor-pointer text-[16px]'/>
        <p className='hidden'>Profile Details</p>
        </div>
      </div>
      <div>
      <IoEyeOutline className='text-[20px]' />
      <p className="hidden">Preview</p>
      </div>

      
    </div>
  )
}
