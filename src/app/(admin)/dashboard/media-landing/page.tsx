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
import { DataTable } from "@/components/dashboard/mediaLanding/data-table";
import { columns } from "@/components/dashboard/mediaLanding/columns";
import { mediaBannerProps, mediaBannerQuery } from "@/api";

export default function Page() {
  const [data, setData] = useState<mediaBannerProps[]>([]);

  const getData = async () => {
    const data = await mediaBannerQuery();
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
              Media Landing
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
