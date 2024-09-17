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
    <div className="w-full bg-primary-main flex flex-col p-4 z-[3] pb-16">
      <div className="flex flex-row gap-5 justify-start lg:justify-center md:relative -top-8 lg:-top-14 w-full overflow-x-auto px-5">
        {aplikasiList.slice(0, 3).map((data, index) => (
          <div
            key={index + "media"}
            className="bg-white rounded-xl shadow-sm text-primary-main flex-none flex flex-row gap-4 items-center p-4 w-[20rem] h-[4rem] overflow-hidden"
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
            <p className="font-medium text-xl line-clamp-1">{data.name}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-auto flex flex-col-reverse mt-12 md:mt-0 md:flex-row text-white items-center">
        <div className="flex flex-col w-full text-center sm:text-start sm:w-[50%] mt-6 md:mt-0 mx-28">
          <p className="font-bold text-xl">
            {mediaBannerData?.length > 0
              ? mediaBannerData[0].title
              : "Sekretariat Daerah"}
          </p>
          <p className="mt-2">
            {" "}
            {mediaBannerData?.length > 0
              ? mediaBannerData[0].subTitle
              : "Bagian Tata Pemerintahan"}
          </p>
          <p className="mt-16">
            {mediaBannerData?.length > 0
              ? mediaBannerData[0].description
              : "Lorem ipsum dolor sit amet consectetur. Eleifend consectetur dapibus sapien senectus vulputate at integer. Mi vestibulum aliquam tempus et interdum fames vel viverra. Condimentum dolor porttitor semper non. Sit ut scelerisque sit auctor."}
          </p>
        </div>
        <div className="w-[100%] h-auto">
          {mediaBannerData?.length > 0 ? (
            <iframe
              width="560"
              height="315"
              src={mediaBannerData[0].mediaLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
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
