"use client";

import { z } from "zod";

export const SignIn = z
  .object({
    username: z.string({ message: "Username tidak boleh kosong!" }),
    password: z
      .string({ message: "Kata Sandi tidak boleh kosong!" })
      .min(6, { message: "Kata Sandi harus lebih dari 6 karakter!" })
      .max(15, { message: "Kata Sandi tidak boleh lebih dari 15 karakter!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type SignInFormData = z.infer<typeof SignIn>;
export const MediaLanding = z
  .object({
    title: z.string({ message: "Title tidak boleh kosong!" }),
    subTitle: z.string({ message: "Subtitle tidak boleh kosong!" }),
    mediaLink: z.string({ message: "Media Link tidak boleh kosong!" }),
    description: z
      .string({ message: "Deksripsi tidak boleh kosong!" })
      .min(100, { message: "Minimal deskripsi 100 karakter" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type MediaLandingFormData = z.infer<typeof MediaLanding>;

export const RegioninfoLanding = z
  .object({
    title: z.string({ message: "Title tidak boleh kosong!" }),
    description: z
      .string({ message: "Title tidak boleh kosong!" })
      .min(100, { message: "Minimal deskripsi 100 karakter" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type RegioninfoLandingFormData = z.infer<typeof RegioninfoLanding>;

export const Personil = z
  .object({
    name: z.string({ message: "Nama tidak boleh kosong!" }),
    jabatan_id: z.string({ message: "Jabatan tidak boleh kosong!" }),
    image : z.string().optional()
  })
  .required();
// Convert Zod schema to TypeScript type
export type PersonilFormData = z.infer<typeof Personil>;
