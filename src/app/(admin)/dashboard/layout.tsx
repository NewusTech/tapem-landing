import SideBar from "@/components/dashboard/layout/sideBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row w-full h-screen bg-gray-100">
      <SideBar />
      <main className="w-full bg-white">
        <div className="bg-primary-main w-full h-24 flex items-center justify-end pr-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center text-white gap-x-2 py-4 px-2">
              <CircleUserRound />
              <span>Qurota Aini</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
