"use client";

import { DataTables2 } from "@/components/Datatables/table2";
import { Pagination } from "@/components/Pagination";
import { SERVER_SIPETA_URL } from "@/constants";
import { fetcherWithoutAuth } from "@/constants/fetcher";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import useSWR from "swr";

type Vilage = {
  id: string;
  no: number;
  name: string;
  kepala: string;
  alamat: string;
  telp: string;
};

type District = {
  id: number;
  alamat: string;
  camat: string;
  name: string;
  telp: string;
  Desas: {
    data: Vilage[];
  };
};

const columns: ColumnDef<Vilage>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: "Kelurahan / Desa",
    cell: ({ row }) => <span>{row.original.name || "-"}</span>,
  },
  {
    accessorKey: "kepala",
    header: "Lurah / Kades",
    cell: ({ row }) => <span>{row.original.kepala || "-"}</span>,
  },
  {
    accessorKey: "alamat",
    header: "Alamat Kantor",
    cell: ({ row }) => <span>{row.original.alamat || "-"}</span>,
  },
  {
    accessorKey: "telp",
    header: "Telepon",
    cell: ({ row }) => <span>{row.original.telp || "-"}</span>,
  },
];

export default function DistrictPage() {
  const [page, setPage] = useState(1);

  // Fetch data dengan SWR berdasarkan halaman saat ini
  const { data } = useSWR<any>(
    `${SERVER_SIPETA_URL}/kecamatan/get?page=${page}&limit=5&desaLimit=10000000`,
    fetcherWithoutAuth
  );

  const result = data?.data;
  const totalPages = data?.pagination?.totalPages || 1;

  // Fungsi untuk mengubah halaman
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  console.log(result);

  return (
    <section className="container py-10">
      <h1 className="text-primary-main text-4xl font-semibold pt-0 mt-0 mb-8">
        Laporan Kecamatan
      </h1>
      {result?.map((district: District) => (
        <div key={district.id} className="space-y-3">
          <h1 className="text-lg font-semibold text-primary-main">
            Kecamatan {district.name}
          </h1>
          <div className="flex space-x-10">
            <div className="uppercase font-medium space-y-1">
              <p>Alamat Kantor</p>
              <p>Telepon</p>
              <p>Camat</p>
            </div>
            <div className="uppercase space-y-1 mb-4">
              <p>: {district.alamat || "-"}</p>
              <p>: {district.telp || "-"}</p>
              <p>: {district.camat || "-"}</p>
            </div>
          </div>
          {district.Desas && (
            <DataTables2
              columns={columns}
              data={district.Desas.data}
              filterBy="name"
            />
          )}
        </div>
      ))}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
