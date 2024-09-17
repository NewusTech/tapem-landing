import {
  aplikasiListQuery,
  bannerListQuery,
  categoryListQuery,
  contactQuery,
  faqListQuery,
  galeryListQuery,
  mediaBannerQuery,
  newsListQuery,
  regionInfoQuery,
} from "@/api";
import BannerLanding from "@/components/landing/banner";
import BeritaLanding from "@/components/landing/berita";
import FaqLanding from "@/components/landing/faq";
import FooterLanding from "@/components/landing/footer";
import GaleriLanding from "@/components/landing/galeri";
import MapLanding from "@/components/landing/map";
import MediaLanding from "@/components/landing/media";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    faqList,
    galeryList,
    newList,
    mediaList,
    categoryList,
    bannerList,
    contactData,
    regionData,
    mediaBannerData,
  ] = await Promise.all([
    faqListQuery(),
    galeryListQuery(),
    newsListQuery(),
    aplikasiListQuery(),
    categoryListQuery(),
    bannerListQuery(),
    contactQuery(),
    regionInfoQuery(),
    mediaBannerQuery(),
  ]);
  console.log(mediaBannerData)

  return (
    <section className="flex flex-col">
      <BannerLanding bannerList={bannerList || []} />
      <MediaLanding
        aplikasiList={mediaList || []}
        mediaBannerData={mediaBannerData || []}
      />
      <BeritaLanding newsList={newList?.data || []} />
      <MapLanding regionData={regionData || []} />
      <GaleriLanding galeryList={galeryList || []} />
      <FaqLanding faqList={faqList || []} />
      <FooterLanding
        categoryList={categoryList || []}
        contactData={contactData}
      />
    </section>
  );
}
