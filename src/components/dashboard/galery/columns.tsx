"use client";

import { galeryProps } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { SERVER_URL } from "@/constants";
import Swal from "sweetalert2";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<galeryProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Gambar",
    cell: ({ row }) => {
      const galery = row.original;

      return (
        <Image
          src={galery.image}
          alt={`galery-${galery.image}`}
          width={600}
          height={300}
          className="w-auto h-20"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "actions",
    header: "Aksi",
    enableHiding: false,
    cell: ({ row }) => {
      const galery = row.original;

      const token = Cookies.get("token");

      const posteBanner = async () => {
        const response = await fetch(
          `${SERVER_URL}/galeri/delete/${galery.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        return await response.json();
      };

      const handleDelete = () => {
        Swal.fire({
          title: "Apakah Kamu Yakin!",
          text: "ingin menghapus banner ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Tampilkan loading sebelum memulai fetch data
            Swal.fire({
              title: "Menghapus...",
              text: "Harap tunggu sementara data dihapus",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            try {
              // Fetch data
              const response = await posteBanner();
              if (response.status !== 200) {
                Swal.fire({
                  icon: "error",
                  title: "Gagal Menghapus Data.",
                  text: response.message,
                  timer: 2000,
                  showConfirmButton: false,
                  position: "center",
                });
                return;
              }

              // Jika berhasil, tampilkan pesan sukses
              Swal.fire({
                title: "Deleted!",
                text: "Banner berhasil dihapus.",
                icon: "success",
              });

              // Reload halaman setelah 1 detik
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } catch (error) {
              // Jika ada error, tampilkan pesan gagal
              Swal.fire({
                icon: "error",
                title: "Gagal Menghapus Data.",
                text: "Terjadi kesalahan, silakan coba lagi nanti.",
                timer: 2000,
                showConfirmButton: false,
                position: "center",
              });
            }
          }
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/galery/${galery.id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 duration-150"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
