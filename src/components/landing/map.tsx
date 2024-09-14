import Image from "next/image";
import React from "react";

export default function MapLanding() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 container">
      <div className="w-full h-fit my-auto">
        <Image
          src={"/assets/images/map.png"}
          alt="map"
          height={300}
          width={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 w-full md:w-[140%]">
        <p className="font-bold  text-base md:text-lg lg:text-xl">Lorem ipsum dolor sit amet consectetur.</p>
        <p className="text-justify  text-sm md:text-base lg:text-lg">
          Lorem ipsum dolor sit amet consectetur. Tellus ut venenatis nec a orci
          morbi viverra. Aliquam sit mi tellus ultrices odio sit eu odio et.
          Consectetur lectus commodo faucibus maecenas sagittis adipiscing
          turpis. Ac consectetur et ac urna rutrum feugiat. Nulla risus congue
          nisi dis scelerisque egestas. Orci orci mauris posuere sit adipiscing
          vehicula non congue mi. Sagittis dolor quisque netus varius sit libero
          tincidunt. Pharetra enim egestas tempor odio. Ac nec elementum nibh in
          eget cursus enim nisi gravida.{" "}
        </p>
      </div>
    </div>
  );
}
