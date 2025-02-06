import React from "react";
import mobile from "../../../../public/assets/desktop/mobile.svg";
import Image from "next/image";
import { platformStyles } from "../../components/platformStyles/styles";

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

interface MobileProps {
  linkArr: Link[];
  data: UserData | null;
  setData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export default function Mobile({ linkArr, data }: MobileProps) {
  return (
    <div className="w-[38%] lg:flex justify-center items-center bg-white rounded-[12px] h-[784px] hidden relative">
      <div className="absolute top-[17%]">
        {data?.urlId?.filePath && (
          <Image
            src={data.urlId.filePath}
            alt="userlogo"
            width={104}
            height={104}
            unoptimized
            className="w-[104px] h-[104px] border-[4px] border-[#633CFF] rounded-[52px]"
          />
        )}
      </div>
      <div className="absolute top-[32%] flex flex-col gap-[2px] w-full justify-center items-center">
        <h2
          className="text-[#333333] text-[18px] font-semibold mt-[2px] w-[160px] 
      bg-[#EEEEEE] h-[30px] rounded-[12px] text-center mb-[5px] 
      overflow-hidden text-ellipsis whitespace-nowrap px-2"
        >
          {data?.name}
        </h2>
        <p
          className="text-[14px] text-[#737373] font-normal w-[190px] 
      bg-[#EEEEEE] h-[25px] rounded-[12px] text-center 
      overflow-hidden text-ellipsis whitespace-nowrap px-2"
        >
          {data?.email}
        </p>
      </div>
      <div className="absolute top-[45%] flex flex-col gap-[20px] h-[300px] overflow-y-auto">
        {linkArr.map((res, index) => {
          const { bg, text, icon } = platformStyles[res.platform] || {
            bg: "bg-gray-200",
            text: "text-black",
            icon: null,
          };
          return (
            <div
              key={index}
              className={`w-[236px] rounded-[8px] h-[44px] flex items-center gap-2 px-3 ${bg} ${text} flex-shrink-0`}
            >
              {icon} {/* Display platform icon */}
              <p>{res.platform}</p>
            </div>
          );
        })}
      </div>
      <Image src={mobile} alt="mobile" />
    </div>
  );
}

