'use client'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";

import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Empty from '../empty';
import Links from '../links';
import axios from 'axios';

export default function Content() {
  const [linkArr, setLinkArr] = useState<{ url: string; platform: string }[]>([]);
  const [newLinks, setNewLinks] = useState<{ url: string; platform: string }[]>([]);
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<null | string>();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) router.push('/auth/signUp');
    setAccessToken(token as string | null);
  }, [router]);

  useEffect(() => {
    const storedLinks = localStorage.getItem('linkArr');
    if (storedLinks) {
      setLinkArr(JSON.parse(storedLinks));
    }
  }, []);

  useEffect(() => {
    if (linkArr.length > 0) {
      localStorage.setItem('linkArr', JSON.stringify(linkArr));
    }
  }, [linkArr]);

  const addLink = () => {
    const newLink = { url: '', platform: '' };
    setLinkArr([...linkArr, newLink]);
    setNewLinks([...newLinks, newLink]);
  };

  const handleSave = async () => {
    const token = getCookie("accessToken"); 
    if (!token) {
      console.error('No token found. Request not sent.');
      return;
    }
    const hasEmptyUrl = newLinks.some(link => link.url.trim() === "");
    const hasPlatform = newLinks.some(link => link.platform.trim() === "");
  
    if (hasEmptyUrl || hasPlatform) {
      toast.error("URL and Platform fields cannot be empty!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/links", newLinks, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log('Saved successfully:', response.data);
      const savedLinks = response.data;
      const updatedLinkArr = linkArr.map((link, index) => {
        const savedLink = savedLinks[index];
        return { ...link, _id: savedLink._id };
      });
  
      setLinkArr(updatedLinkArr);
      setNewLinks([]);
      toast.success("Your link has been successfully added.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.error('Error saving links:', error);
    }
  };
  
  return (
    <>
      <Header />
      <div className='flex flex-col px-[24px] mt-[20px] bg-white h-screen'>
        <div className='pt-[25px]'>
          <h1 className='text-[#333333] text-[24px] font-bold pb-[8px] '>Customize your links</h1>
          <p className='text-[16px] text-[#737373] font-normal pb-[40px]'>
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
          <button
            onClick={addLink}
            className='w-full border-[1px] border-[#633CFF] h-[46px] rounded-[12px] mb-[20px] bg-[#EFEBFF] text-[#633CFF]'>
            + Add new link
          </button>
        </div>
        {linkArr.length === 0 ? (
          <Empty />
        ) : (
          <Links linkArr={linkArr} setLinkArr={setLinkArr} />
        )}
        <button 
          onClick={handleSave}
          className='h-[46px] bg-[#633CFF] text-white w-full rounded-[8px] mb-[20px]'>Save</button>
      </div>
      <ToastContainer />
    </>
  );
}
