import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date?: number | Date | undefined,
  options: Intl.DateTimeFormatOptions | undefined = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
): string => {
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
