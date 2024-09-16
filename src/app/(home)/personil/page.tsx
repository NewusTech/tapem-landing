import { personilListQuery } from "@/api";
import Image from "next/image";
import React from "react";

export default async function Personil() {
  const personil = await personilListQuery();
  return (
    <section className="py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-10 mb-12">
        Personil
      </h1>
      <div className="w-full flex flex-wrap gap-12 justify-center px-10">
        {personil?.map((data, index) => (
          <div
            key={index + "personil"}
            className="w-[7rem] md:w-[12rem] h-fit flex flex-col items-center"
          >
            <div className="w-[7rem] md:w-[10rem] h-[7rem] md:h-[10rem] overflow-hidden rounded-full text-primary-main">
              <Image
                src={data.image}
                alt="image"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-base md:text-xl text-center mt-4">
              {data.name}
            </p>
            <p className="text-center text-sm md:text-lg">
              {data.Jabatan.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
