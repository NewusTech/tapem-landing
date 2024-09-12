import React from "react";

export default function Contact() {
  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold w-[65%] md:w-[35%]">Kontak</h1>
      <div className="flex flex-col mt-6 gap-2">
        <div className="flex flex-row">
          <div className="flex flex-col gap-2 w-[10%] justify-evenly">
            <p className="font-semibold">Lokasi</p>
            <p className="font-semibold">Email</p>
            <p className="font-semibold">Telepon</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="">
              : Lorem ipsum dolor sit amet consectetur. Dui eu sollicitudin
              egestas ut elit pretium etiam. Erat condimentum nunc commodo amet
              lacus arcu.
            </p>
            <p className="">: mpplampungtimur@gmail.com</p>
            <p className="">: 086374620177</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63611.49278011671!2d104.83351522607362!3d-4.818356635752443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e38a8db7600d4a5%3A0x30e59ab77a3b8568!2sTaman%20Sahabat%20Kotabumi!5e0!3m2!1sid!2sid!4v1726109946134!5m2!1sid!2sid"
          width="600"
          height="450"
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
    </section>
  );
}
