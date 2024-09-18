import LayoutComponent from "@/components/layout/layoutComponent";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <LayoutComponent>{children}</LayoutComponent>
    </Suspense>
  );
}
