import Image from "next/image";
import React from "react";

export default function MediaLanding() {
  return (
    <div className="w-full bg-primary-main flex flex-col p-4 z-[3] pb-16">
      <div className="flex flex-row gap-4 justify-center relative -top-14">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index + "media"}
            className="bg-white rounded-xl shadow-sm text-primary-main flex flex-row gap-4 items-center p-4 w-[25%] overflow-hidden"
          >
            <div className="w-[3rem] h-[3rem] bg-primary-main rounded-full overflow-hidden"></div>
            <p className="font-medium text-xl">Nama Aplikasi</p>
          </div>
        ))}
      </div>
      <div className="w-full h-auto flex flex-row text-white items-center">
        <div className="flex flex-col w-[50%] mx-28">
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
