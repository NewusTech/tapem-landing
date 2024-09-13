import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function GaleriLanding() {
  return (
    <div className="w-full flex flex-col gap-4 container mt-6">
      <p className="text-2xl font-bold text-primary-main">Galeri</p>
      <div className="w-full flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index + "galeri"}
            className="w-[25rem] h-[13rem] sm:h-[15rem] relative flex flex-col bg-[url('/assets/images/dummy_1.png')] bg-cover overflow-hidden rounded-xl bg"
          >
            <div className="bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute" />
            <p className="font-semibold mt-auto text-center text-white z-[2] mb-4">
              Lorem ipsum dolor sit amet
            </p>
          </div>
        ))}
      </div>
      <Link href={"/galery"} className="ml-auto">
        <Button className="bg-primary-main hover:bg-primary-soft w-fit rounded-full text-white">
          Lihat Selengkapnya..
        </Button>
      </Link>
    </div>
  );
}
