import {
  aplikasiListQuery,
  bannerListQuery,
  categoryListQuery,
  faqListQuery,
  galeryListQuery,
  newsListQuery,
} from "@/api";
import BannerLanding from "@/components/landing/banner";
import BeritaLanding from "@/components/landing/berita";
import FaqLanding from "@/components/landing/faq";
import FooterLanding from "@/components/landing/footer";
import GaleriLanding from "@/components/landing/galeri";
import MapLanding from "@/components/landing/map";
import MediaLanding from "@/components/landing/media";

export default async function Home() {
  const [faqList, galeryList, newList, mediaList, categoryList, bannerList] =
    await Promise.all([
      faqListQuery(),
      galeryListQuery(),
      newsListQuery(),
      aplikasiListQuery(),
      categoryListQuery(),
      bannerListQuery(),
    ]);

  return (
    <section className="flex flex-col">
      <BannerLanding bannerList={bannerList || []} />
      <MediaLanding aplikasiList={mediaList || []} />
      <BeritaLanding newsList={newList?.data || []} />
      <MapLanding />
      <GaleriLanding galeryList={galeryList || []} />
      <FaqLanding faqList={faqList || []} />
      <FooterLanding categoryList={categoryList || []} />
    </section>
  );
}
