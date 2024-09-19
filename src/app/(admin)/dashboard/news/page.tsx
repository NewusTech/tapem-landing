import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import React from "react";
  import { DataTable } from "@/components/dashboard/news/data-table";
  import { columns } from "@/components/dashboard/news/columns";
  import { newsListQuery } from "@/api";

  export const dynamic = "force-dynamic";
  
  export default async function page() {
    const data = await newsListQuery();
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
        <DataTable columns={columns} data={data.data} />
      </section>
    );
  }
  