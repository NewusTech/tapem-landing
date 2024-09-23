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
  import { DataTable } from "@/components/dashboard/news/data-table";
  import { columns } from "@/components/dashboard/news/columns";
  import { newsListQuery, newsProps } from "@/api";

  
  export default function Page() {
    // const data = await newsListQuery();

    const [data, setData] = useState<newsProps[]>([]);

    const getData = async () => {
      const data = await newsListQuery();
      setData(data.data);
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
                Berita
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DataTable columns={columns} data={data} />
      </section>
    );
  }
  