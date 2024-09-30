"use client";

import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignIn, SignInFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignIn),
  });
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const response = await loginUser({
        nik: data.username,
        password: data.password,
      });
      if (!response.data) {
        Swal.fire({
          icon: "error",
          title: "Login gagal. " + response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Login berhasil!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      Cookies.set("token", response?.data?.token);
      navigation.replace("dashboard");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // Fungsi untuk toggle visibilitas kata sandi
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-4 md:mx-auto space-y-4 bg-[#84ACCE] py-8 px-10 sm:px-[60px] w-full sm:w-[565px] rounded-xl flex flex-col"
    >
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
            placeholder="Username"
            type="text"
            {...register("username")}
          />
        </label>
        {errors.username && (
          <span className="text-red-600 text-sm pl-2 mt-4">
            {errors.username.message}
          </span>
        )}
        <label className=" flex gap-x-2 rounded-full items-center pl-3 bg-white py-2 overflow-hidden border border-gray-500 duration-150 focus-within:outline outline-2 focus-within:border-primary-soft outline-primary-soft">
          <LockKeyhole className="text-gray-500" />
          <input
            className="focus:outline-none w-full text-gray-500"
            placeholder="Kata Sandi"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            type="button"
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
        {errors.password && (
          <span className="text-red-600 text-sm pl-2 mt-4">
            {errors.password.message}
          </span>
        )}
      </div>
      {/* <div className="flex flex-wrap gap-y-2 justify-between">
        <Link href="/" className="text-primaryy underline text-sm">
          Lupa kata sandi?
        </Link>
        <p className="text-sm text-greyy">
          Belum punya akun? silakan{" "}
          <Link href="/register" className="text-primaryy underline">
            Daftar?
          </Link>
        </p>
      </div> */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="rounded-full text-white bg-primary-main px-8 min-w-32"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Masuk"}
        </Button>
      </div>
      {/* <p className="text-center text-xs text-primaryy font-light">
        Dengan mendaftar, Anda menyetujui{" "}
        <span className="font-semibold">Syarat & Ketentuan</span> kami dan Anda{" "}
        <br /> telah membaca{" "}
        <span className="font-semibold">Kebijakan Privasi</span> kami.
      </p> */}
    </form>
  );
};

export default LoginPage;
