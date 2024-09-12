"use client";

import CardBerita from "@/components/berita/cardBerita";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function News() {
  return (
    <section className="w-full container pb-10">
      <h1 className="text-primary-main text-3xl font-semibold">Berita Utama</h1>
      <div className="w-full h-[17rem] bg-white rounded-xl overflow-hidden shadow-lg flex flex-row">
        <div className="w-[40%] h-full] bg-gray-400">
          <Image
            src={"/assets/images/dummy_2.png"}
            alt="img"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col py-4 px-6 w-full">
          <div className="flex flex-row w-full items-center px-4 py-2">
            <p className="bg-primary-main rounded-full p-1 w-full max-w-[25%] text-sm text-white text-center mr-2">
              Kategori
            </p>
            <p className="text-primary-main w-fit ml-auto">Januari 13, 2024</p>
          </div>
          <div className="flex flex-row justify-start items-center px-2">
            <p className="text-primary-main text-xl font-bold">
              Lorem Ipsum Dolor Amet Amit Amon Amin
            </p>
            <ArrowUpRight
              width={32}
              height={32}
              className="text-primary-main"
            />
          </div>
          <p className="text-black font-normal px-2 mt-4 line-clamp-4 lg:line-clamp-6">
            Lorem ipsum dolor sit amet consectetur. Velit nullam aliquet massa
            est faucibus id pellentesque amet. Volutpat urna fringilla sit eu
            ornare. Et venenatis enim in fermentum vestibulum dui pretium id.
            Dolor eu cursus facilisis volutpat felis. Facilisi aenean nisl sed
            pretium malesuada purus. Ut risus amet magna leo faucibus ultrices
            molestie volutpat quam. Eu non sit nunc quam id urna lectus. At eget
            fermentum posuere ac.
          </p>
        </div>
      </div>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 mt-10">
        {Array.from({ length: 16 }).map((_, index) => (
          <Link href={"/news/test"} key={index + "berita"}>
            <CardBerita />
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent className="space-x-2">
            <PaginationItem className="text-gray-400 border rounded-lg">
              <PaginationLink href="#">
                <ChevronLeft />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="text-primary-main border rounded-lg">
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem className="text-gray-400 border rounded-lg p-[2px]">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="text-primary-main border rounded-lg">
              <PaginationLink href="#">6</PaginationLink>
            </PaginationItem>
            <PaginationItem className="text-gray-400 border rounded-lg">
              <PaginationLink href="#">
                <ChevronRight />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
