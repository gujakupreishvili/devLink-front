import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useRef } from 'react';
import { LuImagePlus } from 'react-icons/lu';

export default function Img() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const Upload = async (formData: FormData) => {
    try {
      const token = getCookie('accessToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });

      console.log('Upload success:', res.data);
    } catch (error) {
      console.log('Upload error:', error);
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      Upload(formData);
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] mt-[12px] rounded-[5px] p-[15px] mb-[25px]">
      <p className="text-[#737373] text-[15px]">Profile picture</p>
      <div
        onClick={handleDivClick}
        className="bg-[#EFEBFF] flex flex-col justify-center items-center p-[50px] gap-[20px] my-[20px] rounded-[8px] cursor-pointer"
      >
        <LuImagePlus className="text-[#633CFF] text-[27px]" />
        <p className="text-[#633CFF]">Upload Image</p>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-[#737373] text-[15px]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
    </div>
  );
}
