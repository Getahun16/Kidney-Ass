"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

export default function PartnerSlider() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partner");
        if (!res.ok) throw new Error("Failed to fetch partners");
        const data = await res.json();

        if (Array.isArray(data)) {
          setPartners(data);
        } else {
          console.error("Unexpected response:", data);
          setPartners([]);
        }
      } catch (err) {
        console.error("Partner fetch error:", err);
        setPartners([]);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-lime-700 mb-8">
          Our Partners
        </h2>

        {partners.length === 0 ? (
          <p className="text-gray-500">No partners found.</p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              640: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 40 },
            }}
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="flex flex-col items-center justify-center h-32">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={60}
                    className="object-contain grayscale hover:grayscale-0 transition duration-300 rounded"
                  />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    {partner.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
