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
    title: "berita",
    link: "/news",
  },
  {
    title: "galery",
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
