"use client";

import React from "react";
import HeaderSection from "./headerSection";
import NavBar from "./navBar";
import DropdownMenuSection from "./dropdownMenu";
import { Search } from "lucide-react";

export default function LayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            className="placeholder-primary-main focus:outline-none w-fit"
            placeholder="Seacrh"
          />
        </label>
        <DropdownMenuSection />
      </div>
      {children}
    </main>
  );
}
