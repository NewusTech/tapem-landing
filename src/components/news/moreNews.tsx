"use client";

import { newsListQueryResponse } from "@/api";
import React, { useState } from "react";
import CardBerita from "../berita/cardBerita";

type MoreNewsProps = {
  moreNews: newsListQueryResponse;
};
export default function MoreNews({ moreNews }: MoreNewsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <section className="container mt-[6rem]">
      <div className="flex flex-row items-center">
        <p className="text-xl md:text-2xl font-bold w-[95%] md:w-[35%]">
          Berita Lainnya
        </p>
        <div className="h-[2px] bg-gray-300 w-[50%] md:w-full ml-4" />
      </div>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {moreNews?.data
          .slice(0, 4)
          .map((data, index) => (
            <CardBerita
              key={data.slug}
              data={data}
              index={index}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          ))}
      </div>
    </section>
  );
}
