"use client";

import { Eye, EyeOff, User, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle visibilitas kata sandi
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container mx-4 md:mx-auto space-y-4 bg-[#84ACCE] py-8 px-10 sm:px-[60px] w-full sm:w-[565px] rounded-xl flex flex-col">
      <div className="flex justify-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={140}
          height={178}
        />
      </div>
      <div className="flex flex-col items-center">
        <h5 className="uppercase text-primaryy font-semibold">sitapem</h5>
        <p className="uppercase text-primaryy font-light w-8/12 text-center text-sm">
          sistem informasi tata pemerintahan
        </p>
      </div>
      <div className="space-y-2 w-full">
        <label className=" flex gap-x-2 rounded-full items-center pl-3 bg-white py-2 overflow-hidden border border-gray-500 duration-150 focus-within:outline outline-2 focus-within:border-primary-soft outline-primary-soft">
          <UserRound className="text-gray-500" />
          <input
            className="focus:outline-none w-full text-gray-500 pe-2"
            placeholder="Email"
            type="email"
            inputMode="email"
          />
        </label>
        <label className=" flex gap-x-2 rounded-full items-center pl-3 bg-white py-2 overflow-hidden border border-gray-500 duration-150 focus-within:outline outline-2 focus-within:border-primary-soft outline-primary-soft">
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
        </label>
      </div>
      <div className="flex flex-wrap gap-y-2 justify-between">
        <Link href="/" className="text-primaryy underline text-sm">
          Lupa kata sandi?
        </Link>
        <p className="text-sm text-greyy">
          Belum punya akun? silakan{" "}
          <Link href="/register" className="text-primaryy underline">
            Daftar?
          </Link>
        </p>
      </div>
      <div className="flex justify-center">
        <Button className="rounded-full text-white bg-primary-main px-8">
          Masuk
        </Button>
      </div>
      <p className="text-center text-xs text-primaryy font-light">
        Dengan mendaftar, Anda menyetujui{" "}
        <span className="font-semibold">Syarat & Ketentuan</span> kami dan Anda{" "}
        <br /> telah membaca{" "}
        <span className="font-semibold">Kebijakan Privasi</span> kami.
      </p>
    </div>
  );
};

export default LoginPage;
