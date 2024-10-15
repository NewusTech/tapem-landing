"use client";

import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import { navLink } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function DropdownMenuSection() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <DropdownMenu key={pathname}>
      <DropdownMenuTrigger>
        <Menu className="text-primary-main" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {navLink.map((data) =>
          data.child ? (
            <DropdownMenuSub key={data.title}>
              <DropdownMenuSubTrigger className="text-primary-main">
                <span
                  className={cn([
                    "uppercase text-primary-main",
                    data.child.some((data) => data.link === pathname) &&
                      "font-bold",
                  ])}
                >
                  {data.title}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-white p-2">
                  {data.child.map((child) => (
                    <DropdownMenuItem key={child.title}>
                      <Link
                        href={child.link}
                        className={cn([
                          "uppercase text-primary-main",
                          pathname === child.link && "font-bold",
                        ])}
                      >
                        {child.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            <Link key={data.link} href={data.link}>
              <DropdownMenuItem
                className={cn([
                  "uppercase text-primary-main",
                  pathname === data.link && "font-bold",
                ])}
              >
                {data.title}
              </DropdownMenuItem>
            </Link>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
