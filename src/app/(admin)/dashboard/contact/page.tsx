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
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const tugaspokokRef = useRef(null);
  const fungsiRef = useRef(null);
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
              Kontak
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full text-primary-main mt-10 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-y-6">
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Alamat</span>
          <textarea className="rounded-xl min-h-20 border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3" />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Email</span>
          <input
            type="email"
            inputMode="email"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="Email"
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Nomor Telepon</span>
          <input
            type="text"
            inputMode="tel"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="+628"
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Lintang</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="latitude"
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Bujur</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="longitude"
          />
        </label>
      </div>
      <div className="flex w-full justify-end">
        <Button className="duration-150 bg-primary-main hover:bg-primary-700 focus:bg-primary-800  text-white rounded-xl">
          Simpan
        </Button>
      </div>
    </section>
  );
}
