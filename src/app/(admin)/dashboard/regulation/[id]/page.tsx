"use client";

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
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound, useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUploader from "@/components/fileUploader";
import { regulation, regulationFormData } from "@/validations";

export default function RegulationUpdatePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const token = Cookies.get("token");
  const navigation = useRouter();
  const [mediaPdf, setMediaPdf] = useState<File | null>();
  const [isLoadingPage, setLoadingPage] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<regulationFormData>({
    resolver: zodResolver(regulation),
  });

  const handleChangeFilePdf = (file: File[]) => {
    setMediaPdf(file[0]);
  };

  const getRegulationById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(`${SERVER_URL}/regulasi/get/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const responseStatus = await response.json();
      if (!responseStatus.data) return notFound();
      setValue("title", responseStatus.data.title);
      setValue("file", responseStatus.data.file);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };

  const putRegulation = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/regulasi/create`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<regulationFormData> = async (data) => {
    try {
      if (!mediaPdf) {
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
      if (mediaPdf) formData.append("file", mediaPdf);
      formData.append("title", data.title);

      const response = await putRegulation(formData);

      if (!response.data) {
        Swal.fire({
          icon: "error",
          title: "Gagal menambah data regulasi. " + response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil menambah data regulasi.",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      navigation.replace("/dashboard/regulation");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getRegulationById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingPage) return null;

  return (
    <section className="space-y-4 container py-4">
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-primary-main">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/regulation">
              Regulasi
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Input Regulasi</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
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
            <span className="font-medium text-primary-700">
              Upload File Pdf
            </span>
            <FileUploader fileChange={handleChangeFilePdf} type="pdf" />
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
      </div>
    </section>
  );
}
