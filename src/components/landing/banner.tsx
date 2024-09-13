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
import { AspectRatio } from "../ui/aspect-ratio";

export default function BannerLanding() {
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
        <Carousel className="w-full h-fit z-[2]" setApi={setCarouselApi}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index + "banner"}>
                <Image
                  src={"/assets/images/banner_landing/banner_tapem1.png"}
                  alt="image"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="w-full flex flex-row justify-between px-2 absolute top-0 h-full items-center pointer-events-none">
          <Button
            onClick={handlePrevious}
            className="p-2 bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3]"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={handleNext}
            className="p-2 bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3]"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
  );
}
