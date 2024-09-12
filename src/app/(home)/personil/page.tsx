"use client"
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Personil() {
  return (
    <section className="py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-10 mb-12">
        Personil
      </h1>
      <div className="w-full flex flex-wrap gap-12 justify-center px-10">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index + "personil"}
            className="w-fit h-fit flex flex-col items-center"
          >
            <div className="w-[12rem] h-[12rem] overflow-hidden rounded-full text-primary-main">
                {/* <Image src={"/assets/images/dummy_1.png"} alt="image" width={300} height={300} className="w-full h-full object-cover"/> */}
                <CircleUserRound width={24} hanging={24} className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-xl text-center mt-4">
              Nama
            </p>
            <p className="text-center text-lg">NIP</p>
          </div>
        ))}
      </div>
    </section>
  );
}
