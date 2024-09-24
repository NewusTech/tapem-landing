"use client";

import { galeryListQuery, galeryProps } from "@/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"));

export default function Galery() {
  const [galery, setGalery] = useState<galeryProps[]>([]);

  const getDataGalery = async () => {
    const response = await galeryListQuery();
    setGalery(response);
  };

  useEffect(() => {
    getDataGalery();
  }, []);
  return (
    <section className="py-4 md:py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-4 sm:ml-10 mb-6">
        Galery
      </h1>
      <div className="w-full flex flex-wrap gap-4 justify-center px-4">
        {galery.length > 1 &&
          galery.map((data, index) => (
            <Dialog key={index + "galery"}>
              <DialogTrigger className="w-[20rem] sm:w-[18rem] lg:w-[24rem] xl:w-[26rem] h-[13rem] sm:h-[10rem] lg:h-[13rem] xl:h-[15rem] relative flex flex-col bg-cover overflow-hidden rounded-xl">
                {data.mediaLink ? (
                  <div className="w-full h-full object-cover bg-center absolute">
                    <LiteYouTubeEmbed id={data.mediaLink} title={"Youtube"} />
                  </div>
                ) : (
                  <Image
                    src={data.image ?? "/assets/images/no-image.png"}
                    alt={data.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover bg-center absolute"
                  />
                )}
                <div className="bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute" />
                <p className="font-semibold mt-auto text-center text-white z-[2] mb-4 w-full">
                  {data.title}
                </p>
              </DialogTrigger>
              <DialogContent className="px-4 bg-transparent border-transparent [&>button]:hidden  w-full max-w-[900px]">
                <DialogHeader className="hidden">
                  <DialogTitle>Galeri</DialogTitle>
                  <DialogDescription>{data.title}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col bg-white rounded-xl overflow-hidden">
                  {data.mediaLink ? (
                    <LiteYouTubeEmbed id={data.mediaLink} title={"Youtube"} />
                  ) : (
                    <div className="w-full h-[90%] overflow-hidden">
                      <Image
                        src={data.image ?? "/assets/images/no-image.png"}
                        alt={data.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover bg-center"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 text-black py-4">
                    <span className="font-semibold text-center line-clamp-1">
                      {data.title}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
      </div>
    </section>
  );
}
