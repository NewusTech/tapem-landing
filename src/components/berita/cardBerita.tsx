import { newsProps } from "@/api";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardBeritaProps = {
  data: newsProps;
};
export default function CardBerita({ data }: CardBeritaProps) {
  return (
    <Link href={`/news/${data.slug}`}>
      <div className="max-w-[20rem] h-[25rem] bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="w-full h-[50%] bg-gray-400">
          <Image
            src={data?.image}
            alt="img"
            width={400}
            height={400}
            className="w-full h-full object-cover"
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
        <div className="flex flex-row justify-start items-start px-2">
          <p className="text-primary-main text-lg lg:text-xl line-clamp-2 xl:line-clamp-3 font-bold">
            {data?.title}
          </p>
          <ArrowUpRight width={32} height={32} />
        </div>
        <p className="text-primary-main font-normal px-2 mt-2 line-clamp-2 lg:line-clamp-3">
          {data?.desc}
        </p>
      </div>
    </Link>
  );
}

export function CardBeritaSekeleton() {
  return (
    <div className="w-[14rem] h-[25rem] bg-white rounded-xl overflow-hidden shadow-lg">
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
