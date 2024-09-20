"use client"

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
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SERVER_URL } from "@/constants";
import { RegioninfoLanding, RegioninfoLandingFormData } from "@/validations";
import Swal from "sweetalert2";
import FileUploader from "@/components/fileUploader";

export default function RegionInfoCreatePage() {
  const token = Cookies.get("token");
  const navigation = useRouter();
  const [image, setImage] = useState<File | null>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegioninfoLandingFormData>({
    resolver: zodResolver(RegioninfoLanding),
  });

  const handleChangeFile = (file: File[]) => {
    setImage(file[0]);
  };

  const posteMediaBanner = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/regioninfo/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<RegioninfoLandingFormData> = async (data) => {
    try {
      if (!image) {
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
      formData.append("image", image);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = await posteMediaBanner(formData);
      if (!response.data) {
        Swal.fire({
          icon: "error",
          title: "Gagal menambah data media banner. " + response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil menambah data media banner.",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      navigation.replace("/dashboard/regioninfo-landing");
    } catch (error: any) {
      console.error(error.message);
    }
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
            <BreadcrumbLink href="/dashboard/regioninfo-landing">
              Region Info Landing
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">
          Form Input Wilayah Landing
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload Gambar Wilayah
            </span>
            <FileUploader fileChange={handleChangeFile} />
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Title</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Title Media"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.title.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Deskripsi</span>
            <textarea
              className="rounded-xl min-h-20 border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3"
              placeholder="Deskripsi"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.description.message}
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
