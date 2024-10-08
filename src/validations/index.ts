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
      .min(1, { message: "Nomor ponsel boleh kosong!" })
      .max(13, { message: "Nomor ponsel tidak boleh lebih 13 karakter" }),
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

export const faq = z
  .object({
    question: z
      .string({ message: "Pertanyaan tidak boleh kosong!" })
      .min(1, { message: "Pertanyaan tidak boleh kosong!" }),
    answer: z
      .string({ message: "Jawaban tidak boleh kosong!" })
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type faqFormData = z.infer<typeof faq>;

export const lppd = z
  .object({
    tanggalPublish: z
      .string({ message: "Tanggal Publish tidak boleh kosong!" })
      .date(),
    kategori: z
      .string({ message: "Kategori tidak boleh kosong!" })
      .min(1, { message: "Kategori tidak boleh kosong!" }),
    jenisInformasi: z
      .string({ message: "Jenis Informasi tidak boleh kosong!" })
      .min(1, { message: "Jenis Informasi tidak boleh kosong!" }),
    subJenisInformasi: z
      .string({ message: "Sub Jenis Informasi tidak boleh kosong!" })
      .min(1, { message: "Sub Jenis Informasi tidak boleh kosong!" }),
    tipeDokumen: z
      .string({ message: "Tipe Dokumen tidak boleh kosong!" })
      .min(1, { message: "Tipe Dokumen tidak boleh kosong!" }),
    kandunganInformasi: z
      .string({ message: "Kandungan Informasi tidak boleh kosong!" })
      .min(1, { message: "Kandungan Informasi tidak boleh kosong!" }),
    badanPublik: z
      .string({ message: "Badan Publik tidak boleh kosong!" })
      .min(1, { message: "Badan Publik tidak boleh kosong!" }),
    fileLampiran: z.string().optional().readonly(),
  })
  .required();
// Convert Zod schema to TypeScript type
export type lppdFormData = z.infer<typeof lppd>;

export const strukturOrganisasi = z
  .object({
    name: z
      .string({ message: "Nama File tidak boleh kosong!" })
      .min(1, { message: "Nama tidak boleh kosong!" }),
    file: z.string().optional().readonly(),
    id: z.string().optional().readonly()
  })
  .required();
// Convert Zod schema to TypeScript type
export type strukturOrganisasiFormData = z.infer<typeof strukturOrganisasi>;

export const socialMedia = z
  .object({
    name: z
      .string({ message: "Nama File tidak boleh kosong!" })
      .min(1, { message: "Nama tidak boleh kosong!" }),
    link: z
      .string({ message: "Link File tidak boleh kosong!" })
      .min(1, { message: "Link tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type socialMediaFormData = z.infer<typeof socialMedia>;
