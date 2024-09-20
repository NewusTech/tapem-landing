import { SERVER_URL } from "@/constants";
import { fetcherWithoutAuth } from "@/constants/fetcher";

export type faqProps = {
  id: number;
  question: string;
  answer: string;
};
export async function faqListQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/faq/get`);
  return response.data;
}
export type galeryProps = {
  id: number;
  title: string;
  image: string;
};
export async function galeryListQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/galeri/get`);
  return response.data as galeryProps[];
}
export type newsProps = {
  id: number;
  title: string;
  slug: string;
  desc: string;
  image: string;
  kategori_id: number;
  createdAt: string;
  updatedAt: string;
  Kategoriartikel: {
    id: number;
    title: string;
  };
};
export type newsListQueryResponse = {
  status: number;
  message: string;
  data: newsProps[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
    links: {
      prev: null | string;
      next: null | string;
    };
  };
};
export async function newsListQuery(search?: string) {
  const response = await fetcherWithoutAuth(
    `${SERVER_URL}/artikel/get?search=${search ?? ""}`
  );
  return response as newsListQueryResponse;
}
export async function newsDetailsQuery(slug: string) {
  const response = await fetcherWithoutAuth(
    `${SERVER_URL}/artikel/get/${slug}`
  );
  return response.data as newsProps;
}
export type aplikasiProps = {
  id: number;
  name: string;
  image: string;
  link: string;
  desc: string;
};
export async function aplikasiListQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/aplikasietc/get`);
  return response.data as aplikasiProps[];
}
export type categoryProps = {
  id: number;
  title: string;
};
export async function categoryListQuery() {
  const response = await fetcherWithoutAuth(
    `${SERVER_URL}/kategoriartikel/get`
  );
  return response.data as categoryProps[];
}
export type bannerProps = {
  id: number;
  image: string;
  name:string
};
export async function bannerListQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/carousel/get`);
  return response.data as bannerProps[];
}
export type tugasPokokFungsiProps = {
  id: number;
  tugaspokok: string;
  fungsiutama: string;
};
export async function tugasPokokFungsiQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/tupoksi/get`);
  return response.data as tugasPokokFungsiProps;
}
export type personilListProps = {
  id: number;
  name: string;
  image: string;
  Jabatan: {
    id: number;
    level: number;
    title: string;
  };
};
export async function personilListQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/personil/get`);
  return response.data as personilListProps[];
}
export type contactProps = {
  id: number;
  alamat: string;
  email: string;
  telp: string;
  latitude: string;
  longitude: string;
};
export async function contactQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/contact/get`);
  return response.data as contactProps;
}
export type regionInfoProps = {
  id: number;
  image: string;
  title: string;
  description: string;
};
export async function regionInfoQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/regioninfo/get`);
  return response.data as regionInfoProps[];
}
export type mediaBannerProps = {
  id: number;
  title: string;
  subTitle: string;
  mediaLink: string;
  description: string;
};
export async function mediaBannerQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/mediabanner/get`);
  return response.data as mediaBannerProps[];
}
export type jabatanListProps = {
  id: number;
  title: string;
  level: number;
};
export async function jabatanListQuery() {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/jabatan/get`);
  return response.data as jabatanListProps[];
}

/// POST

// login user
export const loginUser = async (data: { nik: string; password: string }) => {
  const response = await fetch(`${SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};
// logout user
export const logoutUser = async (token: string) => {
  const response = await fetch(`${SERVER_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return await response.json();
};