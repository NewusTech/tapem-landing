import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FooterLanding() {
  return (
    <div className="w-full bg-black/90">
      <div className="container flex flex-col py-6">
        <div className="flex flex-row text-white">
          <div className="flex flex-col">
            <p className="text-xl font-medium">Sekertariat Daerah</p>
            <p>Bagian Tata Pemerintahan</p>
            <p className="mt-10">
              Alamat : Jl. Jendral Sudirman Nomor 1, Kotabumi, Lampung Utara
            </p>
          </div>
          <div className="flex flex-col ml-10">
            <p className="text-xl font-medium">Kategori</p>
            <div className="flex flex-wrap gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <span
                  key={index+"footer"}
                  className="bg-white text-primary-main font-semibold rounded-full px-4 py-2 cursor-pointer"
                >
                  Lorem Impum
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary-main p-4 text-white font-normal">
        <div className="flex flex-row container items-center">
          <p className="text-sm">Copyright ©️ 2024 All rights reserved.</p>
          <Link href={"/"} className="flex flex-row items-center ml-auto gap-2">
            <ChevronRight /> FAQ
          </Link>
          <Link href={"/"} className="flex flex-row items-center ml-4 gap-2">
            <ChevronRight /> Sitemap
          </Link>
          <Link href={"/"} className="flex flex-row items-center ml-4 gap-2">
            <ChevronRight /> Kontak
          </Link>
        </div>
      </div>
    </div>
  );
}
