import { newsListQuery } from "@/api";
import NotFoundNews from "@/components/notfound/notFoundNews";
import React from "react";

export default async function notFound() {
  const newsList = await newsListQuery();
  return (
    <section className="container min-h-screen flex flex-col py-[5rem]">
      <h1 className="font-bold text-4xl text-center text-primary-main">404</h1>
      <h2 className="text-center text-xl mb-2">
        Opps... Sepertinya halaman yang anda cari tidak ditemukan
      </h2>
      <a href="/" className="text-primary-main font-bold text-center mb-[5rem]">
        Kembali Kehalaman Utama
      </a>
      <NotFoundNews newsList={newsList} />
    </section>
  );
}
