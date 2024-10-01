"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { personilListProps, StrukturOrganisasiProps } from "@/api";
import Image from "next/image";
import { Download, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type StrukturOrganisasiComponentProps = {
  groupedPersonil: any[];
  strukturFile : StrukturOrganisasiProps
};
export default function StrukturOrganisasi({
  groupedPersonil,
  strukturFile
}: StrukturOrganisasiComponentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-bold pb-1 border-b-2 border-primary-main mt-16">
        Struktur Organisasi
      </p>
      <a
        href={strukturFile.file}
        target="_blank"
        className="ml-auto mr-10 duration-300 text-primary-main font-bold hover:text-primary-700 flex flex-row gap-x-4 items-center group mt-6 md:mt-0"
      >
        Download Struktur Organisasi{" "}
        <Download className="duration-300 md:opacity-0 group-hover:opacity-100" />
      </a>
      <div className="w-full flex flex-col items-center gap-4 px-10 mt-12">
        {Object.keys(groupedPersonil)
          .sort((a: any, b: any) => a - b) // Sort levels from top to bottom
          .map((level: any) => (
            <div
              key={level}
              className="w-full flex flex-wrap justify-center gap-12"
            >
              {groupedPersonil[level].map(
                (person: personilListProps, index: number) => (
                  <Dialog key={person.id + "personil"}>
                    <div data-aos="fade-up">
                      <DialogTrigger
                        onMouseEnter={() => setActiveIndex(person.id)}
                        onMouseLeave={() => setActiveIndex(null)}
                        className={cn(
                          "w-[7rem] md:w-[12rem] h-auto flex flex-col items-center duration-300 ease-out group",
                          activeIndex !== null &&
                            activeIndex !== person.id &&
                            "scale-[0.98] opacity-50"
                        )}
                      >
                        <div className="w-[7rem] md:w-[10rem] h-[7rem] md:h-[10rem] overflow-hidden rounded-full text-primary-main">
                          <Image
                            src={person.image ?? "/assets/images/no-image.png"}
                            alt={person.name}
                            width={300}
                            height={300}
                            className={cn(
                              "w-full h-full object-cover bg-center duration-300 group-hover:scale-[1.05]"
                            )}
                          />
                        </div>
                        <p
                          className={cn(
                            "font-bold text-base md:text-xl text-center mt-4 duration-300"
                          )}
                        >
                          {person.name}
                        </p>
                        <p className="text-center text-sm md:text-lg mt-auto">
                          {person.Jabatan.title}
                        </p>
                      </DialogTrigger>
                    </div>
                    <DialogContent className="px-4 bg-transparent border-transparent [&>button]:hidden">
                      <DialogHeader className="hidden">
                        <DialogTitle>Detail Personil</DialogTitle>
                        <DialogDescription>{person.name}</DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col bg-primary-main rounded-xl overflow-hidden p-6">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-full mb-6">
                            <DialogClose className="float-right">
                              <X className="text-white" />
                            </DialogClose>
                          </div>
                          <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
                            <Image
                              src={
                                person.image ?? "/assets/images/no-image.png"
                              }
                              alt={person.name}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover bg-center"
                            />
                          </div>
                          <div className="flex flex-col gap-1 py-4 text-white">
                            <span className="font-semibold text-center line-clamp-2 text-xl">
                              {person.name}
                            </span>
                            <span className="text-center text-base">
                              NIP. {person.nip || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col text-white w-full items-center gap-y-3 mt-6">
                            <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                              <p className="font-semibold w-full sm:max-w-[50%] text-left">
                                Jabatan
                              </p>
                              <p className="text-left w-full">
                                <span className="hidden md:inline-block">
                                  :
                                </span>{" "}
                                {person.Jabatan.title || "-"}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                              <p className="font-semibold w-full sm:max-w-[50%] text-left">
                                Kontak
                              </p>
                              <p className="text-left w-full">
                                <span className="hidden md:inline-block">
                                  :
                                </span>{" "}
                                {person.phoneNumber || "-"}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                              <p className="font-semibold w-full sm:max-w-[50%] text-left">
                                Riwayat Jabatan
                              </p>
                              <p className="text-left w-full">
                                <span className="hidden md:inline-block">
                                  :
                                </span>{" "}
                                {person.positionHistory?.split(";").pop() || "-"}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                              <p className="font-semibold w-full sm:max-w-[50%] text-left">
                                Riwayat Pendidikan
                              </p>
                              <p className="text-left w-full">
                                <span className="hidden md:inline-block">
                                  :
                                </span>{" "}
                                {person.educationHistory?.split(";").pop() || "-"}
                              </p>
                            </div>
                            <Link href={`/personil/${person.id}`} className="w-full text-center underline mt-4">Lihat Detail</Link>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
