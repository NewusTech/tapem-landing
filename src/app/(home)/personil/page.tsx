import { personilListQuery } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
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
          <Dialog key={data.id + "personil"}>
            <DialogTrigger className="w-full h-auto flex flex-col md:flex-row justify-evenly items-center gap-x-4 duration-300 bg-white hover:bg-primary-main text-primary-main hover:text-white drop-shadow-md rounded-xl p-4 border-[0.5px]">
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
                    {data.positionHistory || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                  <p className="font-semibold w-full sm:max-w-[50%] text-left">
                    Riwayat Pendidikan
                  </p>
                  <p className="text-left w-full">
                    <span className="hidden md:inline-block">:</span>{" "}
                    {data.educationHistory || "-"}
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="px-4 bg-transparent border-transparent w-full max-w-[550px] h-fit min-h-[600px] [&>button]:hidden">
              <DialogHeader className="hidden">
                <DialogTitle>Detail Personil</DialogTitle>
                <DialogDescription>{data.name}</DialogDescription>
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
                      src={data.image ?? "/assets/images/no-image.png"}
                      alt={data.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover bg-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1 py-4 text-white">
                    <span className="font-semibold text-center line-clamp-2 text-xl">
                      {data.name}
                    </span>
                    <span className="text-center text-base">
                      NIP. {data.nip || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col text-white w-full items-center gap-y-3 mt-6">
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
                        {data.positionHistory || "-"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                      <p className="font-semibold w-full sm:max-w-[50%] text-left">
                        Riwayat Pendidikan
                      </p>
                      <p className="text-left w-full">
                        <span className="hidden md:inline-block">:</span>{" "}
                        {data.educationHistory || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
