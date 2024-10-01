"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import { sideItemLinkProps } from "./sideBar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidbarItem from "./sidbarItem";
import Image from "next/image";

type MobileSidebarItemProps = {
  sideItemLink: sideItemLinkProps[];
};
export default function MobileSidebarItem({
  sideItemLink,
}: MobileSidebarItemProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="block sm:hidden w-[24px] h-[24px]">
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white w-[90%] overflow-y-auto" side={"left"}>
        <SheetHeader className="hidden">
          <SheetTitle>Sitapem</SheetTitle>
          <SheetDescription>Dashboard</SheetDescription>
        </SheetHeader>
        <div className="flex flex-row gap-4 justify-center items-center">
            <div className="w-[34px] h-auto">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={140}
                height={178}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="uppercase font-bold text-xl text-primary-main">
                sitapem
              </p>
              <p className="text-primary-main">Dashboard</p>
            </div>
          </div>
        <div className="flex flex-col gap-y-4 w-full h-full mt-10">
          {sideItemLink.map((data) =>
            !data.child ? (
              <Link
                key={data.label}
                href={data.link}
                className={cn(
                  "flex flex-row gap-x-4 text-primary-main items-center font-bold w-full px-4 py-4 group hover:bg-primary-soft/30 hover:translate-x-1 duration-300",
                  pathname === data.link && "bg-primary-soft/20"
                )}
              >
                {data.icon && (
                  <div className="group-hover:scale-125 duration-300">
                    {data.icon}
                  </div>
                )}
                {data.label}
              </Link>
            ) : (
              <SidbarItem
                key={data.label}
                label={data.label}
                dataItems={data.child}
                icon={data.icon}
              />
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
