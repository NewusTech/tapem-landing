import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const navLink = [
    {
      title: "home",
      link: "/",
    },
    {
      title: "profile",
      link: "/",
    },
    {
      title: "informasi",
      link: "/",
    },
    {
      title: "galery",
      link: "/",
    },
    {
      title: "aplikasi kontak",
      link: "/",
    },
    {
      title: "galery",
      link: "/",
    },
  ];

  return (
    <div className="w-full container flex flex-row gap-12 items-center justify-between py-4 text-base lg:text-xl font-medium text-primary-main duration-150">
      {navLink.map((data) => (
        <Link
          key={data.link}
          href={data.link}
          className="uppercase hover:font-bold"
        >
          {data.title}
        </Link>
      ))}
      <label className="flex flex-row text-primary-main py-2 px-4 rounded-full border border-primary-main bg-white overflow-hidden w-[10rem] md:w-[25rem]">
        <Search className="mr-2" />
        <input className="placeholder-primary-main focus:outline-none w-fit" placeholder="Seacrh" />
      </label>
    </div>
  );
}
