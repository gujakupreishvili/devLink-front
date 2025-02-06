"use client"
import React from 'react'
import logoIcon  from "../../../../public/assets/mobile/logo icon.png"
import tabletLogo from "../../../../public/assets/tablet/tabletLogo.png"
import Image from 'next/image'
import { FaLink } from 'react-icons/fa'
import { FaRegCircleUser } from 'react-icons/fa6'
import { IoEyeOutline } from 'react-icons/io5'
import Link from 'next/link'
import { usePathname,  } from 'next/navigation'

export default function Header() {
   const router = usePathname()
  return (
    
    <div className='bg-white rouded-[12px] h-[75px] w-full flex justify-between items-center px-[24px] py-[16px] md:mb-[40px] md:px-[6%]'>
      <Image src={logoIcon} alt='logoicon' className='md:hidden' />
      <Image src={tabletLogo} alt= "logo" className='hidden md:block' />
      <div className='flex items-center gap-[30px]'>
        <Link href="/"  
        className={`${router=== "/" ?"bg-[#EFEBFF] w-[74px] h-[42px]" :""}w-[74px] md:w-auto md:px-[20px] md:gap-[12px] h-[42px] flex items-center  justify-center rounded-[8px] text-[16px]`}>
        <FaLink className={`${router=== "/"?"text-[#633CFF]" :"text-[#737373]"} hover:text-[#633CFF]`} />
         <p className={`${router === "/" ? "text-[#633CFF]" : "text-[#737373]"} hidden md:block   `}>Links</p>
        </Link>
        <Link href="/profile" 
        className={`${router === "/profile"? "bg-[#EFEBFF] w-[74px] h-[42px]" : ""} w-[74px]  md:w-auto md:px-[20px] md:gap-[12px] h-[42px] flex items-center  justify-center rounded-[8px] text-[16px]`}
        >
        <FaRegCircleUser className=
        {`hover:text-[#633CFF] ${router === "/profile" ?" text-[#633CFF]":"text-[#737373]"} cursor-pointer text-[16px]`}
        />
        <p className={`${router === "/profile" ? "text-[#633CFF] " :"text-[#737373]"} hidden md:block  `}>Profile Details</p>
        </Link>
      </div>
      <Link href='/preview ' className='border-[1px] border-[#633CFF] rounded-[8px] w-[52px] md:w-auto md:px-[20px] h-[42px] flex items-center justify-center'>
      <IoEyeOutline className='text-[20px] text-[#633CFF] md:hidden' />
      <p className="hidden md:block text-[#633CFF]">Preview</p>
      </Link>

      
    </div>
  )
}
