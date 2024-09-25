"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";
import { DotButton, useDotButton } from "../embla/EmblaCaroselDotButton";
import { cn } from "@/lib/utils";

type MediaHeaderProps = {
  image: string;
  video?: string | null;
};
export default function MediaHeader({ image, video }: MediaHeaderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, dragFree: false },
    []
  );

  const { selectedIndex, onDotButtonClick, scrollSnaps } = useDotButton(emblaApi);

  return (
    <div className="overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex flex-row max-h-[30rem] w-[60rem]">
          <div className="embla__slide w-[60rem] max-h-[30rem] self-center overflow-hidden">
            <Image
              src={image}
              alt="Iamge"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          {/* <div className="embla__slide w-[60rem] max-h-[30rem] self-center overflow-hidden">
            <Image
              src={image}
              alt="Iamge"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div> */}
        </div>
      </div>
      {/* <div className="embla__dots mt-4 flex justify-end items-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              "h-4 w-4 rounded-full mr-2 duration-300 bg-white",
              index === selectedIndex && "bg-primary-soft"
            )}
          />
        ))}
      </div> */}
    </div>
  );
}
