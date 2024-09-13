"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FaqLanding() {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (value: any) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <div className="w-full flex flex-col mt-20 container pb-20">
      <p className="w-full text-2xl font-bold text-primary-main text-center">
        FAQ
      </p>
      <p className="text-primary-main text-center mt-2">
        Frequently Asked Questions
      </p>
      <Accordion
        type="single"
        collapsible
        className="mt-12 space-y-2"
        onValueChange={handleToggle}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const value = `item-${index}`;
          const isOpen = openItem === value;

          return (
            <AccordionItem
              key={index + "faq"}
              value={value}
              className={`bg-transparent ${isOpen ? "bg-gray-100" : ""}`} // Contoh perubahan warna saat item terbuka
            >
              <AccordionTrigger className="bg-primary-main text-white rounded-xl px-10">
              <p className="line-clamp-1"> Is it accessible? lorem</p> 
              </AccordionTrigger>
              <AccordionContent className={`px-4 py-2 bg-transparent ${isOpen?"bg-gray-100":""}`}>
                Lorem ipsum dolor sit amet consectetur. Diam lectus congue
                sagittis consequat integer. Magna ipsum leo est duis. Sagittis
                interdum iaculis amet augue lectus eget eget. Elementum
                porttitor non diam lorem eget volutpat. At mollis magna nunc
                diam ornare arcu. Enim malesuada sed vitae ultricies a aliquam
                donec aliquam facilisis. Phasellus nunc ut in aliquet. In urna
                dignissim sit mattis vitae. Sagittis nunc vitae malesuada sociis
                viverra libero.
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
