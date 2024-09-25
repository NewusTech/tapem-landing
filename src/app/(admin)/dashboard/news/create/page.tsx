"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { news, newsFormData } from "@/validations";
import { SERVER_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import FileUploader from "@/components/fileUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kategoriListProps, kategoriListQuery } from "@/api";

export default function Page() {
  const token = Cookies.get("token");
  const navigation = useRouter();
  
  const [dataKetegori, setDataKategori] = useState<kategoriListProps[]>([]);

  const { quill, quillRef } = useQuill();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<newsFormData>({
    resolver: zodResolver(news),
  });
  
  const [image, setImage] = useState<File | null>();
  const [mediaVideo, setMediaVideo] = useState<File | null>();

  const handleChangeFileImage = (file: File[]) => {
    setImage(file[0]);
  };
  const handleChangeFileVideo = (file: File[]) => {
    setMediaVideo(file[0]);
  };

  const getKategori = async () => {
    const response = await kategoriListQuery();
    setDataKategori(response);
  };

  const postNews = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/artikel/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<newsFormData> = async (data) => {
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
    if (mediaVideo) formData.append("mediaLink", mediaVideo);
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("kategori_id", data.kategori_id);

    const response = await postNews(formData);

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
    navigation.replace("/dashboard/news");
  };

  // Update the state when editor content changes
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue("desc", quill.root.innerHTML);
      });
    }
  }, [quill, setValue]);

  useEffect(() => {
    getKategori();
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
            <BreadcrumbLink href="/dashboard/news">Berita</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Input Jabatan</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Title</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Title Berita"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.title.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span>Image Berita</span>
            <FileUploader fileChange={handleChangeFileImage} />
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload File Video{" "}
              <span className="italic text-sm text-gray-500">(Optioonal)</span>
            </span>
            <FileUploader fileChange={handleChangeFileVideo} type="video" />
          </label>
          <div className="space-y-4">
            <Label htmlFor="deskripsi" className="font-semibold">
              Deskripsi
            </Label>

            <div
              id="deskripsi"
              className="flex flex-col h-[300px] w-full border border-textSecondary"
              ref={quillRef}
            />
            {errors.desc && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.desc.message}
              </span>
            )}
          </div>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Pilih Kategori Berita
            </span>
            <Select
              value={watch("kategori_id")}
              onValueChange={(value) => setValue("kategori_id", value)}
            >
              <SelectTrigger className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150">
                <SelectValue placeholder="---Pilih kategori---" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {dataKetegori.map((data) => (
                  <SelectItem key={data.id} value={data.id.toString()}>
                    {data.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.kategori_id && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.kategori_id.message}
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
