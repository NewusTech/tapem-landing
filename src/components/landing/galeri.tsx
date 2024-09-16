"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { galeryProps } from "@/api";

type GaleriLandingProps = {
  galeryList: galeryProps[];
};

export default function GaleriLanding({ galeryList }: GaleriLandingProps) {
  return (
    <div className="w-full flex flex-col gap-4 container mt-6">
      <p className="text-2xl font-bold text-primary-main">Galeri</p>
      <div className="w-full flex flex-wrap gap-4 justify-center">
        {galeryList.length > 1 &&
          galeryList.map((data, index) => (
            <div
              key={index + "galeri"}
              className="w-[20rem] sm:w-[18rem] xl:w-[25rem] h-[13rem] sm:h-[12rem] xl:h-[15rem] relative flex flex-col bg-cover overflow-hidden rounded-xl"
              style={{ backgroundImage: `url(${data.image})` }}
            >
              <div className="bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute" />
              <p className="font-semibold mt-auto text-center text-white z-[2] mb-4">
                {data.title}
              </p>
            </div>
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
