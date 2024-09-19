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
