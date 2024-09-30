"use client";

import { newsProps } from "@/api";
import { cn, formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";

type CardBeritaProps = {
  data: newsProps;
  setActiveIndex: (index: number | null) => void;
  activeIndex: number | null;
  index: number;
};
export default function CardBerita({
  data,
  setActiveIndex,
  activeIndex,
  index,
}: CardBeritaProps) {
  return (
    <Link
      href={`/news/${data.slug}`}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      data-aos="fade-up"
    >
      <div
        className={cn(
          "w-full h-[25rem] flex flex-col pb-4 bg-white rounded-xl overflow-hidden shadow-lg duration-300 group",
          activeIndex && activeIndex !== index && "scale-[0.98]"
        )}
      >
        <div className="w-full h-[50%] bg-gray-400 overflow-hidden">
          <Image
            src={data?.image}
            alt="img"
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-[1.1] duration-300"
          />
        </div>
        <div className="flex flex-row w-full justify-between items-center px-4 py-2">
          <p className="bg-primary-main rounded-full p-1 w-full text-sm text-white text-center mr-2">
            {data?.Kategoriartikel.title}
          </p>
          <p className="text-primary-main text-right w-full">
            {data?.createdAt && formatDate(new Date(data?.createdAt))}
          </p>
        </div>
        <div className="flex flex-row justify-start items-start px-4 w-full">
          <p className="text-primary-main text-base md:text-lg line-clamp-2 md:line-clamp-2 lg:line-clamp-3 font-bold w-full">
            {data?.title}
          </p>
          <div className="h-[32px] w-[36px] ml-auto">
            <ArrowUpRight width={32} height={32} className="w-full h-full" />
          </div>
        </div>
        <div className="text-primary-main text-sm px-4 mt-auto line-clamp-4 lg:line-clamp-3">
          {parse(data.desc)}
        </div>
      </div>
    </Link>
  );
}

export function CardBeritaSekeleton() {
  return (
    <div
      className="w-[14rem] h-[25rem] bg-white rounded-xl overflow-hidden shadow-lg"
      data-aos="fade-up"
    >
      <div className="w-full h-[50%] bg-gray-400 animate-pulse"></div>
      <div className="flex flex-row w-full justify-between items-center px-4 py-2">
        <div className="bg-gray-400 h-4 rounded-full w-full mr-2 animate-pulse" />
        <div className="bg-gray-400 h-4 w-full rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col justify-start items-start px-2">
        <div className="bg-gray-400 h-6 w-full rounded-xl animate-pulse" />
      </div>
      <div className="flex flex-col justify-start items-start px-2 h-full animate-pulse mt-4">
        <div className="bg-gray-400 h-[25%] w-full rounded-xl " />
      </div>
    </div>
  );
}
