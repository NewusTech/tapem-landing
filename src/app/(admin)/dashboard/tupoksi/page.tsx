"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamicImport from "next/dynamic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const dynamic = "force-dynamic";

// const CustomEditor = dynamicImport(()=>import("@/components/CKEditor"))

export default function Page() {
  const tugaspokokRef = useRef(null);
  const fungsiRef = useRef(null);
  const [tugaspokok, setTugasPokok] = useState<string>();
  const [fungsi, setFungsi] = useState<string>();
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
        <div className="space-y-4">
          <Label htmlFor="tugaspokok" className="font-semibold">
            Tugas Pokok
          </Label>
          {/* <CustomEditor id="tugaspokok" ref={tugaspokokRef} /> */}
        </div>
        <div className="space-y-4">
          <Label htmlFor="fungsi" className="font-semibold">
            Fungsi Utama
          </Label>
          {/* <CustomEditor id="fungsi" ref={fungsiRef} /> */}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button className="duration-150 bg-primary-main hover:bg-primary-700 focus:bg-primary-800  text-white rounded-xl">
          Simpan
        </Button>
      </div>
    </section>
  );
}
