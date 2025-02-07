import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Logout from './logout';

export default function PrevHeader() {
  const [logout, setLogout] = useState(false)
  const router = useRouter();

  const backHome = () =>{
    router.push('/')
  }
  return (
    <div className=' md:absolute md:w-full md:bg-[#633CFF] md:h-[357px] md:rounded-bl-[32px] md:rounded-br-[32px]'>
      <AnimatePresence>
      <motion.div
       initial={{ x: 0, opacity: 0 }}
       animate={{ x: 0, opacity: 1 }}
       transition={{ duration: 0.7 }}
       className='flex justify-center items-center pt-[30px] gap-[20px] md:absolute md:bg-white md:justify-between md:items-center md:w-[80%] md:px-[20px] md:rounded-[8px] md:top-[15%] md:left-[10%] md:h-[78px] md:pt-[0px]  '>
        <button 
        onClick={backHome}
        className='w-[160px] h-[46px] rounded-[8px] border-[1px] border-[#633CFF] text-[#633CFF] text-[16px]'>Back to Editor</button>
        <button 
        onClick={() => setLogout(true)}
        className='w-[160px] h-[46px] rounded-[8px] border-[1px] bg-[#633CFF] text-white text-[16px]'>Log out</button>
      </motion.div >
    </AnimatePresence>
    {logout && <Logout  setLogout={setLogout} />}
    </div>
  )
}
