import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Perlu tambahkan jwt-decode
import { decodedProps } from "./types/types";

export function middleware(request: NextRequest) {
  // Ambil token dari cookie
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;
  if (token) {
    try {
      // Decode JWT untuk mendapatkan informasi
      const decoded: decodedProps = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Waktu saat ini dalam detik

      // Cek apakah token sudah expired
      if (decoded.exp < currentTime) {
        const loginUrl = new URL("/login", request.url);

        // Hapus token dari cookie jika expired
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("token");
        return response;
      }

      // Cek apakah user memiliki role "Super Admin" untuk mengakses dashboard
      if (pathname.startsWith("/dashboard") && decoded.role !== "Super Admin") {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
      }
    } catch (error) {
      console.error("Invalid token:", error);

      // Jika token tidak valid, redirect ke login dan hapus token
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("token");
      return response;
    }
  }

  // Jika user mencoba mengakses dashboard tapi tidak ada token, redirect ke login
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika user mencoba mengakses login/register tapi sudah ada token, redirect ke dashboard
  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Biarkan request dilanjutkan
  return NextResponse.next();
}

// Tentukan path yang middleware ini akan berlaku
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
