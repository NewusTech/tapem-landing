import SideBar from "@/components/dashboard/layout/sideBar";
import TopBar from "@/components/dashboard/layout/topBar";
import React, { Suspense } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row w-full h-screen bg-gray-100">
      <SideBar />
      <main className="w-full bg-white">
        <TopBar />
        <Suspense>
          <div className="w-full overflow-y-auto h-[90%]">{children}</div>
        </Suspense>
      </main>
    </div>
  );
}
