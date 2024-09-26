import { dashboardDataQuery } from "@/api";
import { cn } from "@/lib/utils";
import { AppWindow, Images, Newspaper, UsersRound } from "lucide-react";
import React from "react";

export const dynamic = "force-dynamic";

const Card = ({
  number,
  label,
  className,
  icon,
}: {
  number: number;
  label: string;
  className?: string;
  icon: any;
}) => {
  return (
    <div
      className={cn(
        "w-full space-y-2 bg-white rounded-xl flex flex-col justify-center items-center py-6 border",
        className
      )}
    >
      <div className="flex flex-row items-center justify-evenly gap-x-4 w-full">
        <div className="rounded-full bg-white w-[46px] h-[46px] items-center flex pl-3 overflow-hidden p-2 text-black">
          {icon}
        </div>
        <div className="flex flex-col w-fit">
          <p className="">{number}</p>
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default async function PageDashboard() {
  const dataDashboard = await dashboardDataQuery();
  return (
    <section className="space-y-4 container">
      <h1 className="text-primary-main font-semibold text-lg">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-2">
        <Card
          label="Jumlah Berita"
          number={dataDashboard.artikelCount}
          className="bg-gradient-to-t from-indigo-500 to-blue-500 text-white"
          icon={<Newspaper />}
        />
        <Card
          label="Jumlah Galeri"
          number={dataDashboard.galeriCount}
          icon={<Images />}
          className="bg-gradient-to-t from-indigo-400 to-cyan-400 text-white"
        />
        <Card
          label="Jumlah Personil"
          number={dataDashboard.personilCount}
          icon={<UsersRound />}
          className="bg-gradient-to-b from-rose-400 to-red-500 text-white"
        />
        <Card
          label="Jumlah Aplikasi"
          number={dataDashboard.aplikasiCount}
          icon={<AppWindow />}
          className="bg-gradient-to-b from-fuchsia-600 to-purple-600 text-white"
        />
      </div>
      <div className="w-full"></div>
    </section>
  );
}
