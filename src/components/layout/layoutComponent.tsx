"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import HeaderSection from "./headerSection";
import NavBar from "./navBar";
import DropdownMenuSection from "./dropdownMenu";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search.trim() === "") return;
      router.push(`/news?search=${search}`);
    }
  };
  return (
    <main className=" w-full min-h-screen">
      <HeaderSection />
      <div className="hidden lg:block">
        <NavBar />
      </div>
      <div className="flex flex-row justify-end py-4 px-4 lg:hidden">
        <label className="flex flex-row text-primary-main py-2 px-4 rounded-full border border-primary-main bg-white overflow-hidden w-full mr-4">
          <Search className="mr-2" />
          <input
            value={search}
            onChange={handleSeach}
            onKeyDown={handleKeyDown}
            className="placeholder-primary-main focus:outline-none w-fit"
            placeholder="Search"
            inputMode="search"
          />
        </label>
        <DropdownMenuSection />
      </div>
      <div className="overflow-hidden">{children}</div>
    </main>
  );
}
