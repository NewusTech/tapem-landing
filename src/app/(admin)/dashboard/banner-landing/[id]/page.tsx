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
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants";
import Swal from "sweetalert2";

export default function PagebannerEdit({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [imageBanner, setImageBanner] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingPage, setLoadingPage] = useState(true);

  const token = Cookies.get("token");
  const navigation = useRouter();

  const handleChangeFile = (file: File[]) => {
    setImageBanner(file[0]);
  };

  const getBannerById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(`${SERVER_URL}/carousel/get/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const responseStatus = await response.json();
      setImageUrl(responseStatus.data.image);
      setName(responseStatus.data.name)
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };

  const updateBanner = async (data: FormData) => {
    const response = await fetch(`${SERVER_URL}/carousel/update/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    return await response.json();
  };

  const handleCreateBanner = async () => {
    try {
      setLoading(true);
      if (!imageBanner) {
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
      formData.append("image", imageBanner);
      const response = await updateBanner(formData);

      if (!response.data) {
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
      navigation.replace("/dashboard/banner-landing");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerById();
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
            <BreadcrumbLink href="/dashboard/banner-landing">
              Banner Landing
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Edit Banner</p>
        <div className="flex flex-col gap-6 mt-10">
        <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Title</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Title Media"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload Gambar Banner
            </span>
            <FileUploader fileChange={handleChangeFile} mediaUrl={imageUrl} />
          </label>
          <div className="flex w-full justify-end">
            <Button
              onClick={handleCreateBanner}
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
