import {
  personilListProps,
  personilListQuery,
  tugasPokokFungsiQuery,
} from "@/api";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const tupoksi = await tugasPokokFungsiQuery();
  const personil = await personilListQuery();

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
        <div className="w-full flex flex-col items-center gap-12 px-10 mt-6">
          {Object.keys(groupedPersonil)
            .sort((a: any, b: any) => a - b) // Sort levels from top to bottom
            .map((level) => (
              <div key={level} className="w-full flex flex-wrap justify-center gap-12">
                {groupedPersonil[level].map(
                  (person: personilListProps, index: number) => (
                    <div
                      key={index + "personil"}
                      className="w-fit h-fit flex flex-col items-center"
                    >
                      <div className="w-[7rem] md:w-[10rem] h-[7rem] md:h-[10rem] overflow-hidden rounded-full text-primary-main">
                        <Image
                          src={person.image??"/assets/images/no-image.png"}
                          alt="image"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-base md:text-xl text-center mt-4">
                        {person.name}
                      </p>
                      <p className="text-center text-sm md:text-lg">
                        {person.Jabatan.title}
                      </p>
                    </div>
                  )
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
