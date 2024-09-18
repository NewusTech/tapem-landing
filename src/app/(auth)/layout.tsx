import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <main className="bg-[url('/assets/images/bg-screen.jpg')] flex justify-center items-center w-screen h-screen bg-cover">
        {children}
      </main>
    </section>
  );
}
