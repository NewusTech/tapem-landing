"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import CardBerita from "../berita/cardBerita";
import Link from "next/link";

export default function BeritaLanding() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Fungsi untuk next slide
  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  // Fungsi untuk prev slide
  const handlePrevious = () => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  };
  return (
    <div className="p-8 flex flex-col text-primary-main container">
      <p className="text-2xl font-bold">Berita</p>
      <div className="flex flex-row mt-10 relative">
        <div className="flex flex-col items-start justify-center gap-6 bg-gradient-to-b from-primary-soft to-primary-main p-10 h-[35rem] w-[60%] rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-6 w-fit h-fit rounded-full">
              <Newspaper />
            </div>
            <p className="text-white w-[12rem] text-center">
              Berita Terkait Tentang Tata Pemerintahan Lampung Utara
            </p>
          </div>
          <Link href={"/news/"}>
            <Button className="w-fit bg-white text-black rounded-full mt-10">
              Lihat Selengkeapnya..
            </Button>
          </Link>
        </div>
        <div className=" h-full w-[65%] lg:w-[75%] absolute right-0 flex items-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[100%]"
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index + "berita"}
                  className=" md:basis-[50%] lg:basis-[32%] py-5"
                >
                  <CardBerita />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="w-[80%] flex flex-row justify-between px-8 absolute bottom-0 h-[40%] right-0 items-center pointer-events-none">
          <Button
            className="p-4 w-fit h-fit bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3]"
            onClick={handlePrevious}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="p-4 w-fit h-fit bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3]"
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
