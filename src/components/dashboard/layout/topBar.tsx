"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { logoutUser } from "@/api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { decodedProps } from "@/types/types";
import { jwtDecode } from "jwt-decode";

export default function TopBar() {
  const token = Cookies.get("token");
  const navigation = useRouter();
  const [adminName,setAdminName] = useState("");

  const hanldeLogout = async () => {
    if (!token) {
      return Swal.fire({
        icon: "error",
        title: "Gagal Token Tidak Ada",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    }
    const response = await logoutUser(token);

    if (!response.data) {
      Swal.fire({
        icon: "error",
        title: "Gagal Logout",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Berhasil Logout!",
      timer: 2000,
      showConfirmButton: false,
      position: "center",
    });
    Cookies.remove("token");
    navigation.replace("/login");
  };

  useEffect(()=>{
    if(token){
      const decoded: decodedProps = jwtDecode(token);
      setAdminName(decoded.name)
    }
  },[token])

  return (
    <div className="bg-primary-main w-full h-24 flex items-center justify-end pr-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center text-white gap-x-2 py-4 px-2">
          <CircleUserRound />
          <span>{adminName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={hanldeLogout}
            className="flex flex-row justify-between hover:bg-gray-500/50 hover:text-white duration-150"
          >
            <LogOut size={16} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
