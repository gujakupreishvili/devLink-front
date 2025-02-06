"use client"
import React, { useState } from 'react'
import logo from "../../../../../public/assets/mobile/logo.svg"
import Image from 'next/image'
import { AiTwotoneMail } from 'react-icons/ai'
import { TbLockPassword } from 'react-icons/tb'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import axios, { AxiosError } from 'axios'
import { SigninValidationSchema } from '@/app/utils/validation/signinValidationSchema'
import { setCookie } from 'cookies-next'
const initialValue = {
  name: "",
  email: "",
  password: "",
};
export default function SignIn() {
  const router  = useRouter()
  const [error, setError] =useState('')
  
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async(values) => {
      try {
        const res = await axios.post("http://localhost:3001/auth/sign-in", values)
        const accessToken = res.data.accessToken
        setCookie('accessToken', accessToken, {maxAge: 60*60})
        router.push("/")
      }catch (e: unknown) {
        if (e instanceof AxiosError && e.response) {
          console.log(e);
          setError(e.response.data.message);
        } else {
          console.log(e);
          setError("An unknown error occurred");
        }
      }
      
    },
    validationSchema: SigninValidationSchema,
  });

  
    const { handleBlur, handleChange, handleSubmit, values, errors } = formik;
  return (
    <div className='flex flex-col justify-center items-start h-screen gap-[40px] px-[20px] md:items-center'>
    <Image src={logo} alt={"logo"} />
    <div className='w-full md:w-[476px] md:bg-white md:p-[25px] md:rounded-[8px]'>
     <h1 className='text-[24px] text-[#333333] font-bold pb-[8px]'>Login</h1>
     <p className='text-[16px] text-[#737373] font-normal pb-[35px]'>Add your details below to get back into the app</p>
     <form action=""
     onSubmit={handleSubmit}
      className='flex flex-col gap-[20px]'>

       <div className='flex flex-col'>
       <label htmlFor="" className='text-[12px] text-[#333333] pb-[3px]'>Email address</label>
       <div className='flex flex-row items-center relative'>
       <AiTwotoneMail className='absolute left-3 text-[#333333]' />
      <input type="email" 
       value={values.email}
       name="email"
       onChange={handleChange}
       onBlur={handleBlur}
       placeholder ="e.g. alex@email.com" 
       className={`pl-[40px] text-[16px] h-[48px]  w-full border-[1px] ${errors.email ? "border-red-500" :"border-[#D9D9D9]"} rounded-[8px]`}  />  
      {errors.email && <p className='text-red-500 absolute right-2 text-[12px] hidden lg:block'>{errors.email}</p>}
       </div>
       </div>

       <div className='flex flex-col'>
       <label htmlFor="" className='text-[12px] text-[#333333] pb-[3px]'>Password</label>
       <div className='flex flex-row items-center relative'>
       <TbLockPassword className='absolute left-3 text-[#333333] '  />
      <input type="password" 
       value={values.password}
       name="password"
       onChange={handleChange}
       onBlur={handleBlur}
       placeholder ="Enter your password"
       className={`pl-[40px] text-[16px] h-[48px]  w-full border-[1px] ${errors.password ? "border-red-500" :"border-[#D9D9D9]"} rounded-[8px]`}  />  
      {errors.password && <p className='text-red-500 absolute right-2 text-[12px] hidden lg:block'>{errors.password}</p>}
       </div>
       </div>
       <p className='text-red-500'>{error}</p>
       <button className='w-full h-[46px] bg-[#633CFF] text-white text-[16px] rounded-[8px]'>Login</button>
       <p className='text-center '>
       Don’t have an account?
       <Link href={"/auth/signUp"}  className='text-[#633CFF] cursor-pointer' >  Create account</Link>
       </p>
     </form>
    </div>
   
 </div>
  )
}
