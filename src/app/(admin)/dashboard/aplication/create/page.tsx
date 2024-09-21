"use client";

import FileUploader from "@/components/fileUploader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { aplication, aplicationFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SERVER_URL } from "@/constants";

export default function Page() {
  const token = Cookies.get("token");
  const navigation = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<aplicationFormData>({
    resolver: zodResolver(aplication),
  });
  const [imageAplication, setImageAplication] = useState<File | null>();

  const handleChangeFile = (file: File[]) => {
    setImageAplication(file[0]);
  };

  const postAplikasi = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/aplikasietc/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<aplicationFormData> = async (data) => {
    if (!imageAplication) {
      Swal.fire({
        icon: "error",
        title: "Upload gambar terlebih dahulu",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", imageAplication);
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("link", data.link);
    const response = await postAplikasi(formData);

    if (response.status !== 201) {
      console.error(response.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Menambah Data. " + response.message,
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Berhasil Menambah Data!",
      timer: 2000,
      showConfirmButton: false,
      position: "center",
    });
    navigation.replace("/dashboard/aplication");
  };
  return (
    <section className="space-y-4 container py-4">
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-primary-main">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/aplication">
              Aplikasi
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Input Aplikasi</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <FileUploader fileChange={handleChangeFile} type="profile" />
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Nama</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Nama"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.name.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Link Aplikasi</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="http://aplikasi.id"
              {...register("link")}
            />
            {errors.link && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.link.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Deskripsi</span>
            <textarea
              className="rounded-xl min-h-20 border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3"
              placeholder="Deskripsi"
              {...register("desc")}
            />
            {errors.desc && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.desc.message}
              </span>
            )}
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
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
