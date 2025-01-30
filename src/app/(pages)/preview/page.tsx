"use client"
import PrevHeader from '@/app/components/previewHeader/prevHeader';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaTwitter, FaYoutube, FaLinkedin, FaGitlab, FaStackOverflow, FaArrowRight } from "react-icons/fa";
import { SiFrontendmentor } from "react-icons/si";

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
  name:string
};

export default function View() {
  const [data, setData] = useState<UserData>();
  const router = useRouter();

  const platformStyles: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
    GitHub: { bg: "bg-black", text: "text-white", icon: <FaGithub size={20} /> },
    Twitter: { bg: "bg-blue-500", text: "text-white", icon: <FaTwitter size={20} /> },
    YouTube: { bg: "bg-red-600", text: "text-white", icon: <FaYoutube size={20} /> },
    LinkedIn: { bg: "bg-blue-700", text: "text-white", icon: <FaLinkedin size={20} /> },
    GitLab: { bg: "bg-orange-500", text: "text-white", icon: <FaGitlab size={20} /> },
    "Frontend Mentor": { bg: "bg-gray-700", text: "text-white", icon: <SiFrontendmentor size={20} /> },
    "Stack Overflow": { bg: "bg-yellow-500", text: "text-black", icon: <FaStackOverflow size={20} /> },
  };

  const getInfo = async () => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const res = await axios.get("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data); // მონაცემები აღარ უნდა წავშალოთ აქამდე
      console.log(res.data,"dataaaa")
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
  
  return (
    <>
    <div className='w-full flex flex-col items-center h-screen '>
      <PrevHeader />
      <div  className=" w-[237px] flex flex-col  gap-[15px]   h-[437px] mt-[15%]">
        <div className='flex flex-col items-center py-[12px] gap-[12px] mb-[30px]'>
          <p>avatar</p>
          <p className='text-[32px] text-black font-bold'>{data?.name}</p>
          <p className='text-[#737373] text-[16px]'>{data?.email}</p>
        </div>
        <div className='h-[278px] overflow-y-auto '>
        {data?.links && data.links.length === 0 ? (
          <p>No links found.</p>
        ) : (
          data?.links?.map((link) => {
            const { bg, text, icon } = platformStyles[link.platform] || { bg: "bg-gray-200", text: "text-black", icon: null };
            return (
              <a key={link._id || Math.random()} href={link.url} target="_blank" rel="noopener noreferrer">
                <div className={`${bg} ${text} p-4 rounded-lg flex items-center  justify-between mb-[12px] `}>
                  <div className='flex  items-center gap-[14px]'>
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
      </div>
      </div>
    </>
  );
}
