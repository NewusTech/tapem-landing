import React from "react";

export default function Galery() {
  return (
    <section className="py-10">
        <h1 className="text-primary-main text-3xl font-semibold ml-10">Galery</h1>
      <div className="w-full flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index + "galeri"}
            className="w-[25rem] h-[15rem] relative flex flex-col bg-[url('/assets/images/dummy_1.png')] bg-cover overflow-hidden rounded-xl bg"
          >
            <div className="bg-gradient-to-b from-primary-main/30 to-primary-soft/60 w-full h-full absolute" />
            <p className="font-semibold mt-auto text-center text-white z-[2] mb-4">
              Lorem ipsum dolor sit amet
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
