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
import { SERVER_URL } from "@/constants";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sambutan, sambutanFormData } from "@/validations";
import { personilListProps, personilListQuery, sambutanDataQuery } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PageSambutan() {
  const token = Cookies.get("token");

  const [dataPersonil, setDataPersonil] = useState<personilListProps[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<sambutanFormData>({
    resolver: zodResolver(sambutan),
  });

  const getData = async () => {
    const response = await sambutanDataQuery();
    console.log(response);
    setValue("title", response.title);
    setValue("desc", response.desc);
    setValue("personil_id", response.personil_id.toString());
  };

  const getPersonil = async () => {
    const response = await personilListQuery();
    setDataPersonil(response);
  };

  const putSambutan = async (data: sambutanFormData) => {
    const response = await fetch(`${SERVER_URL}/sambutan/update`, {
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

  const onSubmit: SubmitHandler<sambutanFormData> = async (data) => {
    const response = await putSambutan(data);

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
    getPersonil();
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
            <BreadcrumbPage className="font-semibold">Sambutan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-primary-main mt-10 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-y-6"
      >
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Judul Sambutan</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="Judul Sambutan"
            {...register("title")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">
            Deskripsi Sambutan
          </span>
          <textarea
            className="rounded-xl min-h-20 border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3"
            {...register("desc")}
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Pilih Personil</span>
          <Select
            key={watch("personil_id")}
            value={watch("personil_id")}
            onValueChange={(value) => setValue("personil_id", value)}
          >
            <SelectTrigger className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150">
              <SelectValue placeholder="---Pilih Personil---" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {dataPersonil.map((data) => (
                <SelectItem key={data.id} value={data.id.toString()}>
                  {data.name}{" "}
                  <span className="text-sm text-gray-500 italic">
                    jabatan {data.Jabatan.title}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.personil_id && (
            <span className="text-red-600 text-sm pl-2 mt-4">
              {errors.personil_id.message}
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
    </section>
  );
}
