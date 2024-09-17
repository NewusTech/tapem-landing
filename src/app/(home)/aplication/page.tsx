import { aplikasiListQuery } from "@/api";
import Link from "next/link";
import React from "react";

export default async function Aplication() {
  const aplicationList = await aplikasiListQuery();
  return (
    <section className="py-4 md:py-10 container">
      <h1 className="text-primary-main text-3xl font-semibold mb-6">
        Aplikasi
      </h1>
      <div className="w-full flex flex-wrap gap-4 justify-start">
        {aplicationList?.map((data, index) => (
          <Link
            key={index + "aplikasi"}
            href={data.link}
            target="_blank"
            className="w-[25rem] lg:w-[20rem] h-auto flex flex-col justify-center overflow-hidden rounded-xl bg-white border shadow-sm py-8 px-8 duration-150"
          >
            <p className="font-bold text-start text-primary-main z-[2] mb-4 text-lg sm:text-xl">
              {data.name}
            </p>
            <p className="text-start text-primary-main z-[2] text-sm sm:text-base">
              {data.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
