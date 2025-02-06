"use client"
import Header from '@/app/components/header/header'
import React, { useEffect, useState } from 'react'
import Img from './uploadImg'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import Mobile from '@/app/components/mobile/mobile'
import axios from 'axios'

interface Link {
  url: string;
  platform: string;
}

interface UserData {
  email: string;
  links: Link[];
  _id: string;
  __v: number;
  name: string;
  urlId: {
    filePath: string;
  };
}

export default function UploadImg() {
  
  const [linkArr, setLinkArr] = useState<[]>([]); 
  const [data , setData] =useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.push("/auth/signUp");
      return;
    }

    const getItem = localStorage.getItem("linkArr");
    if (getItem) {
      try {
        setLinkArr(JSON.parse(getItem));
      } catch (error) {
        console.error("Error parsing localStorage item:", error);
        setLinkArr([]);
      }
    }

    const getInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, []);


  return (
    <>
      <Header />
      <div className='lg:flex lg:w-full lg:justify-around lg:ml-[15px] lg:mb-[20px]'>
        <Mobile linkArr={linkArr} data={data} setData={setData}  />
        <div className='m-[20px] bg-white flex flex-col px-[15px] py-[12px] h-[80vh] justify-between md:rounded-[12px] md:m-auto md:w-[90%] md:px-[25px]  lg:m-[0px] lg:w-[55%] lg:h-[784px] lg:px-[5%] lg:mr-[15px] lg:relative'>
          <div>
            <h2 className='text-[#333333] text-[24px] font-bold md:text-[32px] md:pt-[14px]'>Profile Details</h2>
            <p className='text-[#737373] text-[16px] w-[320px]'>Add your details to create a personal touch to your profile.</p>
          </div>
          <Img  setData={setData}/>
          <div>
            <hr className='lg:hidden' />
            <button className='w-full bg-[#633CFF] text-white rounded-[8px] h-[46px] md:mb-[14px] lg:absolute lg:w-[91px] right-[70px] bottom-[7px]'>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

