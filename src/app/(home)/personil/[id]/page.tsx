"use client";

import { personilListProps } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SERVER_URL } from "@/constants";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [dataPersonil, setDataPersonil] = useState<personilListProps | null>(
    null
  );

  const getDataPersonil = async () => {
    const response = await fetch(`${SERVER_URL}/personil/get/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const responseStatus = await response.json();
    if (!responseStatus.data) return notFound();
    setDataPersonil(responseStatus.data);
  };

  useEffect(() => {
    getDataPersonil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dataPersonil) return null;
  return (
    <section className="min-h-svh pb-10 flex flex-col">
      <div
        className="bg-cover bg-center h-[240px] sm:h-[340px] relative"
        style={{ backgroundImage: `url('${dataPersonil.image}')` }}
      >
        <div className="bg-black/50 backdrop-blur-sm w-full h-full absolute" />
        <Avatar className="sm:w-[260px] w-[120px] sm:h-[260px] h-[120px] absolute bottom-[-3.5rem] sm:bottom-[-7.5rem] mx-auto inset-x-0">
          <AvatarImage src={dataPersonil.image} alt={dataPersonil.name} className="object-cover bg-center" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-[4rem] sm:mt-[8rem] flex flex-col w-full text-center">
        <p className="text-xl font-bold">{dataPersonil.name}</p>
        <p className="text-lg font-medium uppercase">NIP. {dataPersonil.nip}</p>
      </div>
      <div className="mt-5 border p-4 w-[90%] md:w-1/2 duration-300 bg-primary-soft hover:bg-primary-main text-white shadow-sm rounded-xl mx-auto">
        <p className="font-medium">Jabatan : {dataPersonil.Jabatan.title}</p>
      </div>
      <div className="mt-5 border p-4 w-[90%] md:w-1/2 duration-300 bg-primary-main hover:bg-primary-700 text-white shadow-sm rounded-xl mx-auto">
        <p className="font-medium">
          Kontak : <span className="">{dataPersonil.phoneNumber}</span>
        </p>
      </div>
      <div className="mt-5 border p-4 w-[90%] md:w-1/2 duration-300 bg-primary-soft hover:bg-primary-main text-white shadow-sm rounded-xl mx-auto">
        <p className="font-medium">Riwayat Jabatan</p>
        <ul className="list-decimal pl-4 mt-4 space-y-2">
          {dataPersonil.positionHistory?.split(";").map((jabatan, index) => (
            <li key={index}>{jabatan}</li>
          ))}
        </ul>
      </div>
      <div className="mt-5 border p-4 w-[90%] md:w-1/2 duration-300 bg-primary-main hover:bg-primary-700 text-white shadow-sm rounded-xl mx-auto">
        <p className="font-medium">Riwayat Pendidikan</p>
        <ul className="list-decimal pl-4 mt-4 space-y-2">
          {dataPersonil.educationHistory?.split(";").map((pendidikan, index) => (
            <li key={index}>{pendidikan}</li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-[-1]" />
    </section>
  );
}
