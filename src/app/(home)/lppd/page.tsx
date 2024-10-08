import { lppdListQuery } from "@/api";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const dataLPPD = await lppdListQuery();

  return (
    <section className="py-2 pb-10 md:py-10 container">
      <h1 className="text-primary-main text-2xl md:text-3xl font-semibold mb-6">
        LPPD
      </h1>
      <div className="flex flex-col gap-y-4">
        {dataLPPD.map((data) => (
          <div
            key={data.id}
            className="bg-primary-main text-white p-8 rounded-xl w-full mx-auto flex flex-col gap-y-4"
          >
            <div className="flex flex-col md:flex-row gap-y-2 ">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Tanggal Publish
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.tanggalPublish}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Kategori
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.kategori}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Jenis Informasi
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.jenisInformasi}
                Informasi
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Sub Jenis Informasi
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.subJenisInformasi}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Tipe Dokumen
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.tipeDokumen}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Kandungan Informasi
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.kandunganInformasi}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                Badan Publik
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white">
                <span className="hidden md:inline-block">:</span>{" "}
                {data.badanPublik}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2">
              <p className="font-bold w-full md:w-[50%] lg:w-[30%] pr-0 md:pr-[10rem]">
                File Lampiran
              </p>
              <p className="border-b md:border-b-0 pb-3 border-white underline">
                <span className="hidden md:inline-block">:</span>{" "}
                <Link href={data.fileLampiran} target="_blank">
                  Download File
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
