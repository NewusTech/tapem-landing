"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle visibilitas kata sandi
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container mx-4 md:mx-auto space-y-4 bg-[#84ACCE] py-8 px-10 sm:px-[60px] w-[90%] sm:w-[565px] rounded-xl flex flex-col">
      <div className="flex flex-col">
        <h5 className="uppercase text-primary-main font-bold tracking-[0.2rem] text-lg">
          daftar
        </h5>
        <p className="text-black text-sm">
          Sudah punya akun? silakan{" "}
          <Link href="/login" className="underline text-primary-main">
            Masuk
          </Link>
        </p>
      </div>
      <div className="space-y-4 w-full">
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Nama Lengkap</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="Nama"
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Nomor Telepon</span>
          <input
            type="text"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="+628"
            inputMode="tel"
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Nomor Telepon</span>
          <input
            type="email"
            className="rounded-full border border-gray-400 focus:outline focus:border-primary-soft outline-primary-soft h-8 py-5 px-3 duration-150"
            placeholder="Email"
            inputMode="email"
          />
        </label>
        <label className="flex flex-col gap-y-2">
          <span className="font-medium text-primary-700">Password</span>
          <div className=" flex gap-x-2 rounded-full items-center pl-3 bg-white py-2 overflow-hidden border border-gray-500 duration-150 focus-within:outline outline-1 focus-within:border-primary-soft outline-primary-soft">
            <input
              className="focus:outline-none w-full text-gray-500"
              placeholder="Kata Sandi"
              type={showPassword ? "text" : "password"}
            />
            <button
              onClick={togglePasswordVisibility}
              className="cursor-pointer mr-2"
            >
              {showPassword ? (
                <EyeOff className="text-greyy" />
              ) : (
                <Eye className="text-greyy" />
              )}
            </button>
          </div>
        </label>
      </div>
      <div className="flex justify-center">
        <Button className="rounded-full text-white bg-primary-main px-8">
          Daftar
        </Button>
      </div>
      <p className="text-center text-xs text-black font-light">
        Dengan mendaftar, Anda menyetujui{" "}
        <span className="font-semibold">Syarat & Ketentuan</span> kami dan Anda{" "}
        <br /> telah membaca{" "}
        <span className="font-semibold">Kebijakan Privasi</span> kami.
      </p>
    </div>
  );
};

export default RegisterPage;
