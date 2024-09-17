import { newsListQuery } from "@/api";
import CardBerita, {
  CardBeritaSekeleton,
} from "@/components/berita/cardBerita";
import React from "react";

export default async function notFound() {
  const newsList = await newsListQuery();
  return (
    <section className="container min-h-screen flex flex-col py-[5rem]">
      <h1 className="font-bold text-4xl text-center text-primary-main">404</h1>
      <h2 className="text-center text-xl mb-[5rem]">
        Opps... Sepertinya halaman yang anda cari tidak ditemukan
      </h2>
      <h3 className="text-primary-main font-bold">Berita Terbaru</h3>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 mt-10">
        {newsList?.data.map((data, index) => (
          <CardBerita key={data.slug} data={data} />
        ))}
        {!newsList &&
          Array.from({ length: 16 }).map((_, index) => (
            <CardBeritaSekeleton key={index + "berita sekeleton"} />
          ))}
      </div>
    </section>
  );
}
