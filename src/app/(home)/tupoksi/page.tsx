import {
  personilListProps,
  personilListQuery,
  strukturOrganisasiQuery,
  tugasPokokFungsiQuery,
} from "@/api";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "@/assets/css/index.css";
import { X } from "lucide-react";
import StrukturOrganisasi from "@/components/tupoksi/strukturOrganisasi";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const tupoksi = await tugasPokokFungsiQuery();
  const personil = await personilListQuery();
  const strukturFile = await strukturOrganisasiQuery()

  const groupByLevel = (data: personilListProps[]) => {
    return data.reduce((acc: any, person) => {
      const level = person.Jabatan.level;
      // Jika level belum ada di accumulator, buat array kosong
      if (!acc[level]) {
        acc[level] = [];
      }
      // Tambahkan person ke array level yang sesuai
      acc[level].push(person);
      return acc;
    }, {}); // Initial value sebagai object kosong
  };

  const groupedPersonil = groupByLevel(personil || []);

  return (
    <section className="pb-10">
      <div className="w-full min-h-[20rem] py-4 flex flex-col items-center justify-center bg-[url('/assets/images/tupoksi-bg.jpg')] relative bg-cover overflow-hidden">
        <div className="bg-white/60 w-full h-full absolute" />
        <p className="text-xl md:text-2xl w-fit font-bold pb-2 md:pb-4 border-b-2 border-primary-main z-[2]">
          Tugas Pokok
        </p>
        <div className="text-base md:text-xl font-semibold w-[90%] lg:w-[70%] xl:w-[50%] text-center z-[2] mt-5 md:mt-10">
          {parse(tupoksi?.tugaspokok || "")}
        </div>
      </div>
      <div className="bg-gradient-to-t from-primary-main/60 to-primary-soft/60 py-10 px-12 md:px-36 flex flex-col items-center">
        <p className="text-xl font-bold pb-1 border-b-2 border-primary-main">
          Fungsi Utama
        </p>
        <div className="mt-12 text-justify space-y-4">
          {parse(tupoksi?.fungsiutama || "")}
        </div>
      </div>
      <StrukturOrganisasi groupedPersonil={groupedPersonil} strukturFile={strukturFile} />
    </section>
  );
}
