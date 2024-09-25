"use client";

import { aplikasiProps, mediaBannerProps } from "@/api";
import Image from "next/image";
import React from "react";

type MediaLandingProps = {
  aplikasiList: aplikasiProps[];
  mediaBannerData: mediaBannerProps[];
};
export default function MediaLanding({
  aplikasiList,
  mediaBannerData,
}: MediaLandingProps) {
  return (
    <div className="w-full bg-primary-main flex flex-col p-4 z-[3] pb-16 relative">
      <div className="flex flex-row gap-2 sm:gap-5 justify-center absolute left-0 -top-10 sm:-top-8 w-full overflow-hidden px-1 sm:px-5">
        {aplikasiList.slice(0, 3).map((data, index) => (
          <div
            key={index + "media"}
            className="bg-white rounded-xl shadow-sm text-primary-main flex flex-col sm:flex-row gap-4 items-center p-2 px-4 sm:p-4 md:w-[17rem]  lg:w-[17rem] xl:w-[20rem] h-fit sm:h-[4rem] overflow-hidden"
          >
            <div className="w-[1.5rem] md:w-[3rem] h-[1.5rem] md:h-[3rem] bg-primary-200 rounded-full overflow-hidden">
              <Image
                src={data.image}
                alt="img"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-medium text-base sm:text-xl line-clamp-1">{data.name}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-auto flex flex-col-reverse mt-12 sm:mt-0 md:flex-row text-white items-start container sm:pt-[5rem]">
        <div className="flex flex-col w-full text-center sm:text-start sm:w-[80%] mt-6 md:mt-0 mr-0 md:mr-10">
          <p className="font-bold text-xl">
            {mediaBannerData?.length > 0
              ? mediaBannerData[0].title
              : "Sekretariat Daerah"}
          </p>
          <p className="mt-2">
            {mediaBannerData?.length > 0
              ? mediaBannerData[0].subTitle
              : "Bagian Tata Pemerintahan"}
          </p>
          <p className="mt-8 sm:mt-16">
            {mediaBannerData?.length > 0
              ? mediaBannerData[0].description
              : "Lorem ipsum dolor sit amet consectetur. Eleifend consectetur dapibus sapien senectus vulputate at integer. Mi vestibulum aliquam tempus et interdum fames vel viverra. Condimentum dolor porttitor semper non. Sit ut scelerisque sit auctor."}
          </p>
        </div>
        <div className="w-full lg:w-[70%] h-auto ml-auto overflow-hidden rounded-xl">
          {mediaBannerData?.length > 0 ? (
            <video
            className="md:w-full md:h-full object-cover rounded-sm"
            width={650}
            height={310}
            autoPlay
            src={mediaBannerData[0].mediaLink}
            muted
            controls
            loop
          >
            <source src={mediaBannerData[0].mediaLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          ) : (
            <Image
              src={"/assets/images/placeholder_video.png"}
              width={600}
              height={600}
              alt="mp4"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
