"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { galeryProps } from "@/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import dynamic from "next/dynamic";

type GaleriLandingProps = {
  galeryList: galeryProps[];
};

export default function GaleriLanding({ galeryList }: GaleriLandingProps) {
  return (
    <div className="w-full flex flex-col gap-4 container mt-6">
      <p className="text-2xl font-bold text-primary-main">Galeri</p>
      <div className="w-full flex flex-wrap gap-4 justify-center">
        {galeryList.length > 1 &&
          galeryList.slice(0, 5).map((data, index) => (
            <Dialog key={index + "galery"}>
              <DialogTrigger className="w-[20rem] sm:w-[18rem] xl:w-[25rem] h-[10rem] sm:h-[11rem] xl:h-[14rem] relative flex flex-col bg-cover overflow-hidden rounded-xl">
                {data.mediaLink ? (
                  <div className="w-full h-full absolute bg-cover">
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
                  />
                )}
                <div className="bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute" />
                <p className="font-semibold mt-auto text-center text-white z-[2] mb-4 w-full">
                  {data.title}
                </p>
              </DialogTrigger>
              <DialogContent className="px-4 border-transparent [&>button]:hidden w-full max-w-[900px]">
                <DialogHeader className="hidden">
                  <DialogTitle>Galeri</DialogTitle>
                  <DialogDescription>{data.title}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col bg-white rounded-xl overflow-hidden w-full">
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
      <Link href={"/galery"} className="ml-auto">
        <Button className="duration-150 bg-primary-main hover:bg-primary-700 focus:bg-primary-800 w-fit rounded-full text-white">
          Lihat Selengkapnya..
        </Button>
      </Link>
    </div>
  );
}
