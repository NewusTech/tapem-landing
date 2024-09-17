import {
  personilListProps,
  personilListQuery,
  tugasPokokFungsiQuery,
} from "@/api";
import { CircleUserRound } from "lucide-react";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";

export default async function Profile() {
  const tupoksi = await tugasPokokFungsiQuery();
  const personil = await personilListQuery();

  // Helper function to group personil by Jabatan.level
  const groupByLevel = (personil: any) => {
    return personil.reduce((acc: any, person: any) => {
      const level = person.Jabatan.lavel;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(person);
      return acc;
    }, {});
  };
  // Group personil by their levels
  const groupedPersonil = groupByLevel(personil || []);

  return (
    <section className="pb-10">
      <div className="w-full h-[20rem] flex flex-col items-center justify-center bg-[url('/assets/images/dummy_1.png')] relative bg-cover overflow-hidden">
        <div className="bg-white/40 w-full h-full absolute" />
        <p className="text-xl md:text-2xl w-fit font-bold pb-2 md:pb-4 border-b-2 border-primary-main z-[2]">
          Tugas Pokok
        </p>
        <div className="text-base md:text-xl font-semibold w-[90%] md:w-[50%] text-center z-[2] mt-5 md:mt-10">
          {parse(tupoksi?.tugaspokok || "")}
        </div>
      </div>
      <div className="bg-gradient-to-t from-primary-main/60 to-primary-soft/60 py-10 px-12 md:px-36 flex flex-col items-center">
        <p className="text-xl font-bold pb-1 border-b-2 border-primary-main">
          Fungsi Utama
        </p>
        <div className="list-disc mt-12 text-justify space-y-4">
          {parse(tupoksi?.fungsiutama || "")}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold pb-1 border-b-2 border-primary-main mt-20">
          Struktur Organisasi
        </p>

        <div className="w-fit h-fit flex flex-col items-center mt-10">
          <div className="w-[7rem] md:w-[12rem] h-[7rem] md:h-[12rem] overflow-hidden rounded-full text-primary-main">
            <CircleUserRound
              width={24}
              hanging={24}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-bold text-base md:text-xl text-center mt-4">
            Nama
          </p>
          <p className="text-center text-sm md:text-lg">NIP</p>
        </div>

        <div className="w-full flex flex-wrap gap-12 justify-center px-10 mt-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index + "personil"}
              className="w-fit h-fit flex flex-col items-center"
            >
              <div className="w-[7rem] md:w-[12rem] h-[7rem] md:h-[12rem] overflow-hidden rounded-full text-primary-main">
                {/* <Image src={"/assets/images/dummy_1.png"} alt="image" width={300} height={300} className="w-full h-full object-cover"/> */}
                <CircleUserRound
                  width={24}
                  hanging={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-bold text-base md:text-xl text-center mt-4">
                Nama
              </p>
              <p className="text-center text-sm md:text-lg">NIP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
