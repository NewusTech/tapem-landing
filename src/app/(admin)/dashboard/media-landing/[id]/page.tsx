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
import { MediaLanding, MediaLandingFormData } from "@/validations";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUploader from "@/components/fileUploader";

export default function MediaLandingEditpage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const token = Cookies.get("token");
  const navigation = useRouter();
  const [isLoadingPage, setLoadingPage] = useState(true);
  const [mediaVideo, setMediaVideo] = useState<File | null>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MediaLandingFormData>({
    resolver: zodResolver(MediaLanding),
  });

  const handleChangeFileVideo = (file: File[]) => {
    setMediaVideo(file[0]);
  };

  const getMediaLandingById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(
        `${SERVER_URL}/mediabanner/get/${params.id}`,
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
      setValue("title", responseStatus.data.title);
      setValue("subTitle", responseStatus.data.subTitle);
      setValue("mediaLink", responseStatus.data.mediaLink);
      setValue("description", responseStatus.data.description);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };

  const putMediaBanner = async (data: FormData) => {
    const response = await fetch(
      `${SERVER_URL}/mediabanner/update/${params.id}`,
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

  const onSubmit: SubmitHandler<MediaLandingFormData> = async (data) => {
    try {
      const formData = new FormData();
      if (mediaVideo) formData.append("mediaLink", mediaVideo);
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle);
      formData.append("description", data.description);
      const response = await putMediaBanner(formData);
      if (response.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengupdate data media banner. " + response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil mengupdate data media banner.",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      navigation.replace("/dashboard/media-landing");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getMediaLandingById();
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
            <BreadcrumbLink href="/dashboard/media-landing">
              Media Landing
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">
          Form Update Media Landing
        </p>

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
            <span className="font-medium text-primary-700">Subtitle</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Subtitle Media"
              {...register("subTitle")}
            />
            {errors.subTitle && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.subTitle.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Upload File Video
            </span>
            <FileUploader
              fileChange={handleChangeFileVideo}
              type="video"
              mediaUrl={watch("mediaLink")}
            />
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
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
