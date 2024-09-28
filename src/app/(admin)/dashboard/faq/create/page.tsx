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
import { faq, faqFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";

export default function FaqPage() {
  const token = Cookies.get("token");
  const navigation = useRouter();

  const { quill, quillRef } = useQuill();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<faqFormData>({
    resolver: zodResolver(faq),
  });

  const postFaq = async (data: faqFormData) => {
    const response = await fetch(`${SERVER_URL}/faq/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await response.json();
  };

  const onSubmit: SubmitHandler<faqFormData> = async (data) => {
    const response = await postFaq(data);

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
    navigation.replace("/dashboard/faq");
  };

  // Update the state when editor content changes
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue("answer", quill.root.innerHTML);
      });
    }
  }, [quill, setValue]);

  return (
    <section className="space-y-4 container py-4">
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-primary-main">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/faq">FAQ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10 w-full bg-white shadow-md rounded-xl p-4">
        <p className="text-primary-700 font-semibold">Form Input FAQ</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col gap-y-2">
            <span className="font-medium text-primary-700">Nama</span>
            <input
              type="text"
              className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
              placeholder="Pertanyaan"
              {...register("question")}
            />
            {errors.question && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.question.message}
              </span>
            )}
          </label>
          <div className="space-y-4">
            <Label htmlFor="jawaban" className="font-semibold">
              Jawaban
            </Label>
            <div
              id="jawaban"
              className="flex flex-col h-[300px] w-full border border-textSecondary"
              ref={quillRef}
            />
            {errors.answer && (
              <span className="text-red-600 text-sm pl-2 mt-4">
                {errors.answer.message}
              </span>
            )}
          </div>
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
