"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SERVER_URL } from "@/constants";
import { lppd, lppdFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import FileUploader from "@/components/fileUploader";

export default function LppdEditPage({
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

  const handleChangeFilePdf = (file: File[]) => {
    setMediaPdf(file[0]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<lppdFormData>({
    resolver: zodResolver(lppd),
  });

  const getLppdById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(`${SERVER_URL}/lppd/get/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const responseStatus = await response.json();
      if (!responseStatus.data) return notFound();
      setValue("badanPublik", responseStatus.data.badanPublik);
      setValue("fileLampiran", responseStatus.data.fileLampiran);
      setValue("jenisInformasi", responseStatus.data.jenisInformasi);
      setValue("kandunganInformasi", responseStatus.data.kandunganInformasi);
      setValue("kategori", responseStatus.data.kategori);
      setValue("subJenisInformasi", responseStatus.data.subJenisInformasi);
      setValue("tanggalPublish", responseStatus.data.tanggalPublish);
      setValue("tipeDokumen", responseStatus.data.tipeDokumen);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };

  const putlppd = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/lppd/update/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<lppdFormData> = async (data) => {
    const formData = new FormData();
    if (mediaPdf) formData.append("fileLampiran", mediaPdf);
    formData.append("badanPublik", data.badanPublik);
    formData.append("jenisInformasi", data.jenisInformasi);
    formData.append("kandunganInformasi", data.kandunganInformasi);
    formData.append("kategori", data.kategori);
    formData.append("subJenisInformasi", data.subJenisInformasi);
    formData.append("tanggalPublish", data.tanggalPublish);
    formData.append("tipeDokumen", data.tipeDokumen);

    const response = await putlppd(formData);

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
    navigation.replace("/dashboard/lppd");
  };

  useEffect(() => {
    getLppdById();
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
            <BreadcrumbLink href="/dashboard/lppd">LPPD</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Update LPPD</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Badan Publik</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Badan Publik"
              {...register("badanPublik")}
            />
            {errors.badanPublik && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.badanPublik.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Tanggal Publish
            </span>
            <input
              type="date"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Tanggal Publish"
              {...register("tanggalPublish")}
            />
            {errors.badanPublik && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.badanPublik.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Jenis Informasi
            </span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="jenis Informasi"
              {...register("jenisInformasi")}
            />
            {errors.jenisInformasi && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.jenisInformasi.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Sub Jenis Informasi
            </span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Sub Jenis Informasi"
              {...register("subJenisInformasi")}
            />
            {errors.subJenisInformasi && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.subJenisInformasi.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Kandungan Informasi
            </span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="kandungan Informasi"
              {...register("kandunganInformasi")}
            />
            {errors.kandunganInformasi && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.kandunganInformasi.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Kategori</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Kategori"
              {...register("kategori")}
            />
            {errors.kategori && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.kategori.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Tipe Dokumen</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Tipe Dokumen"
              {...register("tipeDokumen")}
            />
            {errors.tipeDokumen && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.tipeDokumen.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload File Pdf
            </span>
            <FileUploader key={watch("fileLampiran")} fileChange={handleChangeFilePdf} type="pdf" mediaUrl={watch("fileLampiran")} />
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
