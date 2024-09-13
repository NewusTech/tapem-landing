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
import Image from "next/image";

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
    <>
      <div className="p-8 hidden md:flex flex-col text-primary-main container">
        <p className="text-2xl font-bold">Berita</p>
        <div className="flex flex-row mt-10 relative">
          <div className="flex flex-col items-start justify-center gap-6 bg-gradient-to-b from-primary-soft to-primary-main p-10 h-[35rem] w-full md:w-[60%] rounded-2xl overflow-hidden">
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
      <div className="flex flex-col md:hidden py-6 items-center justify-center">
        <p className="text-primary-main font-semibold text-center">
          Berita Terkait Tentang Tata Pemerintahan Lampung Utara
        </p>
        <div className=" h-full w-full flex items-center justify-center relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[90%]"
            setApi={setCarouselApi}
          >
            <Carousel className="w-full h-fit z-[2]" setApi={setCarouselApi}>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index + "banner"} className="py-4">
                    <Link href={"/news/test"}>
                      <div className="flex flex-col shadow-sm h-[25rem] rounded-xl overflow-hidden pb-4">
                        <div className="w-full h-[60%] bg-gray-400">
                          <Image
                            src={"/assets/images/dummy_2.png"}
                            alt="img"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-row w-full justify-between items-center px-4 py-2">
                          <p className="bg-primary-main rounded-full p-1 w-full text-sm text-white text-center mr-2">
                            Kategori
                          </p>
                          <p className="text-primary-main  w-full">
                            Januari 13, 2024
                          </p>
                        </div>
                        <div className="flex flex-row justify-start items-start px-2">
                          <p className="text-primary-main text-xl font-bold">
                            Lorem Ipsum Dolor Amet Amit Amon Amin
                          </p>
                          <ArrowUpRight width={32} height={32} />
                        </div>
                        <p className="text-primary-main font-normal px-2 mt-2 line-clamp-2 lg:line-clamp-3">
                          Lörem ipsum astrobel sar direlig. Kronde est konfoni
                          med kelig. Terabel pov astrobel ?
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </Carousel>
          <div className="w-full flex flex-row justify-between px-1 absolute h-[40%] right-0 items-center pointer-events-none">
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
        <Link href={"/news/"}>
          <Button className="w-fit bg-white text-primary-main border border-primary-main rounded-full mt-2">
            Lihat Selengkeapnya..
          </Button>
        </Link>
      </div>
    </>
  );
}
