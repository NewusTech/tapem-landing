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
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { contact, contactFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactQuery } from "@/api";
import { SERVER_URL } from "@/constants";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { LoaderCircle } from "lucide-react";

export default function Page() {
  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<contactFormData>({
    resolver: zodResolver(contact),
  });

  const getData = async () => {
    const response = await contactQuery();
    setValue("alamat", response.alamat);
    setValue("email", response.email);
    setValue("latitude", response.latitude);
    setValue("longitude", response.longitude);
    setValue("telp", response.telp);
  };

  const putContaact = async (data: contactFormData) => {
    const response = await fetch(`${SERVER_URL}/contact/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<contactFormData> = async (data) => {
    const response = await putContaact(data);

    if (response.status !== 200) {
      console.error(response.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengupdate Data. " + response.message,
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Berhasil Mengupdate Data!",
      timer: 2000,
      showConfirmButton: false,
      position: "center",
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <BreadcrumbPage className="font-semibold">Kontak</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-primary-main mt-10 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-y-6"
      >
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Alamat</span>
          <textarea
            className="rounded-xl min-h-20 border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3"
            {...register("alamat")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Email</span>
          <input
            type="email"
            inputMode="email"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="Email"
            {...register("email")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Nomor Telepon</span>
          <input
            type="text"
            inputMode="tel"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="+628"
            {...register("telp")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Lintang</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="latitude"
            {...register("latitude")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Bujur</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="longitude"
            {...register("longitude")}
          />
        </label>
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="duration-150 bg-primary-main hover:bg-primary-700 focus:bg-primary-800  text-white rounded-xl min-w-32"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
