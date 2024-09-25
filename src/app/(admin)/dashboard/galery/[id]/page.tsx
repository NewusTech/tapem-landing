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
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SERVER_URL } from "@/constants";
import Swal from "sweetalert2";
import { LoaderCircle } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

export default function PageGaleryEdit({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [imageGalery, setImageGalery] = useState<File | null>();
  const [mediaVideo, setMediaVideo] = useState<File | null>();
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [mediaLink, setMediaLink] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingPage, setLoadingPage] = useState(true);

  const token = Cookies.get("token");
  const navigation = useRouter();

  const handleChangeFileImage = (file: File[]) => {
    setImageGalery(file[0]);
  };
  const handleChangeFileVideo = (file: File[]) => {
    setMediaVideo(file[0]);
    console.log(file[0]);
  };

  const getGalerylById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(`${SERVER_URL}/galeri/get/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const responseStatus = await response.json();
      if (!responseStatus.data) return notFound();
      setTitle(responseStatus.data.title);
      setImageUrl(responseStatus.data.image);
      setMediaLink(responseStatus.data.mediaLink);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };

  const puteGalery = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/galeri/update/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const handleCreateGaleri = async () => {
    try {
      setLoading(true);
      if (title.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Nama tidak boleh kosong",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        return;
      }
      const formData = new FormData();
      if (imageGalery) formData.append("image", imageGalery);
      if (mediaVideo) formData.append("mediaLink", mediaVideo);
      formData.append("title", title);
      const response = await puteGalery(formData);

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
      navigation.replace("/dashboard/galery");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGalerylById();
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
            <BreadcrumbLink href="/dashboard/galery">Galeri</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Update Glaeri</p>
        <div className="flex flex-col gap-6 mt-10">
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Title</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Title Media"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload Gambar Galeri
            </span>
            <FileUploader
              fileChange={handleChangeFileImage}
              mediaUrl={imageUrl}
            />
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload File Video{" "}
              <span className="italic text-sm text-gray-500">(Optioonal)</span>
            </span>
            <FileUploader
              fileChange={handleChangeFileVideo}
              type="video"
              mediaUrl={mediaLink}
            />
          </label>
          <div className="flex w-full justify-end">
            <Button
              onClick={handleCreateGaleri}
              className="duration-150 bg-primary-main hover:bg-primary-700 focus:bg-primary-800  text-white rounded-xl min-w-32"
              disabled={isLoading}
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
