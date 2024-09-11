"use client";

import React from "react";
import HeaderSection from "./headerSection";
import NavBar from "./navBar";

export default function LayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" w-full min-h-screen">
      <HeaderSection />
      <NavBar />
      {children}
    </main>
  );
}
