import { sambutanDataQuery } from "@/api";
import Image from "next/image";
import React from "react";

export default async function Sambutan() {
  const sambutan = await sambutanDataQuery();
  return (
    <div className="bg-primary-200">
      <div className="flex flex-col md:flex-row container p-12 gap-x-6 gap-y-4">
        <div
          className="flex flex-col gap-y-6 w-full md:w-[70%]"
          data-aos="fade-down"
        >
          <p className="text-primary-main text-xl font-bold text-left">
            {sambutan?.title ?? "Sambutan Kepala Bagian Tata Pemerintahan"}
          </p>
          <p className="text-justify">
            {sambutan?.desc ??
              "Lorem ipsum dolor sit amet consectetur. Amet urna sit interdum scelerisque nisl. Euismod tincidunt ultrices nunc gravida feugiat. Odio mauris diam tempus ornare non cursus. Morbi posuere interdum curabitur vulputate elementum. Orci non a risus consequat eget platea. Volutpat hendrerit ultrices sit at pretium nulla eros at erat. Diam et ullamcorper accumsan purus tortor sit. Vehicula cras orci leo convallis eros erat dictum.Lorem ipsum dolor sit amet consectetur. Amet urna sit interdum scelerisque nisl. Euismod tincidunt ultrices nunc gravida feugiat. Odio mauris diam tempus ornare non cursus. Morbi posuere interdum curabitur vulputate elementum....."}
          </p>
        </div>
        <div
          className="flex flex-col w-full md:w-[30%] h-auto items-center justify-center"
          data-aos="fade-left"
        >
          <div className="w-full h-[20rem] md:h-[80%] overflow-hidden rounded-xl">
            <Image
              src={sambutan?.Personil.image ?? "/assets/images/no-image.png"}
              alt="kepala bidang"
              height={600}
              width={600}
              loading="eager"
              className="w-full h-full object-cover bg-center"
            />
          </div>
          <p className="font-semibold text-primary-main mt-5 text-center w-full">
            {sambutan?.Personil.Jabatan.title ?? "Kepala Bidang"}
          </p>
        </div>
      </div>
    </div>
  );
}
