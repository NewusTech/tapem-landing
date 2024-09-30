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
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Galery() {
  const [galery, setGalery] = useState<galeryProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getDataGalery = async () => {
    const response = await galeryListQuery();
    setGalery(response);
  };

  useEffect(() => {
    getDataGalery();
  }, []);
  return (
    <section className="py-2 pb-10 md:py-10">
      <h1 className="text-primary-main text-2xl md:text-3xl font-semibold ml-4 sm:ml-10 mb-6">
        Galeri
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-between px-4">
        {galery.length > 1 &&
          galery.map((data, index) => (
            <Dialog key={index + "galery"}>
              <div data-aos="flip-up" data-aos-duration={300 * index}>
                <DialogTrigger
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={cn(
                    "w-full min-h-[13rem] sm:h-[10rem] lg:h-[13rem] xl:h-[15rem] relative flex flex-col bg-cover overflow-hidden rounded-xl duration-300 ease-out",
                    activeIndex !== null &&
                      activeIndex !== index &&
                      "blur-sm scale-[0.98] brightness-75"
                  )}
                >
                  {data.mediaLink ? (
                    <div className="w-full h-full object-cover bg-center absolute">
                      <video
                        className="md:w-full md:h-full object-cover rounded-sm"
                        width={650}
                        height={310}
                        autoPlay
                        src={data.mediaLink}
                        muted
                        loop
                      >
                        <source src={data.mediaLink} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <Image
                      src={data.image ?? "/assets/images/no-image.png"}
                      alt={data.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover bg-center absolute"
                      data-aos="flip-up"
                      data-aos-duration={300 * index}
                    />
                  )}
                  <div
                    className={cn(
                      "bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute md:scale-y-0 bottom-0 origin-bottom duration-300",
                      activeIndex !== null &&
                        activeIndex === index &&
                        "md:scale-y-100"
                    )}
                  />
                  <p
                    className={cn(
                      "font-semibold mt-auto text-center text-white z-[2] mb-4 w-full duration-300 delay-75 md:translate-y-16",
                      activeIndex !== null &&
                        activeIndex === index &&
                        "md:translate-y-0"
                    )}
                  >
                    {data.title}
                  </p>
                </DialogTrigger>
              </div>
              <DialogContent className="px-4 bg-transparent border-transparent [&>button]:hidden  w-full max-w-[900px]">
                <DialogHeader className="hidden">
                  <DialogTitle>Galeri</DialogTitle>
                  <DialogDescription>{data.title}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col bg-white rounded-xl overflow-hidden">
                  {data.mediaLink ? (
                    <video
                      className="md:w-full md:h-full object-cover rounded-sm"
                      width={650}
                      height={310}
                      autoPlay
                      src={data.mediaLink}
                      muted
                      controls
                    >
                      <source src={data.mediaLink} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
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
