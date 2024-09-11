"use client";
import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function HeaderSection() {
  return (
    <div className="w-full bg-gradient-to-r from-primary-main to-primary-soft h-[10rem] flex flex-row px-16 py-5">
      <Image
        src={"/assets/images/logo.png"}
        alt="Logo"
        height={80}
        width={95}
      />
      <div className="flex flex-col gap-2 justify-center text-white items-start ml-10">
        <p className="text-3xl font-bold">TATA PEMERINTAHAN</p>
        <p className="text-xl">KABUPATEN LAMPUNG UTARA</p>
      </div>
      <div className="flex flex-row text-white items-center ml-auto gap-8">
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
