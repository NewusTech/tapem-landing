"use client";

import { EmblaOptionsType } from "embla-carousel";
import React, { useEffect } from "react";
import { personilListProps } from "@/api";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import AutoScroll from 'embla-carousel-auto-scroll'

type MediaLandingProps = {
  personil: personilListProps[];
};

export default function StrukturOrganisasi({ personil }: MediaLandingProps) {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true },[
    // AutoScroll({direction:"forward"})
  ]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div className="bg-primary-main px-10 py-5 flex flex-col gap-6">
      <p className="text-2xl text-white font-semibold ">Struktur Organisasi</p>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {personil.map((data) => (
            <div
              key={data.id + "personil"}
              className="embla__slide w-[25%] flex-shrink-0 p-4 flex flex-col items-center gap-6 mr-[20px]"
            >
              <div className="w-[10rem] h-[10rem]">
                <Image
                  src={data.image ?? "/assets/images/no-image.png"}
                  alt={data.name}
                  width={200}
                  height={200}
                  className="w-fill h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 text-white">
                <span className="font-semibold text-center line-clamp-1">
                  {data.name}
                </span>
                <span className="text-sm text-center">{data.Jabatan.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
