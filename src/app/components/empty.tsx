import React from 'react'
import empty from "../../../public/assets/mobile/empty.png"
import Image from 'next/image'
import TabletEmpty from "../../../public/assets/tablet/tablet .png"
import { motion } from 'framer-motion'

export default function Empty() {
  return (
    <motion.div 
    initial={{ x: 0, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
    className='bg-[#FAFAFA] rounded-[10px] flex flex-col justify-center items-center h-[377px] mb-[40px] md:h-auto md:py-[35px]'>
      <Image src={empty} alt="empty" className='md:hidden'/>
      <Image src ={TabletEmpty} alt='"empty' className='hidden md:block' />
      <h1 className='text-[24px] font-bold text-[#333333] pt-[20px] md:text-[32px]'>Let’s get you started</h1>
      <p className='text-[#737373] text-[16px] font-medium text-center pt-[40px] px-[34px] md:w-[448px] '>
        Use the “Add new link” button to get started. 
        Once you have more than one link
        , you can reorder and edit them. We’re here to
         help you share your profiles with everyone!
        </p>
    </motion.div>
  )
}
