import { galeryListQuery } from "@/api";
import React from "react";

export default async function Galery() {
  const galeriList = await galeryListQuery();
  return (
    <section className="py-4 md:py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-4 sm:ml-10 mb-6">
        Galery
      </h1>
      <div className="w-full flex flex-wrap gap-4 justify-center px-4">
        {galeriList?.map((data, index) => (
          <div
            key={index + "galeri"}
            className="w-[25rem] md:w-[20rem] h-[15rem] md:h-[12rem] relative flex flex-col bg-cover overflow-hidden rounded-xl bg"
            style={{ backgroundImage: `url(${data.image})` }}
          >
            <div className="bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute" />
            <p className="font-semibold mt-auto text-center text-white z-[2] mb-4">
              {data.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
