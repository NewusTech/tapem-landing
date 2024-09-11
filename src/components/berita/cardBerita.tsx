import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CardBerita() {
  return (
    <div className="max-w-[20rem] h-[25rem] bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="w-full h-[50%] bg-gray-400">
        <Image
          src={"/assets/images/dummy_2.png"}
          alt="img"
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-row w-full justify-between items-center px-4 py-2">
        <p className="bg-primary-main rounded-full p-1 w-full text-sm text-white text-center mr-2">
          Kategori
        </p>
        <p className="text-primary-main  w-full">Januari 13, 2024</p>
      </div>
      <div className="flex flex-row justify-start items-start px-2">
        <p className="text-primary-main text-xl font-bold">
          Lorem Ipsum Dolor Amet Amit Amon Amin
        </p>
        <ArrowUpRight width={32} height={32} />
      </div>
      <p className="text-primary-main font-normal px-2 mt-4 line-clamp-2 lg:line-clamp-3">
        Lörem ipsum astrobel sar direlig. Kronde est konfoni med kelig. Terabel
        pov astrobel ?
      </p>
    </div>
  );
}
