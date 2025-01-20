"use client"
import React, { useState } from 'react'
import logo from "../../../../../public/assets/mobile/logo.svg"
import Image from 'next/image'
import { AiTwotoneMail } from 'react-icons/ai'
import { TbLockPassword } from 'react-icons/tb'
import Link from 'next/link'
import { useFormik } from 'formik'
import axios, { AxiosError } from 'axios'
import { SignupvalidationSchema } from '@/app/utils/validation/signupValidationSchema'
import { useRouter } from 'next/navigation'
import { CiUser } from 'react-icons/ci'
 
const initialValue = {
  name: "",
  email: "",
  password: "",
};

export default function SignUp() {

  const router  = useRouter()

  const [error, setError] =useState('')

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/auth/sign-up", values)
        if(res.status === 400){
          setError('user exists')
          return
        }
        router.push('/auth/signIn')
        
      } catch (e: unknown) {
        if (e instanceof AxiosError && e.response) {
          console.log(e);
          setError(e.response.data.message);
        } else {
          console.log(e);
          setError("An unknown error occurred");
        }
      }
    },
    validationSchema: SignupvalidationSchema,
  });

  const { handleBlur, handleChange, handleSubmit, values, errors } = formik;


  return (
    <div className='flex flex-col justify-center items-start h-screen gap-[40px] px-[20px]'>
       <Image src={logo} alt={"logo"} />
       <div className='w-full'>
        <h1 className='text-[24px] text-[#333333] font-bold pb-[8px]'>Create account</h1>
        <p className='text-[16px] text-[#737373] font-normal pb-[35px]'>Let’s get you started sharing your links!</p>
        <form action="" 
        onSubmit={handleSubmit}
        className='flex flex-col gap-[20px]'>

        <div className='flex flex-col'>
          <label htmlFor="" className='text-[12px] text-[#333333] pb-[3px]'>Fullname adress</label>
          <div className='flex flex-row items-center relative'>
          <CiUser className='absolute left-3 text-[#333333]' />
         <input 
         type="text"
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
           placeholder="e.g. Alex Johnson"
           className={`pl-[40px] text-[16px] h-[48px]  w-full border-[1px] ${errors.name ? "border-red-500" :"border-[#D9D9D9]"} rounded-[8px]`}  />  
            {errors.name && <p className='text-red-500 absolute right-2 text-[12px] hidden lg:block'>{errors.name}</p>}
          </div>
          </div>

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
           className={`pl-[40px] text-[16px] h-[48px]  w-full  border-[1px] ${errors.email ? "border-red-500" :"border-[#D9D9D9]"} rounded-[8px]`}  />
            {errors.email && <p className='text-red-500 absolute  right-2 text-[12px] hidden lg:block'>{errors.email}</p>}
          </div>
          </div>

          <div className='flex flex-col'>
          <label htmlFor="" className='text-[12px] text-[#333333] pb-[3px]'>Create password</label>
          <div className='flex flex-row items-center relative'>
          <TbLockPassword className='absolute left-3 text-[#333333] '  />
         <input type="password"
          value={values.password}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
           placeholder ="At least .8 characters" 
           className={`pl-[40px] text-[16px] h-[48px]  w-full border-[1px] ${errors.password ? "border-red-500" :"border-[#D9D9D9]"} rounded-[8px]`}  /> 
           {errors.password && <p className='text-red-500  absolute right-2 text-[12px] hidden lg:block'>{errors.password}</p>}
          </div>
          </div>

          <div className='flex flex-col'>
          <label htmlFor="" className='text-[12px] text-[#333333] pb-[3px]'>Confirm password</label>
          <div className='flex flex-row items-center relative'>
          <TbLockPassword className='absolute left-3 text-[#333333]'  />
         <input type="passowrd"  placeholder ="At least .8 characters" className='pl-[40px] text-[16px] h-[48px]  w-full border-[1px] borer-[#D9D9D9] rounded-[8px]'  /> 
          </div>
          </div>
          <button className='w-full h-[46px] bg-[#633CFF] text-white text-[16px] rounded-[8px]'>Create new account</button>
          <p className='text-center'>
            Already have an account? 
          <Link href={"/auth/signIn"} className='text-[#633CFF] cursor-pointer'> Login</Link>
          </p> 
        </form>
       </div>
      
    </div>
  )
}
