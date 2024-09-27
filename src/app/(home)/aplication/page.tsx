import { aplikasiListQuery } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Aplication() {
  const aplicationList = await aplikasiListQuery();
  return (
    <section className="py-1 pb-10 md:py-10 container">
      <h1 className="text-primary-main text-2xl md:text-3xl font-semibold mb-6">
        Aplikasi
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
        {aplicationList?.map((data, index) => (
          <Link
            key={index + "aplikasi"}
            href={data.link}
            target="_blank"
            className="w-full h-auto flex flex-col justify-center gap-x-4 overflow-hidden rounded-xl border shadow-sm py-8 px-8 duration-150 bg-gray-50"
          >
            <div className="flex flex-row gap-x-4">
              <Avatar className="w-[34px] h-[34px]">
                <AvatarImage
                  src={data.image ?? "/assets/images/no-image.png"}
                  className="w-full h-full object-cover bg-center"
                />
                <AvatarFallback>{data.name}</AvatarFallback>
              </Avatar>
              <p className="font-bold text-start text-primary-main z-[2] mb-4 text-lg sm:text-xl">
                {data.name}
              </p>
            </div>
            <p className="text-start text-primary-main z-[2] text-sm sm:text-base">
              {data.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
