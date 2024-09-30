"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bannerProps } from "@/api";
import AutoPlay from "embla-carousel-autoplay";

type BannerLandingProps = {
  bannerList: bannerProps[];
};
export default function BannerLanding({ bannerList }: BannerLandingProps) {
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
    <div className="w-full relative h-fit">
      <Carousel
        className="w-full h-fit z-[2]"
        setApi={setCarouselApi}
        opts={{ loop: true }}
        plugins={[AutoPlay({ playOnInit: true, delay: 3600 })]}
      >
        <CarouselContent>
          {bannerList.map((data, index) => (
            <CarouselItem key={index + "banner"}>
              <Image
                src={data.image}
                alt="image"
                width={1200}
                height={1200}
                className="w-full h-[12rem] sm:h-[20rem] md:h-[22rem] lg:h-[30rem] xl:h-[32rem] object-cover object-bottom"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="w-full flex flex-row justify-between px-2 absolute top-0 h-full items-center pointer-events-none">
        <Button
          onClick={handlePrevious}
          className="p-2 bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3] duration-300 hover:bg-primary-700 hover:text-white group"
        >
          <ChevronLeft className="group-hover:rotate-[360deg] duration-300" />
        </Button>
        <Button
          onClick={handleNext}
          className="p-2 bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3] duration-300 hover:bg-primary-700 hover:text-white group"
        >
          <ChevronRight className="group-hover:rotate-[360deg] duration-300" />
        </Button>
      </div>
    </div>
  );
}
