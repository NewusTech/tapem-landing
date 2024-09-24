import {
  aplikasiListQuery,
  bannerListQuery,
  categoryListQuery,
  contactQuery,
  faqListQuery,
  galeryListQuery,
  mediaBannerQuery,
  newsListQuery,
  personilListQuery,
  regionInfoQuery,
} from "@/api";
import BannerLanding from "@/components/landing/banner";
import BeritaLanding from "@/components/landing/berita";
import FaqLanding from "@/components/landing/faq";
import FooterLanding from "@/components/landing/footer";
import GaleriLanding from "@/components/landing/galeri";
import MapLanding from "@/components/landing/map";
import MediaLanding from "@/components/landing/media";
import Sambutan from "@/components/landing/sambutan";
import StrukturOrganisasi from "@/components/landing/strukturOrganisasi";

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
    personilListData
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
    personilListQuery()
  ]);
  return (
    <section className="flex flex-col">
      <BannerLanding bannerList={bannerList || []} />
      <MediaLanding
        aplikasiList={mediaList || []}
        mediaBannerData={mediaBannerData || []}
      />
      <Sambutan/>
      <BeritaLanding newsList={newList?.data || []} />
      <StrukturOrganisasi personil={personilListData} />
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
