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
import { DataTable } from "@/components/dashboard/regioninfoLanding/data-table";
import { columns } from "@/components/dashboard/regioninfoLanding/columns";
import { regionInfoProps, regionInfoQuery } from "@/api";

export default function Page() {
  const [data, setData] = useState<regionInfoProps[]>([]);

  const getData = async () => {
    const data = await regionInfoQuery();
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
              Region Info Landing
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
