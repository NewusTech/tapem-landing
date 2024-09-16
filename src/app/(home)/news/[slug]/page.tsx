import { newsDetailsQuery, newsListQuery } from "@/api";
import CardBerita from "@/components/berita/cardBerita";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import parse from "html-react-parser";
import { formatDate } from "@/lib/utils";

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
        <div className="w-full max-h-[30rem] self-center overflow-hidden">
          <Image
            src={newsDetails.image}
            alt="Iamge"
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
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
      </section>
      {/* berita lainnya */}
      <section className="container mt-6">
        <div className="flex flex-row items-center">
          <p className="text-2xl font-bold w-[65%] md:w-[35%]">
            Berita Lainnya
          </p>
          <div className="h-[2px] bg-gray-300 w-full ml-4" />
        </div>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 mt-10">
          {moreNews?.data.map((data, index) => (
            <CardBerita key={data.slug} data={data} />
          ))}
        </div>
      </section>
    </section>
  );
}
