import { sambutanDataQuery } from "@/api";
import Image from "next/image";
import React from "react";

export default async function Sambutan() {
  const sambutan = await sambutanDataQuery();
  return (
    <div className="bg-primary-200">
      <div className="flex flex-col md:flex-row container p-12 gap-x-6 gap-y-4">
        <div className="flex flex-col gap-y-6 w-full md:w-[70%]">
          <p className="text-primary-main text-xl font-bold text-center md:text-left">
            {sambutan.title}
          </p>
          <p className="text-justify">{sambutan.desc}</p>
        </div>
        <div className="flex flex-col w-full md:w-[30%] h-auto items-center justify-center">
          <div className="w-full h-[20rem] md:h-[80%] overflow-hidden">
            <Image
              src={sambutan.Personil.image ?? "/assets/images/no-image.png"}
              alt="kepala bidang"
              height={600}
              width={600}
              loading="eager"
              className="w-full h-full object-cover bg-center"
            />
          </div>
          <p className="font-semibold text-primary-main mt-5 md:mt-10 text-center w-full">
            {sambutan.Personil.Jabatan.title}
          </p>
        </div>
      </div>
    </div>
  );
}
