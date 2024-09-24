import { personilListQuery } from "@/api";
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
    <section className="py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-10 mb-12">
        Personil
      </h1>
      <div className="w-full flex flex-wrap gap-12 justify-center px-10">
        {personil?.map((data, index) => (
          <Dialog key={data.id + "personil"}>
            <DialogTrigger className="w-[7rem] md:w-[12rem] h-auto flex flex-col items-center">
              <div className="w-[7rem] md:w-[10rem] h-[7rem] md:h-[10rem] overflow-hidden rounded-full text-primary-main">
                <Image
                  src={data.image ?? "/assets/images/no-image.png"}
                  alt={data.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover bg-center"
                />
              </div>
              <p className="font-bold text-base md:text-xl text-center mt-4">
                {data.name}
              </p>
              <p className="text-center text-sm md:text-lg mt-auto">
                {data.Jabatan.title}
              </p>
            </DialogTrigger>
            <DialogContent className="px-4 bg-transparent border-transparent w-full h-full max-w-[550px] max-h-[600px] [&>button]:hidden">
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
                    <span className="font-semibold text-center line-clamp-1 text-xl">
                      {data.name}
                    </span>
                    <span className="text-center text-base">
                      NIP. xxxxxxxxxxxxxxxxx
                    </span>
                  </div>
                  <div className="flex flex-col text-white w-[80%] items-center gap-y-3 mt-6">
                    <div className="flex flex-row w-full justify-left items-center">
                      <p className="font-semibold w-[50%] text-left">Jabatan</p>
                      <p className="">:Jabatan</p>
                    </div>
                    <div className="flex flex-row w-full justify-left items-center">
                      <p className="font-semibold w-[50%]">kontak</p>
                      <p className="">:kontak</p>
                    </div>
                    <div className="flex flex-row w-full justify-left items-center">
                      <p className="font-semibold w-[50%]">Riwayat Jabatan</p>
                      <p className="">:Riwayat Jabatan</p>
                    </div>
                    <div className="flex flex-row w-full justify-left items-center">
                      <p className="font-semibold w-[50%]">
                        Riwayat Pendidikan
                      </p>
                      <p className="">:Riwayat Pendidikan</p>
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
