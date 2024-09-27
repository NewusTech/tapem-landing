import { contactQuery } from "@/api";
import Map from "@/components/contact/map";
import React from "react";

export default async function Contact() {
  const contactData = await contactQuery();
  return (
    <section className="container md:py-10 pb-10">
      <h1 className="text-2xl font-bold w-[65%] md:w-[35%]">Kontak</h1>
      <div className="hidden md:flex flex-col mt-6 gap-2">
        <div className="flex flex-row">
          <div className="flex flex-col gap-2 w-[10%] justify-evenly">
            <p className="font-semibold">Lokasi</p>
            <p className="font-semibold">Email</p>
            <p className="font-semibold">Telepon</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="">:{contactData?.alamat}.</p>
            <p className="">: {contactData?.email}</p>
            <p className="">: {contactData?.telp}</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col md:hidden gap-4">
        <div className="flex flex-col">
          <p className="font-semibold">Lokasi :</p>
          <p className="">{contactData?.alamat}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Email :</p>
          <p className="">{contactData?.email}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Telepon :</p>
          <p className="">{contactData?.telp}</p>
        </div>
      </div>
      <Map
        latitude={contactData?.latitude || ""}
        longitude={contactData?.longitude || ""}
      />
    </section>
  );
}
