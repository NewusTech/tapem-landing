import BannerLanding from "@/components/landing/banner";
import BeritaLanding from "@/components/landing/berita";
import FaqLanding from "@/components/landing/faq";
import FooterLanding from "@/components/landing/footer";
import GaleriLanding from "@/components/landing/galeri";
import MapLanding from "@/components/landing/map";
import MediaLanding from "@/components/landing/media";

export default function Home() {
  return (
    <section className="flex flex-col">
      <BannerLanding />
      <MediaLanding/>
      <BeritaLanding/>
      <MapLanding/>
      <GaleriLanding/>
      <FaqLanding/>
      <FooterLanding/>
    </section>
  );
}
