export const bloodTypes = [
  { id: 1, key: "A" },
  { id: 2, key: "B" },
  { id: 3, key: "AB" },
  { id: 4, key: "O" },
];

export const navLink: {
  title: string;
  link: string;
  child?: {
    title: string;
    link: string;
  }[];
}[] = [
  {
    title: "home",
    link: "/",
  },
  {
    title: "profile",
    link: "#",
    child:[
      {
        title:"tupoksi",
        link:"/tupoksi"
      },
      {
        title:"personil",
        link:"/personil"
      },
    ]
  },
  {
    title: "informasi",
    link: "#",
    child:[
      {
        title:"regulasi",
        link:"/regulation"
      },
      {
        title:"laporan kecamatan",
        link:"/district-report"
      },
      {
        title:"lppd",
        link:"/lppd"
      },
    ]
  },
  {
    title: "berita",
    link: "/news",
  },
  {
    title: "galeri",
    link: "/galery",
  },
  {
    title: "aplikasi",
    link: "/aplication",
  },
  {
    title: "kontak",
    link: "/contact",
  },
];

export const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;
export const SERVER_SIPETA_URL = process.env.NEXT_PUBLIC_API_SIPETA_URL;
