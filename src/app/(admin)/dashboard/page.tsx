import CircularPercentage from "@/components/CircularPercentage";
import React from "react";

export const dynamic = "force-dynamic";

const Card = ({ number, label }: { number: number; label: string }) => {
  return (
    <div className="w-full space-y-2 bg-white rounded-lg flex flex-col justify-center items-center py-6 border">
      <p className="text-pri">{number}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
};

export default function page() {
  return (
    <section className="space-y-4 container">
      <h1 className="text-primary-main font-semibold text-lg">Dashboard</h1>
      <div className="grid grid-cols-3 gap-x-3 gap-y-2">
        <Card label="Jumlah Berita" number={80} />
        <Card label="Jumlah Galeri" number={120} />
        <Card label="Jumlah Personil" number={3} />
        <Card label="Jumlah Personil" number={80} />
      </div>
      <div className="w-full"></div>
    </section>
  );
}
