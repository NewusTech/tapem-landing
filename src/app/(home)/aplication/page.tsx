"use client";

import { aplikasiListQuery, aplikasiProps } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AplicationPage() {
  const [aplication, setAplication] = useState<aplikasiProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getDataAplication = async () => {
    const response = await aplikasiListQuery();
    setAplication(response);
  };

  useEffect(() => {
    getDataAplication();
  }, []);
  return (
    <section className="py-1 pb-10 md:py-10 container">
      <h1 className="text-primary-main text-2xl md:text-3xl font-semibold mb-6">
        Aplikasi
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
        {aplication?.map((data, index) => (
          <Link
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            key={index + "aplikasi"}
            href={data.link}
            target="_blank"
            data-aos="flip-up"
          >
            <div
              className={cn(
                "w-full h-auto flex flex-col justify-center gap-x-4 overflow-hidden rounded-xl border shadow-sm py-8 px-8 bg-gray-50 text-primary-main hover:text-white hover:bg-primary-main duration-150 ease-out group",
                activeIndex !== null && activeIndex !== index && "scale-[0.98]"
              )}
            >
              <div className="flex flex-row gap-x-4">
                <Avatar className="w-[34px] h-[34px] group-hover:transform group-hover:-scale-x-100 duration-300">
                  <AvatarImage
                    src={data.image ?? "/assets/images/no-image.png"}
                    className="w-full h-full object-cover bg-center"
                  />
                  <AvatarFallback>{data.name}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-start z-[2] mb-4 text-lg sm:text-xl">
                  {data.name}
                </p>
              </div>
              <p className="text-start z-[2] text-sm sm:text-base">
                {data.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
