"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/dashboard/regulation/data-table";
import { columns } from "@/components/dashboard/regulation/columns";
import { regulasiListProps, regulasiListQuery } from "@/api";

export default function PageRegulasi() {
  const [data, setData] = useState<regulasiListProps[]>([]);

  const getData = async () => {
    const data = await regulasiListQuery();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="space-y-4 container py-4">
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-primary-main">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Regulasi
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
