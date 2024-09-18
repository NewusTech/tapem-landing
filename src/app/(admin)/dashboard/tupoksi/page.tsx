"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import React from "react";

export default function page() {
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
              Tuguas Pokok dan Fungsi
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full text-primary-main mt-10 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-y-6">
        <label className="flex flex-col gap-y-4">
          <span className="font-semibold">Tugas Pokok</span>
          <textarea
            className="rounded-xl border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150 min-h-20"
            placeholder="Tugas pokok"
          />
        </label>
        <div className="space-y-2">
          <Label htmlFor="editor1" className="font-semibold">Fungsi Utama</Label>
          {/* <MyEditor
            ref={editor1Ref}
            name="editor1"
            initialValue={data?.desc || "<p>Ketik disini</p>"}
          /> */}
        </div>
      </div>
    </section>
  );
}
