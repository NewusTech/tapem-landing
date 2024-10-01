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
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { socialMedia, socialMediaFormData } from "@/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseSocialMediaIcon from "@/hooks/useSocialMediaIcon";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Page({
    params,
  }: {
    params: {
      id: string;
    };
  }) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isLoadingPage, setLoadingPage] = useState(true);

  const token = Cookies.get("token");
  const navigation = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<socialMediaFormData>({
    resolver: zodResolver(socialMedia),
  });


  const getSocialMediaById = async () => {
    try {
      setLoadingPage(true);
      const response = await fetch(
        `${SERVER_URL}/socialmedia/get/${params.id}`,
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
      setValue("link", responseStatus.data.link);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  };


  const putSocialMedia = async (data: socialMediaFormData) => {
    const response = await fetch(`${SERVER_URL}/socialmedia/update/${params.id}`, {
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

  const onSubmit: SubmitHandler<socialMediaFormData> = async (data) => {
    const response = await putSocialMedia(data);

    if (response.status !== 200) {
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
    navigation.replace("/dashboard/social-media");
  };

  
  useEffect(() => {
    getSocialMediaById();
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
            <BreadcrumbLink href="/dashboard/social-media">
              Social Media
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">
          Form Input Social Media
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Link Social Media
            </span>
            <input
              type="url"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Link Social Media"
              {...register("link")}
            />
            {errors.link && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.link.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">
              Pilih Social Media
            </span>
            <Select
              value={watch("name")}
              onValueChange={(value) => setValue("name", value)}
            >
              <SelectTrigger className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150">
                <SelectValue placeholder="---Pilih Social Media---" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="facebook">
                  <div className="flex flex-row gap-x-2">
                    <span className="text-sm text-gray-500 italic">
                      {UseSocialMediaIcon({ name: "facebook" })}
                    </span>
                    Facebook
                  </div>
                </SelectItem>
                <SelectItem value="twitter">
                  <div className="flex flex-row gap-x-2">
                    <span className="text-sm text-gray-500 italic">
                      {UseSocialMediaIcon({ name: "twitter" })}
                    </span>
                    Twitter
                  </div>
                </SelectItem>
                <SelectItem value="instagram">
                  <div className="flex flex-row gap-x-2">
                    <span className="text-sm text-gray-500 italic">
                      {UseSocialMediaIcon({ name: "instagram" })}
                    </span>
                    Instagram
                  </div>
                </SelectItem>
                <SelectItem value="linkedin">
                  <div className="flex flex-row gap-x-2">
                    <span className="text-sm text-gray-500 italic">
                      {UseSocialMediaIcon({ name: "linkedin" })}
                    </span>
                    Linkedin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.name && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.name.message}
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
