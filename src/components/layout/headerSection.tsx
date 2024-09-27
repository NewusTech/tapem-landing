"use client";
import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HeaderSection() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full bg-gradient-to-r from-primary-main to-primary-soft h-fit sm:h-[8rem] flex flex-row gap-y-4 justify-between items-center px-2 md:px-16 py-5 duration-150">
      <div className="flex flex-row items-center">
        <Link href={"/"} className="w-[3rem] h-[3.5rem] md:w-[5rem] md:h-[5.5rem] overflow-hidden">
          <Image
            src={"/assets/images/logo.png"}
            alt="Logo"
            height={80}
            width={95}
            className="object-contain w-full h-full bg-bottom"
          />
        </Link>
        <div className="flex flex-col gap-1 sm:gap-2 justify-center text-white items-start ml-4 md:ml-10">
          <p className="text-sm sm:text-xl md:text-2xl font-bold">TATA PEMERINTAHAN</p>
          <p className="text-sm sm:text-base md:textlg">KABUPATEN LAMPUNG UTARA</p>
        </div>
      </div>
      <div className="flex flex-row text-white items-center ml-auto gap-x-4 sm:gap-x-8 text-sm md:text-base md:pr-0">
        <Link href={"/"}>
          <Facebook size={isMobile ? 14 : 24} />
        </Link>
        <Link href={"/"}>
          <Linkedin size={isMobile ? 14 : 24} />
        </Link>
        <Link href={"/"}>
          <Twitter size={isMobile ? 14 : 24} />
        </Link>
        <Link href={"/"}>
          <Instagram size={isMobile ? 14 : 24} />
        </Link>
      </div>
    </div>
  );
}
