import { newsDetailsQuery, newsListQuery } from "@/api";
import { notFound } from "next/navigation";
import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/lib/utils";
import MediaHeader from "@/components/news/mediaHeader";
import "@/assets/css/index.css";
import MoreNews from "@/components/news/moreNews";

export default async function DetailBerita({
  params,
}: {
  params: { slug: string };
}) {
  const newsDetails = await newsDetailsQuery(params.slug);
  const moreNews = await newsListQuery();
  if (!newsDetails) return notFound();
  return (
    <section className="py-10">
      <section className="container w-full md:w-[70%] flex flex-col gap-y-[1px]">
        <MediaHeader image={newsDetails.image} video={newsDetails.mediaLink} />
        <h1 className="text-lg md:text-xl font-bold text-primary-main">
          {newsDetails.title}
        </h1>
        <div className="flex flex-row w-full items-center">
          <p className="bg-primary-main rounded-full p-1 w-fit px-10 text-sm text-white text-center mr-2">
            {newsDetails.Kategoriartikel.title}
          </p>
          <p className="text-primary-main w-fit">
            {formatDate(new Date(newsDetails.createdAt))}
          </p>
        </div>
        <div className="mt-6 text-sm">{parse(newsDetails.desc)}</div>
      </section>
      {/* berita lainnya */}
      <MoreNews moreNews={moreNews} />
    </section>
  );
}
