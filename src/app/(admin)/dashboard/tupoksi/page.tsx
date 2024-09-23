"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { tugasPokokFungsiQuery } from "@/api";
import { LoaderCircle } from "lucide-react";
import { SERVER_URL } from "@/constants";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Page() {
  const [tugaspokok, setTugasPokok] = useState<string>("");
  const [fungsi, setFungsi] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState({
    tugasPokok: "",
    fungsiUatama: "",
  });

  const { quill: tugasPokokQuill, quillRef: tugasPokokRef } = useQuill();
  const { quill: fungsiQuill, quillRef: fungsiRef } = useQuill();

  const token = Cookies.get("token");

  // Fetch initial data for the editors
  const getDataTuPoksi = async () => {
    const response = await tugasPokokFungsiQuery();
    setResponseData({
      fungsiUatama: response.fungsiutama,
      tugasPokok: response.tugaspokok,
    });
  };

  const putTupoksi = async (data: {
    tugaspokok: string;
    fungsiutama: string;
  }) => {
    const response = await fetch(`${SERVER_URL}/tupoksi/update/`, {
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

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const payload = {
        tugaspokok: tugaspokok,
        fungsiutama: fungsi,
      };
      const response = await putTupoksi(payload);

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial content into the editors
  useEffect(() => {
    if (tugasPokokQuill && fungsiQuill && responseData) {
      tugasPokokQuill.setContents(
        tugasPokokQuill.clipboard.convert({ html: responseData.tugasPokok })
      );
      fungsiQuill.setContents(
        fungsiQuill.clipboard.convert({ html: responseData.fungsiUatama })
      );
    }
  }, [tugasPokokQuill, fungsiQuill, responseData]);

  // Update the state when editor content changes
  useEffect(() => {
    if (tugasPokokQuill) {
      tugasPokokQuill.on("text-change", () => {
        setTugasPokok(tugasPokokQuill.root.innerHTML);
      });
    }

    if (fungsiQuill) {
      fungsiQuill.on("text-change", () => {
        setFungsi(fungsiQuill.root.innerHTML);
      });
    }
  }, [tugasPokokQuill, fungsiQuill]);

  // Fetch data when the component mounts
  useEffect(() => {
    getDataTuPoksi();
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
            <BreadcrumbPage className="font-semibold">
              Tugas Pokok dan Fungsi
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full text-primary-main mt-10 bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-y-6">
        <div className="space-y-4">
          <Label htmlFor="tugaspokok" className="font-semibold">
            Tugas Pokok
          </Label>

          <div
            id="tugaspokok"
            className="flex flex-col h-[300px] w-full border border-textSecondary"
            ref={tugasPokokRef}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="fungsi" className="font-semibold">
            Fungsi Utama
          </Label>
          <div
            id="fungsi"
            className="flex flex-col h-[300px] w-full border border-textSecondary"
            ref={fungsiRef}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          type="button"
          className="duration-150 bg-primary-main hover:bg-primary-700 focus:bg-primary-800  text-white rounded-xl min-w-32"
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Upadate"}
        </Button>
      </div>
    </section>
  );
}
