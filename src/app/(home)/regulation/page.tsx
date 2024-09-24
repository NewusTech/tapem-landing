import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="py-4 md:py-10 container">
      <h1 className="text-primary-main text-3xl font-semibold mb-6">
        Regulasi
      </h1>

      <ul className="bg-primary-main text-white p-6 rounded-xl space-y-6 w-full mx-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <li className="ml-2 sm:ml-4 mr-4 sm:mr-2 text-base sm:text-lg text-justify w-full" key={index}>
            Peraturan Daerah Nomor 24 Tahun 2000 Tentang Kewenangan Pemerintahan
            Kabupaten Lampung Utara <br />
            <Link href={"#"} className="font-semibold">
              (Unduh PDF)
            </Link>
            ​
          </li>
        ))}
      </ul>
    </section>
  );
}
