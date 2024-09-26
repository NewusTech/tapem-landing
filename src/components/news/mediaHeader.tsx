"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { DotButton, useDotButton } from "../embla/EmblaCaroselDotButton";
import { cn } from "@/lib/utils";
import "@/assets/css/embla_one.css";

type MediaHeaderProps = {
  image: string;
  video?: string | null;
};

export default function MediaHeader({ image, video }: MediaHeaderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, dragFree: false },
    []
  );

  const { selectedIndex, onDotButtonClick, scrollSnaps } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [video, emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {video && (
            <div className="embla__slide max-h-[30rem]">
              <video
                className="w-full h-full object-cover rounded-sm"
                width={650}
                height={310}
                autoPlay
                src={video}
                muted
                controls
                loop
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="embla__slide max-h-[30rem]">
            <Image
              src={image}
              alt="Image"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {video && (
        <div className="mt-4 flex justify-center items-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "w-2 h-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4  rounded-full mr-2 duration-300 bg-gray-300",
                index === selectedIndex && "bg-primary-soft"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
