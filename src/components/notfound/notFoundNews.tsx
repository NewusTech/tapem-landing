"use client";

import { newsListQueryResponse } from "@/api";
import React, { useState } from "react";
import CardBerita, { CardBeritaSekeleton } from "../berita/cardBerita";

type NotFoundNewsProps = {
  newsList: newsListQueryResponse;
};
export default function NotFoundNews({ newsList }: NotFoundNewsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div className="">
      <h3 className="text-primary-main font-bold">Berita Terbaru</h3>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {newsList?.data.map((data, index) => (
          <CardBerita
            index={index}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            key={data.slug}
            data={data}
          />
        ))}
        {!newsList &&
          Array.from({ length: 16 }).map((_, index) => (
            <CardBeritaSekeleton key={index + "berita sekeleton"} />
          ))}
      </div>
    </div>
  );
}
