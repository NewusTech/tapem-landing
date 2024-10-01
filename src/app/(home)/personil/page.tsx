import { personilListQuery } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

export default async function Personil() {
  const personil = await personilListQuery();
  return (
    <section className="py-1 sm:py-10 pb-10">
      <h1 className="text-primary-main text-2xl md:text-3xl font-semibold ml-10 mb-12">
        Personil
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-4 justify-between px-10">
        {personil?.map((data, index) => (
          <Link href={`/personil/${data.id}`} key={index}>
            <div
              data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
              className="w-full h-auto flex flex-col md:flex-row justify-evenly items-center gap-x-4 duration-300 bg-white hover:bg-primary-main text-primary-main hover:text-white drop-shadow-md rounded-xl p-4 border-[0.5px]"
            >
              <Avatar className="sm:w-[160px] w-[90px] sm:h-[160px] h-[90px]">
                <AvatarImage
                  src={data.image ?? "/assets/images/no-image.png"}
                  className="w-full h-full object-cover bg-center"
                />
                <AvatarFallback>{data.name}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full items-center gap-y-3 mt-6 text-xs md:text-sm">
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    Nama
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.name || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    NIP
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.nip || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    Jabatan
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.Jabatan.title || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    Kontak
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.phoneNumber || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    Riwayat Jabatan
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.positionHistory?.split(";").pop() || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    Riwayat Pendidikan
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.educationHistory?.split(";").pop()  || "-"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
