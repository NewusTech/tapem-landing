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
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { strukturOrganisasi, strukturOrganisasiFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { strukturOrganisasiQuery } from "@/api";
import { SERVER_URL } from "@/constants";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { LoaderCircle } from "lucide-react";
import FileUploader from "@/components/fileUploader";

export default function Page() {
  const token = Cookies.get("token");
  const [mediaPdf, setMediaPdf] = useState<File | null>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<strukturOrganisasiFormData>({
    resolver: zodResolver(strukturOrganisasi),
  });

  const handleChangeFilePdf = (file: File[]) => {
    setMediaPdf(file[0]);
  };

  const getData = async () => {
    const response = await strukturOrganisasiQuery();
    setValue("name", response.name);
    setValue("file", response.file);
    setValue("id", response.id.toString());
  };

  const putStrukturOrganisasi = async (data: FormData) => {
    const response = await fetch(
      `${SERVER_URL}/struktur/update/${watch("id")}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        cache: "no-store",
      }
    );

    return await response.json();
  };

  const onSubmit: SubmitHandler<strukturOrganisasiFormData> = async (data) => {
    if (watch("file") === "" && !mediaPdf) {
      Swal.fire({
        icon: "error",
        title: "Upload File Pdf terlebih dahulu",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }
    const formData = new FormData();

    formData.append("name", data.name);
    if (mediaPdf) formData.append("file", mediaPdf);

    const response = await putStrukturOrganisasi(formData);

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
        <BreadcrumbList className="text-base md:text-lg text-primary-main">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Struktur Organisasi
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-primary-main mt-10 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-y-6"
      >
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Nama File</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="Nama File"
            {...register("name")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Upload File Pdf</span>
          <FileUploader
            key={watch("file")}
            fileChange={handleChangeFilePdf}
            type="pdf"
            mediaUrl={watch("file")}
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
