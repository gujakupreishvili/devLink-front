import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useRef } from "react";
import { LuImagePlus } from "react-icons/lu";

interface ImgProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Img({ setData }: ImgProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const Upload = async (formData: FormData) => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.post("https://devlinks-back-ffrr.onrender.com/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", res.data);
      if (res.data.filePath) {
        setData((prev: any) => ({
          ...prev,
          urlId: { filePath: res.data.filePath },
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
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
      formData.append("file", file);

      Upload(formData);
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] mt-[12px] rounded-[5px] p-[15px] mb-[25px] md:flex md:items-center md:justify-between">
      <p className="text-[#737373] text-[15px]">Profile picture</p>
      <div className='md:flex md:gap-[45px] md:items-center'>
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
      <p className="text-[#737373] text-[15px] md:w-[127px]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </div>
    </div>
  );
}
