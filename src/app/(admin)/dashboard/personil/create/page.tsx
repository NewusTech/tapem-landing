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
import { useRouter } from "next/navigation";

export default function PersonilCreatePage() {
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

  const handleChangeFile = (file: File[]) => {
    setImageProfile(file[0]);
  };

  const getJabatan = async () => {
    const response = await jabatanListQuery();
    setDataJabatan(response);
  };

  const postPersonil = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/personil/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<PersonilFormData> = async (data) => {
    if (!imageProfile) {
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
    formData.append("image", imageProfile);
    formData.append("name", data.name);
    formData.append("jabatan_id", data.jabatan_id);
    const response = await postPersonil(formData);

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
    navigation.replace("/dashboard/personil");
  };

  useEffect(() => {
    getJabatan();
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
            <BreadcrumbLink href="/dashboard/personil">Personil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Input Personil</p>
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
                    {data.title} <span className="text-sm text-gray-500 italic">level {data.level}</span> 
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
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
