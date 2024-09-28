"use client";

import { faqListQuery, faqProps } from "@/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function FaqPage() {
    const [openItem, setOpenItem] = useState(null);
    const [dataFaq,setDataFaq] = useState<faqProps[]>([])

    const handleToggle = (value: any) => {
      setOpenItem(openItem === value ? null : value);
    };

    const getDataFaq = async()=>{
        const response = await faqListQuery();
        setDataFaq(response)
    }

    useEffect(()=>{
        getDataFaq()
    },[])

  return (
    <section className="py-4 md:py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-4 mt-2 sm:ml-10 mb-2">
        FAQ
      </h1>
      <p className="text-primary-main mt-2 ml-4 sm:ml-10 ">
        Frequently Asked Questions
      </p>

      <Accordion
        type="single"
        collapsible
        className="mt-6 md:mt-12 space-y-2 mx-4 sm:mx-10 "
        onValueChange={handleToggle}
      >
        {dataFaq?.map((faq:any) => {
          const value = `faq-${faq.id}`;
          const isOpen = openItem === value;

          return (
            <AccordionItem
              key={faq.question}
              value={value}
              className={`bg-transparent ${isOpen ? "bg-gray-100" : ""}`}
            >
              <AccordionTrigger className="bg-primary-main text-white rounded-xl px-4 sm:px-10">
                <p className={`${isOpen ? "" : "line-clamp-1"} text-left`}>{faq.question}</p>
              </AccordionTrigger>
              <AccordionContent
                className={`px-4 py-2 bg-transparent ${isOpen ? "bg-gray-100" : ""}`}
              >
                 {parse(faq.answer)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
