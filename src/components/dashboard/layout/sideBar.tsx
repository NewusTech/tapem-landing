"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { AppWindow, Contact, Images, Info, LayoutDashboard, ListCollapse, Newspaper, PanelsTopLeft, UserPen } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidbarItem from "./sidbarItem";
import MobileSidebarItem from "./mobileSidebarItem";

export type sideItemLinkProps = {
  label: string;
  link: string;
  icon?: any;
  child?: {
    label: string;
    link: string;
    icon?: any;
  }[];
};

export default function SideBar() {
  const pathname = usePathname();

  const sideItemLink: sideItemLinkProps[] = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      label: "Data Landing",
      link: "#",
      icon: <PanelsTopLeft />,
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
        {
          label: "Sambutan",
          link: "/dashboard/sambutan",
        },
      ],
    },
    {
      label: "Data Profile",
      link: "#",
      icon: <UserPen />,
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
          link: "/dashboard/position",
        },
      ],
    },
    {
      label: "Informasi",
      link: "#",
      icon: <Info />,
      child: [
        {
          label: "Regulasi",
          link: "/dashboard/regulation",
        },
        {
          label: "Lppd",
          link: "/dashboard/lppd",
        },
      ],
    },
    {
      label: "Galeri",
      icon:<Images />,
      link: "/dashboard/galery",
    },
    {
      label: "Aplikasi",
      icon:<AppWindow />,
      link: "/dashboard/aplication",
    },
    {
      label: "Kontak",
      icon:<Contact />,
      link: "/dashboard/contact",
    },
    {
      label: "Berita",
      icon:<Newspaper />,
      link: "/dashboard/news",
    },
    {
      label: "FAQ",
      icon: <ListCollapse />,
      link: "/dashboard/faq",
    },
  ];
  return (
    <aside className="w-fit sm:w-[30%] flex flex-col my-10 mx-6 overflow-y-auto overflow-x-hidden scrollbar-thin">
      <div className="hidden sm:flex flex-row gap-4 justify-center items-center">
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
      <div className="hidden sm:flex flex-col gap-y-4 w-full h-full mt-10">
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
              {data.icon && <div className="group-hover:scale-125 duration-300">{data.icon}</div>}
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
      {/* mobile */}
      <MobileSidebarItem sideItemLink={sideItemLink}/>
    </aside>
  );
}
