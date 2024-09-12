import Image from "next/image";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function MediaLanding() {
  return (
    <div className="w-full bg-primary-main flex flex-col p-4 z-[3] pb-16">
      {/* <div className="flex flex-row gap-4 justify-center sm:relative -top-8 lg:-top-14 w-full overflow-x-auto duration-150">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index + "media"}
            className="bg-white rounded-xl shadow-sm text-primary-main flex flex-row gap-4 items-center p-4 h-[3rem] md:h-[5rem] w-[19rem] md:w-[20rem] overflow-hidden"
          >
            <div className="w-[1.5rem] md:w-[3rem] h-[1.5rem] md:h-[3rem] bg-primary-main rounded-full overflow-hidden"></div>
            <p className="font-medium text-xl">Nama Aplikasi</p>
          </div>
        ))}
      </div> */}
      <div className="flex flex-row gap-5 justify-start lg:justify-center md:relative -top-8 lg:-top-14 w-full overflow-x-auto px-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index + "media"}
            className="bg-white rounded-xl shadow-sm text-primary-main flex-none flex flex-row gap-4 items-center p-4 w-[20rem] h-[4rem] overflow-hidden"
          >
            <div className="w-[1.5rem] md:w-[3rem] h-[1.5rem] md:h-[3rem] bg-primary-main rounded-full overflow-hidden"></div>
            <p className="font-medium text-xl">Nama Aplikasi</p>
          </div>
        ))}
      </div>

      <div className="w-full h-auto flex flex-col-reverse mt-12 md:mt-0 md:flex-row text-white items-center">
        <div className="flex flex-col w-full text-center sm:text-start sm:w-[50%] mt-6 md:mt-0 mx-28">
          <p className="font-bold text-xl">Sekretariat Daerah</p>
          <p className="mt-2">Bagian Tata Pemerintahan</p>
          <p className="mt-16">
            Lorem ipsum dolor sit amet consectetur. Eleifend consectetur dapibus
            sapien senectus vulputate at integer. Mi vestibulum aliquam tempus
            et interdum fames vel viverra. Condimentum dolor porttitor semper
            non. Sit ut scelerisque sit auctor.
          </p>
        </div>
        <div className="w-[100%] h-auto">
          <Image
            src={"/assets/images/placeholder_video.png"}
            width={600}
            height={600}
            alt="mp4"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
