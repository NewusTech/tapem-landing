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
  import { DataTable } from "@/components/dashboard/socialMedia/data-table";
  import { columns } from "@/components/dashboard/socialMedia/columns";
  import {SocialMediaProps, socialMediaQuery } from "@/api";
  
  export default function Page() {
    const [data, setData] = useState<SocialMediaProps[]>([]);

    const getData = async () => {
      const data = await socialMediaQuery();
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
                Social Media
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DataTable columns={columns} data={data} />
      </section>
    );
  }
  