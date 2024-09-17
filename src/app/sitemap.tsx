import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${BASE_URL}/profile`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/personil`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/galery`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/aplication`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
