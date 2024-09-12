"use client";

import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import { navLink } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function DropdownMenuSection() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="text-primary-main" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {navLink.map((data) => (
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
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
