"use client";

import { navLink } from "@/constants";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function NavBar() {
  const pathname = usePathname();
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
    <div className="w-full border-b bg-white border-primary-main shadow-sm">
      <div className="w-full container flex flex-row gap-12 items-center justify-between py-4 font-medium text-primary-main duration-150">
        <NavigationMenu>
          <NavigationMenuList className="space-x-8">
            {navLink.map((data) =>
              data.child ? (
                <NavigationMenuItem key={data.title}>
                  <NavigationMenuTrigger className="text-base text-primary-main">
                    <span
                      className={cn([
                        "uppercase hover:font-bold duration-150 text-base",
                        data.child.some((data) => data.link === pathname) &&
                          "font-bold",
                      ])}
                    >
                      {data.title}
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white list-none">
                      {data.child.map((data) => (
                        <li className="" key={data.link}>
                          <NavigationMenuLink asChild>
                            <Link
                              className={cn([
                                "uppercase hover:font-bold duration-150 text-base w-full",
                                pathname === data.link && "font-bold",
                              ])}
                              href={data.link}
                            >
                              {data.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={data.title} className="px-4">
                  <NavigationMenuLink
                    href={data.link}
                    className={cn([
                      "uppercase hover:font-bold duration-150 text-base",
                      pathname === data.link && "font-bold",
                    ])}
                  >
                    {data.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <label className="flex flex-row text-primary-main py-2 px-4 rounded-full border border-primary-main bg-white overflow-hidden w-[10rem] md:w-[25rem]">
          <Search className="mr-2" />
          <input
            value={search}
            onChange={handleSeach}
            onKeyDown={handleKeyDown}
            className="placeholder-primary-main focus:outline-none w-fit"
            placeholder="Seacrh"
            inputMode="search"
          />
        </label>
      </div>
    </div>
  );
}
