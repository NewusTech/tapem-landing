import { newsDetailsQuery, newsListQuery } from "@/api";
import CardBerita from "@/components/berita/cardBerita";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/lib/utils";
import MediaHeader from "@/components/news/mediaHeader";

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
      <section className="container w-full md:w-[70%] flex flex-col">
        <MediaHeader image={newsDetails.image} video={newsDetails.mediaLink} />
        <h1 className="text-2xl font-bold text-primary-main">
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
        <div className="mt-6">{parse(newsDetails.desc)}</div>
        {/* {newsDetails.mediaLink && (
          <div className="mt-6">
            <video
              className="md:w-full md:h-full object-cover rounded-sm"
              width={650}
              height={310}
              autoPlay
              src={newsDetails.mediaLink}
              muted
              controls
              loop
            >
              <source src={newsDetails.mediaLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )} */}
      </section>
      {/* berita lainnya */}
      <section className="container mt-[10rem]">
        <div className="flex flex-row items-center">
          <p className="text-2xl font-bold w-[65%] md:w-[35%]">
            Berita Lainnya
          </p>
          <div className="h-[2px] bg-gray-300 w-full ml-4" />
        </div>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 mt-10">
          {moreNews?.data
            .slice(0, 4)
            .map((data, index) => <CardBerita key={data.slug} data={data} />)}
        </div>
      </section>
    </section>
  );
}
