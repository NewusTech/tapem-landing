"use client";

import { newsListQuery, newsListQueryResponse } from "@/api";
import CardBerita, {
  CardBeritaSekeleton,
} from "@/components/berita/cardBerita";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";
import Aos from "aos";

export default function News() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [newsList, setNewsList] = useState<newsListQueryResponse>();
  const [currentPage, setCurrentPage] = useState(
    newsList?.pagination.page || 1
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useMemo(async () => {
    const response = await newsListQuery(search || "");
    setNewsList(response);
  }, [search]);

  const handleNext = () => {
    if (newsList && currentPage < newsList.pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
      // Call API for the next page if needed
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      // Call API for the previous page if needed
    }
  };

  const renderPaginationItems = () => {
    const totalPages = newsList?.pagination.totalPages || 1;
    const paginationItems = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          className={`border rounded-lg ${
            i === currentPage ? "text-primary-main" : "text-gray-400"
          }`}
        >
          <PaginationLink onClick={() => setCurrentPage(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };


  if (newsList && newsList.data.length <= 0) return notFound();

  return (
    <section className="w-full container pb-10 px-4 sm:px-10 sm:py-6">
      <h1 className="text-primary-main text-xl sm:text-3xl font-semibold">
        Berita Utama
      </h1>
      {!newsList ? (
        <div
          className="w-full h-[17rem] bg-white rounded-xl overflow-hidden shadow-lg hidden sm:flex sm:flex-row"
          data-aos="fade-up"
        >
          <div className="w-[40%] h-full] bg-gray-400 animate-pulse"></div>
          <div className="flex flex-col py-4 px-6 w-full">
            <div className="flex flex-row w-full items-center px-4 py-2">
              <div className="bg-gray-400 rounded-full h-4 p-1 w-full max-w-[25%] text-sm text-white text-center mr-2 animate-pulse" />
              <div className="bg-gray-400 w-28 h-4 ml-auto rounded-full animate-pulse" />
            </div>
            <div className="flex flex-row justify-start items-center px-2">
              <div className="bg-gray-400 h-10 w-[60%] rounded-xl animate-pulse" />
            </div>
            <p className="bg-gray-400 h-[50%] w-full px-2 mt-4 rounded-xl animate-pulse" />
          </div>
        </div>
      ) : (
        <Link href={`/news/${newsList.data[0].slug}`} className="group">
          <div
            className="w-full h-[17rem] bg-white rounded-xl overflow-hidden shadow-lg hidden sm:flex sm:flex-row"
            data-aos="fade-up"
          >
            <div className="w-[40%] h-full] bg-gray-400 overflow-hidden">
              <Image
                src={newsList?.data[0].image || ""}
                alt="img"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-[1.1] duration-300"
              />
            </div>
            <div className="flex flex-col py-4 px-6 w-full">
              <div className="flex flex-row w-full items-center px-4 py-2">
                <p className="bg-primary-main rounded-full p-1 w-full max-w-[25%] text-sm text-white text-center mr-2">
                  {newsList?.data[0].Kategoriartikel.title}
                </p>
                <p className="text-primary-main w-fit ml-auto">
                  {" "}
                  {newsList?.data[0].createdAt &&
                    formatDate(new Date(newsList?.data[0].createdAt))}
                </p>
              </div>
              <div className="flex flex-row justify-start items-center px-2">
                <p className="text-primary-main text-xl font-bold">
                  {newsList?.data[0].title}
                </p>
                <ArrowUpRight
                  width={32}
                  height={32}
                  className="text-primary-main"
                />
              </div>
              <div className="text-black font-normal px-2 mt-4 line-clamp-4 lg:line-clamp-6">
                {parse(newsList?.data[0].desc)}
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className="grid place-items-center justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {newsList?.data.map((data, index) => (
          <CardBerita
            key={data.slug}
            index={index}
            data={data}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
          />
        ))}
        {!newsList &&
          Array.from({ length: 16 }).map((_, index) => (
            <CardBeritaSekeleton key={index + "berita sekeleton"} />
          ))}
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent className="space-x-2">
            {/* Previous Button */}
            <PaginationItem
              className={`border rounded-lg ${
                currentPage === 1 ? "text-gray-400" : "text-primary-main"
              }`}
            >
              <Button
                className="px-2 w-fit"
                disabled={currentPage === 1}
                onClick={handlePrevious}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>

            {/* Page Numbers */}
            {renderPaginationItems()}

            {/* Next Button */}
            <PaginationItem
              className={`border rounded-lg ${
                currentPage === newsList?.pagination.totalPages
                  ? "text-gray-400"
                  : "text-primary-main"
              }`}
            >
              <Button
                className="px-2 w-fit"
                disabled={currentPage === newsList?.pagination.totalPages}
                onClick={handleNext}
              >
                <ChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
