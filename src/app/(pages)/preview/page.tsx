"use client"
import PrevHeader from '@/app/components/previewHeader/prevHeader';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {  FaArrowRight } from "react-icons/fa";
import {platformStyles} from "../../components/platformStyles/styles"
import { motion } from 'framer-motion';

type Link = {
  url: string;
  platform: string;
  _id: string;
};

type UserData = {
  email: string;
  links: Link[];
  _id: string;
  __v: number;
  name: string;
  urlId: {
    filePath: string;
  };
};

export default function View() {
  const [data, setData] = useState<UserData>();
  const router = useRouter();

  const getInfo = async () => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const res = await axios.get("https://devlinks-back-ffrr.onrender.com/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      console.log(res.data, "dataaaa");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.push('/auth/signUp');
      return;
    }
    getInfo();
  }, [router]);
  console.log(data?.urlId?.filePath,"filepath")

  return (
    <>
      <div className="w-full flex flex-col items-center h-screen ">
        <PrevHeader />
        <motion.div 
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
        className="w-[237px] flex flex-col gap-[15px] h-[437px] mt-[15%] md:z-20 md:bg-white md:mt-[270px] md:w-[349px] md:rounded-[12px] md:pt-[30px] md:px-[45px]">
          <div className="flex flex-col items-center py-[12px] gap-[12px] mb-[30px]">
            
            {data?.urlId?.filePath && (
              
              <Image 
              src={data?.urlId.filePath} 
              alt="userlogo" 
              width={104} 
              height={104}
              unoptimized 
              className=' w-[104px] h-[104px] border-[4px] border-[#633CFF] rounded-[52px]'/>
            )}
            <p className="text-[32px] text-black font-bold">{data?.name}</p>
            <p className="text-[#737373] text-[16px]">{data?.email}</p>
          </div>
          <div className="h-[278px] overflow-y-auto ">
            {data?.links && data.links.length === 0 ? (
              <p>No links found.</p>
            ) : (
              data?.links?.map((link) => {
                const { bg, text, icon } = platformStyles[link.platform] || { bg: "bg-gray-200", text: "text-black", icon: null };
                return (
                  <a key={link._id || Math.random()} href={link.url} target="_blank" rel="noopener noreferrer">
                    <div className={`${bg} ${text} p-4 rounded-lg flex items-center justify-between mb-[12px]`}>
                      <div className="flex items-center gap-[14px]">
                        {icon}
                        <h4>{link.platform}</h4>
                      </div>
                      <FaArrowRight />
                    </div>
                  </a>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
