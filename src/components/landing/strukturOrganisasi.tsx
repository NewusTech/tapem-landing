"use client";

import { EmblaOptionsType } from "embla-carousel";
import React, { useCallback, useEffect, useState } from "react";
import { personilListProps } from "@/api";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { DotButton, useDotButton } from "../embla/EmblaCaroselDotButton";
import { Button } from "../ui/button";

type MediaLandingProps = {
  personil: personilListProps[];
};

export default function StrukturOrganisasi({ personil }: MediaLandingProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [AutoScroll({ playOnInit: true, direction: "forward",speed:1 })]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop: any =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop: any = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="bg-primary-main px-10 py-5 flex flex-col gap-6">
      <p className="text-2xl text-white font-semibold ">Struktur Organisasi</p>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {personil.map((data) => (
            <div
              key={data.id + "personil"}
              className="embla__slide w-full sm:w-[50%] md:w-[25%] flex-shrink-0 p-4 flex flex-col items-center gap-6 mr-4 sm:mr-[4rem]"
            >
              <div className="w-[13rem] sm:w-[10rem] lg:w-[15rem] xl:w-[20rem] h-[13rem] sm:h-[10rem] lg:h-[15rem] xl:h-[20rem]">
                <Image
                  src={data.image ?? "/assets/images/no-image.png"}
                  alt={data.name}
                  width={300}
                  height={300}
                  className="w-fill h-full object-cover bg-center"
                />
              </div>
              <div className="flex flex-col gap-1 text-white">
                <span className="font-semibold text-center line-clamp-1">
                  {data.name}
                </span>
                <span className="text-sm text-center">
                  {data.Jabatan.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__dots mt-4 flex justify-end items-center">
        <Button
          className={`embla__play border border-primary-200 text-primary-200 rounded-full mr-5 duration-300 ${isPlaying ? "hidden" : ""}`}
          onClick={toggleAutoplay}
          type="button"
        >
          {isPlaying ? "Stop" : "Start"}
        </Button>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot bg-white h-4 w-4 rounded-full mr-2 duration-150".concat(
              index === selectedIndex
                ? " embla__dot--selected bg-primary-soft"
                : ""
            )}
          />
        ))}
      </div>
    </div>
  );
}
