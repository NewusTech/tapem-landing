"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { faqProps } from "@/api";

type FaqLandingProps = {
  faqList: faqProps[];
};

export default function FaqLanding({ faqList }: FaqLandingProps) {
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
        {faqList?.map((faq) => {
          const value = `faq-${faq.id}`;
          const isOpen = openItem === value;

          return (
            <AccordionItem
              key={faq.question}
              value={value}
              className={`bg-transparent ${isOpen ? "bg-gray-100" : ""}`}
            >
              <AccordionTrigger className="bg-primary-main text-white rounded-xl px-4 sm:px-10">
                <p className={`${isOpen ? "" : "line-clamp-1"} text-left`}>
                  {faq.question}
                </p>
              </AccordionTrigger>
              <AccordionContent
                className={`px-4 py-2 bg-transparent ${isOpen ? "bg-gray-100" : ""}`}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
