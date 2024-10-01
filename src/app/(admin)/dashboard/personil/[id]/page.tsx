"use client";

import { jabatanListProps, jabatanListQuery } from "@/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVER_URL } from "@/constants";
import { Personil, PersonilFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { notFound, useRouter } from "next/navigation";

export default function PersonilEditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const token = Cookies.get("token");
  const navigation = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonilFormData>({
    resolver: zodResolver(Personil),
  });
  const [imageProfile, setImageProfile] = useState<File | null>();
  const [dataJabatan, setDataJabatan] = useState<jabatanListProps[]>([]);
  const [isLoadingPage, setLoadingPage] = useState(true);

  const handleChangeFile = (file: File[]) => {
    setImageProfile(file[0]);
  };

  const getJabatan = async () => {
    const response = await jabatanListQuery();
    setDataJabatan(response);
  };

  const getPersonilById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(
        `${SERVER_URL}/personil/get/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const responseStatus = await response.json();
      if (!responseStatus.data) return notFound();
      setValue("name", responseStatus.data.name);
      setValue("jabatan_id", responseStatus.data.jabatan_id.toString());
      setValue("image", responseStatus.data.image);
      setValue("nip", responseStatus.data.nip);
      setValue("phoneNumber", responseStatus.data.phoneNumber);
      setValue("educationHistory", responseStatus.data.educationHistory);
      setValue("positionHistory", responseStatus.data.positionHistory);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };

  const putPersonil = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/personil/update/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<PersonilFormData> = async (data) => {
    const formData = new FormData();
    if (imageProfile) formData.append("image", imageProfile);
    formData.append("name", data.name);
    formData.append("jabatan_id", data.jabatan_id);
    formData.append("nip", data.nip);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("educationHistory", data.educationHistory);
    formData.append("positionHistory", data.positionHistory);
    const response = await putPersonil(formData);

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
    navigation.replace("/dashboard/personil");
  };

  useEffect(() => {
    getJabatan();
    getPersonilById();
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
            <BreadcrumbLink href="/dashboard/personil">Personil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Update Personil</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <FileUploader fileChange={handleChangeFile} type="profile" mediaUrl={watch("image")} />
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
            <span className="font-medium text-primary-700">NIP</span>
            <input
              type="number"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="NIP"
              {...register("nip")}
            />
            {errors.nip && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.nip.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Nomor Ponsel</span>
            <input
              type="number"
              inputMode="tel"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="08"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.phoneNumber.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Riwayat Pendidikan (pisahkan dengan ;)</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Riwayat pendidikan"
              {...register("educationHistory")}
            />
            {errors.educationHistory && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.educationHistory.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Riwayat Jabatan (pisahkan dengan ;)</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Riwayat jabatan"
              {...register("positionHistory")}
            />
            {errors.positionHistory && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.positionHistory.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Pilih Jabatan</span>
            <Select
              value={watch("jabatan_id")}
              onValueChange={(value) => setValue("jabatan_id", value)}
            >
              <SelectTrigger className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150">
                <SelectValue placeholder="---Pilih Jabatan---" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {dataJabatan.map((data) => (
                  <SelectItem key={data.id} value={data.level.toString()}>
                    {data.title}{" "}
                    <span className="text-sm text-gray-500 italic">
                      level {data.level}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.jabatan_id && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.jabatan_id.message}
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
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
