import { regulasiListQuery } from "@/api";
import Link from "next/link";
import React from "react";
import "@/assets/css/index.css"

export default async function Page() {
  const dataRegulasi = await regulasiListQuery();

  return (
    <section className="py-4 md:py-10 container">
      <h1 className="text-primary-main text-3xl font-semibold mb-6">
        Regulasi
      </h1>

      <ul className="bg-primary-main text-white p-6 rounded-xl space-y-6 w-full mx-auto">
        {dataRegulasi.map((regulasi, index) => (
          <li className="ml-2 sm:ml-4 mr-4 sm:mr-2 text-base sm:text-lg text-justify w-full pr-4" key={index}>
            {regulasi.title} <br />
            <Link href={regulasi.file} className="font-semibold">
              (Unduh PDF)
            </Link>
            ​
          </li>
        ))}
      </ul>
    </section>
  );
}
