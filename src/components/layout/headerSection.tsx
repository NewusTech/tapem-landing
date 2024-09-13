"use client";
import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function HeaderSection() {
  return (
    <div className="w-full bg-gradient-to-r from-primary-main to-primary-soft h-[10rem] flex flex-col-reverse sm:flex-row justify-between items-center px-2 md:px-16 py-5 duration-150">
      <div className="flex flex-row items-center">
        <div className="w-[3rem] h-[3.5rem] md:w-[7rem] md:h-[7.5rem] overflow-hidden">
          <Image
            src={"/assets/images/logo.png"}
            alt="Logo"
            height={80}
            width={95}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center text-white items-start ml-4 md:ml-10">
          <p className="text-xl md:text-3xl font-bold">TATA PEMERINTAHAN</p>
          <p className="text-base md:text-xl">KABUPATEN LAMPUNG UTARA</p>
        </div>
      </div>
      <div className="flex flex-row text-white items-center ml-auto gap-8 text-sm md:text-base pr-6 md:pr-0">
        <Link href={"/"}>
          <Facebook />
        </Link>
        <Link href={"/"}>
          <Linkedin />
        </Link>
        <Link href={"/"}>
          <Twitter />
        </Link>
        <Link href={"/"}>
          <Instagram />
        </Link>
      </div>
    </div>
  );
}
