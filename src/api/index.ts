import { SERVER_URL } from "@/constants";

export type faqProps = {
  id: number;
  question: string;
  answer: string;
};
export async function faqListQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/faq/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as faqProps[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export type galeryProps = {
  id: number;
  title: string;
  image: string;
};
export async function galeryListQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/galeri/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as galeryProps[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
  try {
    const response = await fetch(
      `${SERVER_URL}/artikel/get?search=${search ?? ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data as newsListQueryResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export async function newsDetailsQuery(slug:string) {
  try {
    const response = await fetch(`${SERVER_URL}/artikel/get/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as newsProps;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export type aplikasiProps = {
  id: number;
  name: string;
  image: string;
  link: string;
  desc: string;
};
export async function aplikasiListQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/aplikasietc/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as aplikasiProps[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export type categoryProps = {
  id: number;
  title: string;
};
export async function categoryListQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/kategoriartikel/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as categoryProps[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export type bannerProps = {
  id: number;
  image: string;
};
export async function bannerListQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/carousel/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as bannerProps[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export type tugasPokokFungsiProps = {
  id: number;
  tugaspokok: string;
  fungsiutama: string;
};
export async function tugasPokokFungsiQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/tupoksi/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as tugasPokokFungsiProps;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export type personilListProps = {
  id: number;
  name: string;
  image: string;
  Jabatan: {
    id: number;
    title: string;
  };
};
export async function personilListQuery() {
  try {
    const response = await fetch(`${SERVER_URL}/personil/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as personilListProps[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
  try {
    const response = await fetch(`${SERVER_URL}/contact/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data.data as contactProps;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
