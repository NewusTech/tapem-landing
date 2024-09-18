"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidbarItem from "./sidbarItem";

export default function SideBar() {
  const pathname = usePathname();

  const sideItemLink = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      label: "Data Landing",
      link: "#",
      child: [
        {
          label: "Banner Landing",
          link: "/dashboard/banner-landing",
        },
        {
          label: "Media Landing",
          link: "/dashboard/media-landing",
        },
        {
          label: "Region Info",
          link: "/dashboard/regioninfo-landing",
        },
      ],
    },
    {
      label: "Data Profile",
      link: "#",
      child: [
        {
          label: "Tugas Pokok dan Fungsi",
          link: "/dashboard/tupoksi",
        },
        {
          label: "Personil",
          link: "/dashboard/personil",
        },
        {
          label: "Jabatan",
          link: "/dashboard/position"
        },
      ],
    },
  ];
  return (
    <aside className="w-[30%] flex flex-col my-10 mx-6">
      <div className="flex flex-row gap-4">
        <div className="w-[64px] h-auto">
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
      {/*  */}
      <div className="flex flex-col gap-y-4 w-full h-full mt-10">
        {sideItemLink.map((data) =>
          !data.child ? (
            <Link
              key={data.label}
              href={data.link}
              className={cn(
                "flex flex-row gap-x-4 text-primary-main items-center font-bold w-full px-4 py-4",
                pathname === data.link && "bg-primary-soft/20"
              )}
            >
              {data.icon && data.icon}
              {data.label}
            </Link>
          ) : (
            <SidbarItem
              key={data.label}
              label={data.label}
              dataItems={data.child}
            />
          )
        )}
      </div>
    </aside>
  );
}
