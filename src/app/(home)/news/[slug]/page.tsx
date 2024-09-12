import CardBerita from "@/components/berita/cardBerita";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DetailBerita() {
  return (
    <section className="py-10">
      <section className="container w-full md:w-[70%] flex flex-col">
        <div className="w-full max-h-[30rem] self-center overflow-hidden">
          <Image
            src={"/assets/images/dummy_1.png"}
            alt="Iamge"
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-primary-main">
          Lorem ipsum dolor sit amet
        </h1>
        <div className="flex flex-row w-full items-center">
          <p className="bg-primary-main rounded-full p-1 w-fit px-10 text-sm text-white text-center mr-2">
            Kategori
          </p>
          <p className="text-primary-main w-fit">Januari 13, 2024</p>
        </div>
        <p className="mt-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          totam, sunt quis quas aliquid alias nesciunt temporibus explicabo
          reprehenderit ea laborum provident incidunt saepe dolorum mollitia
          animi praesentium autem pariatur, et ipsa? Deserunt unde veniam,
          quidem iure repudiandae nam accusamus eaque tenetur, voluptates
          perferendis assumenda error quae? Alias aliquam minima reiciendis
          voluptatibus odio eum eligendi ex, suscipit animi blanditiis illum
          doloremque quo aut ducimus id! Mollitia ab saepe blanditiis? Iusto
          earum officiis, ex repudiandae natus saepe animi perferendis, ipsum
          explicabo dolorum, inventore alias a obcaecati veritatis maxime
          dolores qui blanditiis. Voluptas voluptatum, earum facilis aperiam
          dolor amet consectetur quae ipsa, quis animi dolores quod, quaerat aut
          alias obcaecati? Placeat itaque, ipsa aspernatur rem veritatis nihil
          possimus. Cupiditate voluptatibus molestias corporis fugit quis,
          facere, aut nobis rerum unde cum minus, neque vel laborum. Laudantium
          maiores, provident, nesciunt unde consectetur distinctio qui corporis
          saepe at quidem officia libero? Illo dolor rerum dolore repellat
          reiciendis accusantium dicta labore non fugit voluptates reprehenderit
          minus ex numquam voluptatem ad voluptatibus et a consequuntur
          blanditiis, omnis veritatis mollitia modi iusto. Exercitationem
          veritatis fuga esse quo! Ipsam itaque exercitationem ratione sunt
          nulla, sequi labore debitis unde eaque voluptates porro, amet vel.
          Recusandae dolorum impedit nostrum delectus laboriosam.
        </p>
      </section>
      {/* berita lainnya */}
      <section className="container mt-6">
        <div className="flex flex-row items-center">
          <p className="text-2xl font-bold w-[65%] md:w-[35%]">
            Berita Lainnya
          </p>
          <div className="h-[2px] bg-gray-300 w-full ml-4" />
        </div>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 mt-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <Link href={"/news/test"} key={index + "berita"}>
              <CardBerita />
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
