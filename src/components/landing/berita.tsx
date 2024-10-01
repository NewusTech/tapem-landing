"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import { newsProps } from "@/api";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

type BeritaLandingProps = {
  newsList: newsProps[];
};
export default function BeritaLanding({ newsList }: BeritaLandingProps) {
  const [caroselApiWeb, setCaroselApiWeb] = useState<CarouselApi | null>(null);
  const [caroselApiMobile, setCaroselApiMobile] = useState<CarouselApi | null>(
    null
  );
  const [isHidden, setIsHidden] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Fungsi untuk next slide
  const handleNextWeb = () => {
    if (caroselApiWeb) {
      caroselApiWeb.scrollNext();
    }
  };
  // Fungsi untuk prev slide
  const handlePreviousWeb = () => {
    if (caroselApiWeb) {
      caroselApiWeb.scrollPrev();
    }
  };

  // Fungsi untuk next slide
  const handleNextMobile = () => {
    if (caroselApiMobile) {
      caroselApiMobile.scrollNext();
    }
  };
  // Fungsi untuk prev slide
  const handlePreviousMobile = () => {
    if (caroselApiMobile) {
      caroselApiMobile.scrollPrev();
    }
  };

  // Menggunakan efek untuk menangani saat API Embla sudah siap
  useEffect(() => {
    if (!caroselApiWeb) return;

    // Callback untuk mengupdate index aktif saat slide berubah
    const onSelect = () => {
      if (caroselApiWeb) {
        const selectedIndex = caroselApiWeb.selectedScrollSnap();
        if (selectedIndex > 0) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
    };

    // Menambahkan event listener untuk event 'select'
    caroselApiWeb.on("select", onSelect);

    // Cleanup listener saat komponen unmount atau API berubah
    return () => {
      caroselApiWeb.off("select", onSelect);
    };
  }, [caroselApiWeb, setIsHidden]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Tambahkan event listener untuk menghapus kelas setelah animasi
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        letter.classList.add("fall");
        letter.style.animationDelay = `${index * 0.05}s`;
        letter.addEventListener(
          "animationend",
          () => {
            letter.classList.remove("fall");
          },
          { once: true }
        );
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className="p-8 hidden md:flex flex-col text-primary-main container">
        <p data-aos="fade-up" className="text-2xl font-bold">
          Berita
        </p>
        <div className="flex flex-row mt-10 relative">
          <motion.div
            animate={{ width: isHidden ? "100%" : "60%" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-start justify-center gap-6 bg-gradient-to-b from-primary-soft to-primary-700 p-10 h-[35rem] rounded-2xl overflow-hidden"
          >
            <motion.div
              animate={{ x: isHidden ? -900 : 20 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div
                className="flex flex-col items-center gap-4"
                data-aos="fade-right"
              >
                <div className="bg-white p-6 w-fit h-fit rounded-full group hover:transform hover:scale-x-100 duration-300">
                  <Newspaper className="group-hover:transform group-hover:-scale-x-100 duration-300" />
                </div>
                <p className="text-white w-[12rem] text-center">
                  Berita Terkait Tentang Tata Pemerintahan Lampung Utara
                </p>
              </div>
              <Link href={"/news/"} className="group" data-aos="fade-up">
                <Button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="w-fit bg-white text-black rounded-full mt-10 duration-300 hover:bg-gray-200 focus:shadow-sm"
                >
                  <span className="animated-text">
                    {"Lihat Selengkapnya".split("").map((letter, index) => {
                      if (letter === " ") {
                        return (
                          <span key={index} className="space">
                            &nbsp;
                          </span>
                        );
                      }
                      return (
                        <span
                          key={index}
                          ref={(el) => {
                            lettersRef.current[index] = el;
                          }}
                          className="letter"
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            animate={{ width: isHidden ? "100%" : "74%" }}
            transition={{ duration: 0.6, type: "spring" }}
            className=" h-full absolute -right-3 lg:-right-6 flex items-center "
          >
            <Carousel
              opts={{
                align: "start",
              }}
              className={`${isHidden ? "w-[96%]" : "w-full md:w-[95%] lg:w-[90%] xl:w-[95%] 2xl:w-full"}`}
              setApi={setCaroselApiWeb}
            >
              <CarouselContent>
                {newsList &&
                  newsList.length > 0 &&
                  newsList.map((data, index) => (
                    <CarouselItem
                      key={index + "berita"}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      className={cn(
                        `${isHidden ? "md:basis-[45%] lg:basis-[32%]" : "md:basis-[65%] lg:basis-[45%]"} 2xl:basis-[32%] py-5 duration-300 group`,
                        activeIndex !== null &&
                          activeIndex !== index &&
                          "scale-[0.98]"
                      )}
                    >
                      <div
                        data-aos="fade-right"
                        data-aos-duration={500 * index}
                      >
                        <Link href={`/news/${data.slug}`}>
                          <div className="max-w-[25rem] h-[25rem] bg-white rounded-xl overflow-hidden shadow-lg">
                            <div className="w-full h-[50%] bg-gray-400 overflow-hidden">
                              <Image
                                src={data?.image}
                                alt="img"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-[1.1] duration-300"
                              />
                            </div>
                            <div className="flex flex-row w-full justify-between items-center px-4 py-2">
                              <p className="bg-primary-main rounded-full p-1 w-full text-sm text-white text-center mr-2">
                                {data?.Kategoriartikel.title}
                              </p>
                              <p className="text-primary-main text-right w-full">
                                {data?.createdAt &&
                                  formatDate(new Date(data?.createdAt))}
                              </p>
                            </div>
                            <div className="flex flex-row justify-start items-start px-4">
                              <p className="text-primary-main text-base md:text-lg line-clamp-3 md:line-clamp-2 font-bold">
                                {data?.title}
                              </p>
                              <ArrowUpRight width={32} height={32} />
                            </div>
                            <div className="text-primary-main text-sm px-4 mt-2 line-clamp-2 lg:line-clamp-3">
                              {parse(data.desc)}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
          <motion.div
            animate={{
              width: isHidden ? "100%" : "78%",
              height: isHidden ? "15%" : "40%",
            }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`flex flex-row justify-between px-8 absolute bottom-0 right-0 items-center pointer-events-none`}
          >
            <Button
              className="p-4 w-fit h-fit bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3] disabled:bg-primary-200 disabled:text-white disabled:opacity-100 duration-300 hover:bg-primary-700 hover:text-white group"
              onClick={handlePreviousWeb}
            >
              <ChevronLeft className="group-hover:rotate-[360deg] duration-300" />
            </Button>
            <Button
              className="p-4 w-fit h-fit bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3] disabled:bg-primary-200 disabled:text-white disabled:opacity-100 duration-300 hover:bg-primary-700 hover:text-white group"
              onClick={handleNextWeb}
            >
              <ChevronRight className="group-hover:rotate-[360deg] duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="flex flex-col md:hidden py-6 items-center justify-center"
      >
        <p className="text-primary-main mb-4 text-xl font-bold">Berita</p>
        <p className="text-primary-main font-semibold text-center">
          Berita Terkait Tentang Tata Pemerintahan Lampung Utara
        </p>
        <div className=" h-full w-full flex items-center justify-center relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[90%]"
            setApi={setCaroselApiMobile}
          >
            <Carousel
              className="w-full h-fit z-[2]"
              setApi={setCaroselApiMobile}
            >
              <CarouselContent>
                {newsList.slice(0, 4).map((data, index) => (
                  <CarouselItem key={index + "banner"} className="py-4">
                    <Link href={"/news/test"}>
                      <div className="flex flex-col shadow-md h-[25rem] rounded-xl overflow-hidden pb-4 bg-white">
                        <div className="w-full h-[50%] bg-gray-400">
                          <Image
                            src={data.image}
                            alt="img"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-row w-full justify-between items-center px-4 py-2">
                          <p className="bg-primary-main rounded-full p-1 w-full text-sm text-white text-center mr-2">
                            {data.Kategoriartikel.title}
                          </p>
                          <p className="text-primary-main text-right w-full">
                            {formatDate(new Date(data.createdAt))}
                          </p>
                        </div>
                        <div className="flex flex-row justify-start items-start px-2">
                          <p className="text-primary-main text-lg line-clamp-3 font-bold">
                            {data.title}
                          </p>
                          <div className="h-[32px] w-[36px] ml-auto">
                            <ArrowUpRight
                              width={32}
                              height={32}
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="text-primary-main font-normal px-2 mt-2 line-clamp-3 lg:line-clamp-4">
                          {parse(data.desc)}
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </Carousel>
          <div className="w-full flex flex-row justify-between px-1 absolute h-[40%] right-0 items-center pointer-events-none">
            <Button
              className="p-4 w-fit h-fit bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3] disabled:bg-primary-200 disabled:text-white disabled:opacity-100"
              onClick={handlePreviousMobile}
            >
              <ChevronLeft />
            </Button>
            <Button
              className="p-4 w-fit h-fit bg-white text-primary-main rounded-full pointer-events-auto shadow-md z-[3] disabled:bg-primary-200 disabled:text-white disabled:opacity-100"
              onClick={handleNextMobile}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <Link href={"/news/"} className="w-full px-4 mt-2">
          <Button className="w-full bg-white text-primary-main border border-primary-main rounded-xl py-6 font-semibold duration-150 hover:bg-gray-50">
            Lihat Selengkapnya..
          </Button>
        </Link>
      </div>
    </>
  );
}
