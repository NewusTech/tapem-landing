import { navLink } from "@/constants";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="w-full border-b bg-white border-primary-main shadow-sm">
      <div className="w-full container flex flex-row gap-12 items-center justify-between py-4 text-base lg:text-xl font-medium text-primary-main duration-150">
        {navLink.map((data) => (
          <Link
            key={data.link}
            href={data.link}
            className={cn([
              "uppercase hover:font-bold",
              pathname === data.link && "font-bold", // Apply text-black when the path matches
            ])}
          >
            {data.title}
          </Link>
        ))}
        <label className="flex flex-row text-primary-main py-2 px-4 rounded-full border border-primary-main bg-white overflow-hidden w-[10rem] md:w-[25rem]">
          <Search className="mr-2" />
          <input
            className="placeholder-primary-main focus:outline-none w-fit"
            placeholder="Seacrh"
          />
        </label>
      </div>
    </div>
  );
}
