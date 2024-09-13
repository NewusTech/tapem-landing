import React from "react";

export default function Aplication() {
  return (
    <section className="py-10">
      <h1 className="text-primary-main text-3xl font-semibold ml-10">
        Aplikasi
      </h1>
      <div className="w-full flex flex-wrap gap-4 justify-center px-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index + "aplikasi"}
            className="w-[25rem] h-auto sm:h-[15rem] flex flex-col justify-center overflow-hidden rounded-xl bg-white border shadow-sm p-4 px-10 duration-150"
          >
            <p className="font-bold text-start text-primary-main z-[2] mb-4 text-lg sm:text-xl">
              Lorem ipsum dolor sit amet
            </p>
            <p className="text-start text-primary-main z-[2] text-sm sm:text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              unde ut, nesciunt ipsam nobis nam pariatur at.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
