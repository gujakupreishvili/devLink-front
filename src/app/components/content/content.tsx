'use client'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Empty from '../empty';
import Links from '../links';
import axios from 'axios';
import Mobile from '../mobile/mobile';
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

export default function Content() {
  const [linkArr, setLinkArr] = useState<{ url: string; platform: string; _id?: string }[]>([]);
  const [newLinks, setNewLinks] = useState<{ url: string; platform: string }[]>([]);
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<null | string>(null);

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
    } else {
      localStorage.removeItem('linkArr');
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
  
    if (newLinks.length === 0) {
      toast.error("No new links to save!", { position: "top-right", autoClose: 3000 });
      return;
    }
  
    const hasEmptyField = newLinks.some(link => !link.url.trim() || !link.platform.trim());
    if (hasEmptyField) {
      toast.error("URL and Platform fields cannot be empty!", { position: "top-right", autoClose: 3000 });
      return;
    }
  
    try {
      const response = await axios.post("https://devlinks-back-ffrr.onrender.com/links", newLinks, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // console.log('Saved successfully:', response.data);
  
      if (!Array.isArray(response.data) || !response.data.every(link => link._id)) {
        throw new Error("Invalid response data: missing _id");
      }
  
      const savedLinks = response.data;
  
      const updatedLinkArr = linkArr.map(link => {
        const savedLink = savedLinks.find(saved => saved.url === link.url && saved.platform === link.platform);
        return savedLink ? { ...link, _id: savedLink._id } : link;
      });
  
      setLinkArr(updatedLinkArr);
      setNewLinks([]); // ვასუფთავებთ `newLinks`-ს
  
      localStorage.setItem('linkArr', JSON.stringify(updatedLinkArr));
  
      toast.success("Your links have been successfully added.", { position: "top-right", autoClose: 3000 });
    } catch (error: any) {
      console.error('Error saving links:', error?.response?.data || error.message);
    }
  };
  return (
    <>
      <Header />
      <div className='lg:flex lg:w-full lg:justify-around lg:ml-[15px] lg:mb-[20px]'>
      <Mobile linkArr={linkArr} data={null} setData={function (value: React.SetStateAction<UserData | null>): void {
          throw new Error('Function not implemented.');
        } }  />
      <div className='flex flex-col px-[24px] mt-[20px] bg-white h-screen md:m-auto md:w-[90%] md:rounded-[10px] md:px-[10%] lg:m-[0px] lg:w-[55%] lg:h-[784px] lg:px-[5%] lg:mr-[15px] lg:relative '>
        <div>
        <div className='pt-[25px]'>
          <h1 className='text-[#333333] text-[24px] font-bold pb-[8px] md:text-[32px] '>Customize your links</h1>
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
          className='h-[46px] bg-[#633CFF] text-white w-[100%] rounded-[8px] mb-[20px]  lg:absolute lg:w-[91px] right-[70px] bottom-[7px] '>
            Save
          </button>
        </div>
      </div>
      </div>
      <ToastContainer />
    </>
  );
}

