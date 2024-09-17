import { regionInfoProps } from "@/api";
import Image from "next/image";
import React from "react";

type MapLandingProps = {
  regionData: regionInfoProps[];
};
export default function MapLanding({ regionData }: MapLandingProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 container">
      <div className="w-full h-fit my-auto">
        <Image
          src={regionData?.length > 0 ? regionData[0].image : "/assets/images/map.png"}
          alt="map"
          height={300}
          width={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 w-full md:w-[140%]">
        <p className="font-bold  text-base md:text-lg lg:text-xl">
          {regionData?.length > 0
            ? regionData[0].title
            : "Lorem ipsum dolor sit amet consectetur."}
        </p>
        <p className="text-justify  text-sm md:text-base lg:text-lg line-clamp-6">
          {regionData?.length > 0
            ? regionData[0].description
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}{" "}
        </p>
      </div>
    </div>
  );
}
