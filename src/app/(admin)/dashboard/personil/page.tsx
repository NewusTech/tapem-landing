"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/dashboard/personil/data-table";
import { columns } from "@/components/dashboard/personil/columns";
import { personilListProps, personilListQuery } from "@/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<personilListProps[]>([]);

  const getData = async () => {
    const data = await personilListQuery();
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
            <BreadcrumbPage className="font-semibold">Personil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
