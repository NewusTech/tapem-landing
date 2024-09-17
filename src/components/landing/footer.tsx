import { categoryProps, contactProps } from "@/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type FooterLandingProps = {
  categoryList: categoryProps[];
  contactData?: contactProps;
};
export default function FooterLanding({
  categoryList,
  contactData,
}: FooterLandingProps) {
  return (
    <div className="w-full bg-black/80">
      <div className="container flex flex-col py-6">
        <div className="flex flex-col md:flex-row gap-y-6 text-white">
          <div className="flex flex-col w-[60%]">
            <p className="text-xl font-medium">Sekertariat Daerah</p>
            <p>Bagian Tata Pemerintahan</p>
            <p className="mt-10">{contactData?.alamat}</p>
          </div>
          <div className="flex flex-col ml-0 md:ml-10">
            <p className="text-xl font-medium">Kategori</p>
            <div className="flex flex-wrap gap-4 mt-6">
              {categoryList.map((data) => (
                <span
                  key={data.title}
                  className="bg-white text-primary-main font-semibold rounded-full px-4 py-2 cursor-pointer text-sm sm:text-base"
                >
                  {data.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary-main p-4 text-white font-normal">
        <div className="flex flex-col md:flex-row gap-y-6 container items-center">
          <p className="text-sm">Copyright ©️ 2024 All rights reserved.</p>
          <div className="flex flex-row md:ml-auto text-sm sm:text-base">
            <Link
              href={"/"}
              className="flex flex-row items-center ml-auto gap-2"
            >
              <ChevronRight /> FAQ
            </Link>
            <Link href={"/sitemap.xml"} className="flex flex-row items-center ml-4 gap-2">
              <ChevronRight /> Sitemap
            </Link>
            <Link href={"/"} className="flex flex-row items-center ml-4 gap-2">
              <ChevronRight /> Kontak
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
