'use client'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Empty from '../empty';
import Links from '../links';

export default function Content() {
  const [linkArr, setLinkArr] = useState<{ url: string; platform: string }[]>([]);
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<null | string>();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) router.push('/auth/signUp');
    setAccessToken(token as string | null);
  }, [router]);

  if (!accessToken) return null;

  const addLink = () => {
    setLinkArr([...linkArr, { url: '', platform: '' }]);
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
        <button className='h-[46px] bg-[#633CFF] text-white w-full rounded-[8px] mb-[20px]'>Save</button>
      </div>
    </>
  );
}
