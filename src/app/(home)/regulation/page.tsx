"use client";

import { regulasiListProps, regulasiListQuery } from "@/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/assets/css/index.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoaderCircle } from "lucide-react";

export default function RegulationPage() {
  const [openItem, setOpenItem] = useState(null);
  const [dataRegulation, setDataRegulation] = useState<regulasiListProps[]>([]);

  const handleToggle = (value: any) => {
    setOpenItem(openItem === value ? null : value);
  };

  const getDataRegulation = async () => {
    const response = await regulasiListQuery();
    setDataRegulation(response);
  };

  useEffect(() => {
    getDataRegulation();
  }, []);

  return (
    <section className="py-1 md:py-10 pb-10 container">
      <h1 className="text-primary-main text-2xl md:text-3xl font-semibold mb-6">
        Regulasi
      </h1>
      <Accordion
        type="single"
        collapsible
        className="space-y-2"
        onValueChange={handleToggle}
      >
        {dataRegulation?.map((regulation) => {
          const value = `regulation-${regulation.id}`;
          const isOpen = openItem === value;

          return (
            <AccordionItem
              key={regulation.id}
              value={value}
              className={`bg-transparent ${isOpen ? "bg-gray-100" : ""}`}
            >
              <AccordionTrigger className="bg-primary-main text-white rounded-xl px-4 sm:px-10 duration-300 hover:bg-primary-soft">
                <p className={`${isOpen ? "" : "line-clamp-3"} text-left`}>
                  {regulation.title}
                  <br/>
                <Link
                  href={regulation.file}
                  target="_blank"
                  className="font-semibold"
                >
                  (Unduh PDF)
                </Link>
                </p>
              </AccordionTrigger>
              <AccordionContent
                className={`px-4 py-2 bg-transparent ${isOpen ? "bg-gray-100" : ""}`}
              >
                <div className="flex justify-center py-2 h-[40rem] w-full relative">
                  <iframe
                    src={regulation.file}
                    className="w-full h-full z-[10]"
                  ></iframe>
                  <span className="flex flex-row items-center justify-center w-full h-full absolute">
                    Loading... <LoaderCircle className="animate-spin" />
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
