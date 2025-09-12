import React, { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const css = `
    .CarouselProjects {
      width: 100%;
      height: 400px;
      padding-bottom: 50px !important;
    }
    .CarouselProjects .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 320px;
    }
    .swiper-pagination-bullet {
      background-color: #000 !important;
    }
  `;

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden ">
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative w-full max-w-5xl px-5"
      >
        <style>{css}</style>

        <Swiper
          spaceBetween={0}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="CarouselProjects"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {projects.map((project, index) => (
            <SwiperSlide
              key={index}
              className="rounded-2xl shadow-lg overflow-hidden bg-white"
            >
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-56 w-full object-cover"
                  src={project.gallery?.[0] || "/images/projects/default.png"}
                  alt={project.title}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-600">
                    {project.description || project.overview}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}

          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-black" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-black" />
            </div>
          </div>
        </Swiper>
      </motion.div>
    </div>
  );
};

export default FeaturedProjects;
