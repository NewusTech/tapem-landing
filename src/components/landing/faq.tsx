"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FaqLanding() {
  return (
    <div className="w-full flex flex-col mt-20 container pb-20">
      <p className="w-full text-2xl font-bold text-primary-main text-center">
        FAQ
      </p>
      <p className="text-primary-main text-center mt-2">
        Frequently Asked Questions
      </p>
      <Accordion type="single" collapsible className="mt-12 space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <AccordionItem
            key={index + "faq"}
            value={`item-${index}`}
            className="bg-gray-100"
          >
            <AccordionTrigger className="bg-primary-main text-white rounded-xl px-10">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="px-4 bg-gray-100 py-2">
              Lorem ipsum dolor sit amet consectetur. Diam lectus congue
              sagittis consequat integer. Magna ipsum leo est duis. Sagittis
              interdum iaculis amet augue lectus eget eget. Elementum porttitor
              non diam lorem eget volutpat. At mollis magna nunc diam ornare
              arcu. Enim malesuada sed vitae ultricies a aliquam donec aliquam
              facilisis. Phasellus nunc ut in aliquet. In urna dignissim sit
              mattis vitae. Sagittis nunc vitae malesuada sociis viverra libero.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
