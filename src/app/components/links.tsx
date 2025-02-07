'use client'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { link } from 'fs';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaGitlab, FaLinkedin, FaStackOverflow, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SiFrontendmentor } from 'react-icons/si';

interface Link {
  [x: string]: string;
  url: string;
  platform: string;
}

interface LinksProps {
  linkArr: Link[];
  setLinkArr: React.Dispatch<React.SetStateAction<Link[]>>;
}

export default function Links({ linkArr, setLinkArr }: LinksProps) {


  const handleInputChange = (index: number, key: keyof Link, value: string) => {
    const updatedLinks = [...linkArr];
    updatedLinks[index][key] = value;
    setLinkArr(updatedLinks);
  };
  

  //ლინკის წაშლა
  const handleRemove = async (index: number) => {
    const linkToRemove = linkArr[index];
    // console.log("Link to remove:", linkToRemove);
  
    try {
      // თუ ლინკს აქვს `_id`, მონგოს ბაზიდან წავშლით
      if (linkToRemove?._id) {
        const token = getCookie("accessToken");
        if (!token) {
          console.error("No token found");
          return;
        }
  
        const response = await axios.delete(`https://devlinks-back-ffrr.onrender.com/links/${linkToRemove._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // console.log(`Link removed from database: ${linkToRemove._id}`);
  
        if (response.status === 200) {

          const updatedLinks = linkArr.filter((_, i) => i !== index);
          setLinkArr(updatedLinks);

          localStorage.setItem('links', JSON.stringify(updatedLinks));
          // console.log("Link removed from frontend and local storage as well.");
        }
      } else {
   
        const updatedLinks = linkArr.filter((_, i) => i !== index);
        setLinkArr(updatedLinks);

        localStorage.setItem('links', JSON.stringify(updatedLinks));
        // console.log("Link does not have an _id, removing locally from frontend and local storage.");
      }
    } catch (error: any) {
      console.error(
        "Error removing link from database:",
        error?.response?.data || error.message
      );
    }
  };
  const platforms = [
    { value: 'GitHub', icon: <FaGithub /> },
    { value: 'Twitter', icon: <FaTwitter /> },
    { value: 'YouTube', icon: <FaYoutube /> },
    { value: 'LinkedIn', icon: <FaLinkedin /> },
    { value: 'GitLab', icon: <FaGitlab /> },
    { value: 'Frontend Mentor', icon: <SiFrontendmentor /> },
    { value: 'Stack Overflow', icon: <FaStackOverflow /> },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleType = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const chooseLink = (platform: string, index: number) => {
    const updatedLinks = [...linkArr];
    updatedLinks[index].platform = platform;
    setLinkArr(updatedLinks);
    setActiveIndex(null);
  };

  return (
    <>
    <div className={`${linkArr.length >=2 ?'overflow-auto' :""}  h-[600px] lg:h-[500px]`}>
      {linkArr.map((link, index) => (
        <div key={index} className='bg-[#FAFAFA] w-full rounded-[8px] px-[22px] py-[18px] mb-[30px]'>
          <div className='flex justify-between items-center'>
            <p className='text-[16px] text-[#737373]'>Link#{index + 1}</p>
            <button
              className='text-[#737373] text-[16px] font-normal'
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
          <div className='relative w-full'>
            <div className='flex flex-col' onClick={() => handleType(index)}>
              <label htmlFor="" className='text-[#333333] text-[12px] pt-[15px]'>Platform</label>
              <div className='h-[48px] border-[1px] border-[#D9D9D9] rounded-[6px] px-[8px] flex justify-between items-center'>
                <div className='flex items-center gap-[12px]'>
                  <p>{link.platform ? platforms.find(p => p.value === link.platform)?.icon : null}</p>
                  <p>{link.platform || "Choose platform"}</p>
                </div>
                {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            {activeIndex === index && (
              <div className='flex flex-col absolute bg-[#FFFFFF] w-full mt-[8px] rounded-[8px] py-[12px] px-[15px] h-[200px] overflow-y-auto z-10'>
                {platforms.map((platform, platformIndex) => (
                  <div
                    key={platformIndex}
                    onClick={() => chooseLink(platform.value, index)}
                    className='h-[32px] my-[12px] cursor-pointer'>
                    <div className='flex items-center gap-[12px]'>
                      <p>{platform.icon}</p>
                      <p>{platform.value}</p>
                    </div>
                    <hr className='mt-[12px]' />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="" className='text-[#333333] text-[12px] pt-[15px]'>Link</label>
            <input
              type="text"
              placeholder='e.g. https://www.github.com/johnappleseed'
              value={link.url}
              onChange={(e) => handleInputChange(index, 'url', e.target.value)}
              className='h-[48px] border-[1px] border-[#D9D9D9] rounded-[6px] pl-[15px]'
            />
          </div>
        </div>
      ))}
     </div>
    </>
  );
}