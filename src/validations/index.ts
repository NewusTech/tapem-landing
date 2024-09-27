"use client";

import { z } from "zod";

export const SignIn = z
  .object({
    username: z
      .string({ message: "Username tidak boleh kosong!" })
      .min(1, { message: "Username tidak boleh kosong!" }),
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
    title: z
      .string({ message: "Title tidak boleh kosong!" })
      .min(1, { message: "Title tidak boleh kosong!" }),
    subTitle: z
      .string({ message: "Subtitle tidak boleh kosong!" })
      .min(1, { message: "Subtitle tidak boleh kosong!" }),
    mediaLink: z
      .string({ message: "Media Link tidak boleh kosong!" })
      .min(1, { message: "Media tidak boleh kosong!" }),
    description: z
      .string({ message: "Deksripsi tidak boleh kosong!" })
      .min(100, { message: "Minimal deskripsi 100 karakter" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type MediaLandingFormData = z.infer<typeof MediaLanding>;

export const RegioninfoLanding = z
  .object({
    title: z
      .string({ message: "Title tidak boleh kosong!" })
      .min(1, { message: "Title tidak boleh kosong!" }),
    description: z
      .string({ message: "Title tidak boleh kosong!" })
      .min(100, { message: "Minimal deskripsi 100 karakter" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type RegioninfoLandingFormData = z.infer<typeof RegioninfoLanding>;

export const Personil = z
  .object({
    name: z
      .string({ message: "Nama tidak boleh kosong!" })
      .min(1, { message: "Nama tidak boleh kosong!" }),
    jabatan_id: z.string({ message: "Jabatan tidak boleh kosong!" }),
    nip: z
    .string({ message: "Nip tidak boleh kosong!" })
    .min(1, { message: "Nip tidak boleh kosong!" }),
    phoneNumber: z
    .string({ message: "Nomor ponsel tidak boleh kosong!" })
    .min(1, { message: "Nomor ponsel boleh kosong!" }).max(13,{message:"Nomor ponsel tidak boleh lebih 13 karakter"}),
    educationHistory: z
    .string({ message: "Nomor ponsel tidak boleh kosong!" })
    .min(1, { message: "Nomor ponsel boleh kosong!" }),
    positionHistory: z
    .string({ message: "Riwayat pendidikan tidak boleh kosong!" })
    .min(1, { message: "Riwayat pendidikan ponsel boleh kosong!" }),
    image: z.string().optional().readonly(),
  })
  .required();
// Convert Zod schema to TypeScript type
export type PersonilFormData = z.infer<typeof Personil>;
export const position = z
  .object({
    title: z
      .string({ message: "Title tidak boleh kosong!" })
      .min(1, { message: "Title tidak boleh kosong!" }),
    level: z
      .string({ message: "Level tidak boleh kosong!" })
      .min(1, { message: "Level tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type positionFormData = z.infer<typeof position>;

export const aplication = z
  .object({
    name: z
      .string({ message: "Nama tidak boleh kosong!" })
      .min(1, { message: "Nama tidak boleh kosong!" }),
    desc: z
      .string({ message: "Deskripsi tidak boleh kosong!" })
      .min(1, { message: "Deskripsi tidak boleh kosong!" }),
    link: z
      .string({ message: "Link tidak boleh kosong!" })
      .min(1, { message: "Link tidak boleh kosong!" }),
    image: z.string().optional().readonly(),
  })
  .required();
// Convert Zod schema to TypeScript type
export type aplicationFormData = z.infer<typeof aplication>;

export const contact = z
  .object({
    alamat: z
      .string({ message: "alamat tidak boleh kosong!" })
      .min(1, { message: "alamat tidak boleh kosong!" }),
    email: z
      .string({ message: "email tidak boleh kosong!" })
      .min(1, { message: "email tidak boleh kosong!" }),
    telp: z
      .string({ message: "telp tidak boleh kosong!" })
      .min(1, { message: "telp tidak boleh kosong!" }),
    latitude: z
      .string({ message: "latitude tidak boleh kosong!" })
      .min(1, { message: "latitude tidak boleh kosong!" }),
    longitude: z
      .string({ message: "longitude tidak boleh kosong!" })
      .min(1, { message: "longitude tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type contactFormData = z.infer<typeof contact>;

export const news = z
  .object({
    title: z
      .string({ message: "title tidak boleh kosong!" })
      .min(1, { message: "title tidak boleh kosong!" }),
    desc: z
      .string({ message: "deskripsi tidak boleh kosong!" })
      .min(1, { message: "deskripsi tidak boleh kosong!" }),
    kategori_id: z.string({ message: "kategori tidak boleh kosong!" }),
    image: z.string().optional().readonly(),
    mediaLink: z.string().optional().readonly(),
  })
  .required();
// Convert Zod schema to TypeScript type
export type newsFormData = z.infer<typeof news>;

export const sambutan = z
  .object({
    title: z
      .string({ message: "title tidak boleh kosong!" })
      .min(1, { message: "title tidak boleh kosong!" }),
    desc: z
      .string({ message: "deskripsi tidak boleh kosong!" })
      .min(1, { message: "deskripsi tidak boleh kosong!" }),
    personil_id: z
      .string({ message: "personil tidak boleh kosong!" })
      .min(1, { message: "personil tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type sambutanFormData = z.infer<typeof sambutan>;

export const regulation = z
  .object({
    title: z
      .string({ message: "title tidak boleh kosong!" })
      .min(1, { message: "title tidak boleh kosong!" }),
    file: z.string().optional().readonly(),
  })
  .required();
// Convert Zod schema to TypeScript type
export type regulationFormData = z.infer<typeof regulation>;
