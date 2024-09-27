"use client";

import { personilListProps } from "@/api";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { DotButton, useDotButton } from "../embla/EmblaCaroselDotButton";
import { cn } from "@/lib/utils";
import React, { useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type MediaLandingProps = {
  personil: personilListProps[];
};

export default function StrukturOrganisasi({ personil }: MediaLandingProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [AutoScroll({ playOnInit: true, direction: "forward", speed: 1 })]
  );
  const observerRef = useRef(null);

  const { selectedIndex, onDotButtonClick,scrollSnaps } = useDotButton(emblaApi);

  const handleAutoScrollResume = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play();
    }
  }, [emblaApi]);

  const handleVisibilityChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      if (entries[0].isIntersecting) {
        autoScroll.play(); // Play when visible
      } else {
        autoScroll.stop(); // Stop when not visible
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0, // Trigger when % of the carousel is visible
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [emblaRef, handleVisibilityChange]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("pointerUp", handleAutoScrollResume); // Resume after drag

    return () => {
      emblaApi.off("pointerUp", handleAutoScrollResume);
    };
  }, [emblaApi, handleAutoScrollResume]);

  return (
    <div
      className="bg-primary-main px-10 py-5 flex flex-col gap-6"
      ref={observerRef}
    >
      <p className="text-2xl text-white font-semibold">Struktur Organisasi</p>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {personil.map((data) => (
            <Dialog key={data.id + "personil"}>
              <DialogTrigger className="embla__slide h-fit w-full md:w-[50%] lg:w-[29%] flex-shrink-0 flex flex-col items-center gap-6 mr-4 sm:mr-[2rem] bg-white overflow-hidden rounded-xl">
                <div className="w-full h-[20rem] bg-rose-200">
                  <Image
                    src={data.image ?? "/assets/images/no-image.png"}
                    alt={data.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover bg-top object-top"
                  />
                </div>
                <div className="flex flex-col gap-1 text-black w-full px-4 pb-4">
                  <span className="font-semibold text-center line-clamp-1 w-full">
                    {data.name}
                  </span>
                  <span className="text-sm text-center w-full">
                    {data.Jabatan.title}
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="px-4 bg-transparent border-transparent [&>button]:hidden">
                <DialogHeader className="hidden">
                  <DialogTitle>Detail Personil</DialogTitle>
                  <DialogDescription>{data.name}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col bg-white rounded-xl overflow-hidden h-full">
                  <div className="w-full h-[90%]">
                    <Image
                      src={data.image ?? "/assets/images/no-image.png"}
                      alt={data.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover bg-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-black py-4 h-auto">
                    <span className="font-semibold text-center line-clamp-1">
                      {data.name}
                    </span>
                    <span className="text-sm text-center">
                      {data.Jabatan.title}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
      <div className="embla__dots mt-4 flex justify-center items-center">
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
      </div>
    </div>
  );
}
