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
import { useNavigate } from "react-router-dom";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data.slice(0, 6)); // limit to 6 projects
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const css = `
    .CarouselProjects {
      width: 100%;
      height: 450px;
      padding-bottom: 60px !important;
    }
    .CarouselProjects .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 340px;
    }
    .swiper-pagination-bullet {
      background-color: rgb(51 65 85) !important;
      width: 12px !important;
      height: 12px !important;
      opacity: 0.7 !important;
    }
    .swiper-pagination-bullet-active {
      background-color: rgb(15 23 42) !important;
      opacity: 1 !important;
    }
    .swiper-button-next,
    .swiper-button-prev {
      background-color: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(4px) !important;
      width: 48px !important;
      height: 48px !important;
      border-radius: 12px !important;
      border: 1px solid rgb(226 232 240) !important;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
      transition: all 0.3s ease !important;
    }
    .swiper-button-next:hover,
    .swiper-button-prev:hover {
      background-color: rgb(255, 255, 255) !important;
      transform: scale(1.05) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    }
  `;

  const formatPrice = (priceList) => {
    if (!priceList || priceList.length === 0) return "Price on Request";
    const firstPrice = priceList[0].price;
    return firstPrice === "N/A" ? "Price on Request" : firstPrice;
  };

  const getPropertyType = (type) => {
    const typeColors = {
      Residential: "bg-slate-600 text-white",
      Commercial: "bg-slate-800 text-white",
      Plot: "bg-slate-700 text-white",
    };
    return typeColors[type] || "bg-slate-500 text-white";
  };

  return (
    <div className="flex w-full items-center justify-center overflow-hidden py-12">
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative w-full max-w-6xl px-6"
      >
        <style>{css}</style>


        <Swiper
          key={projects.length} 
          spaceBetween={0}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
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
              className="rounded-2xl shadow-lg overflow-hidden bg-white/95 backdrop-blur border border-slate-200 cursor-pointer"
              onClick={() => {
                Navigate("/properties");
              }}
            >
              <div className="group transition-all duration-300 hover:shadow-xl">
                <div className="relative overflow-hidden">
                  <img
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={project.gallery?.[0] || "/images/projects/default.png"}
                    alt={project.title}
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Property type badge */}
                  {project.type && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPropertyType(project.type)} shadow-md`}>
                        {project.type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4 font-medium leading-relaxed min-h-[2.5rem]">
                    {(project.description || project.overview || "Premium property with modern amenities").substring(0, 120)}
                    {(project.description || project.overview || "").length > 120 ? "..." : ""}
                  </p>

                  {/* Property details */}
                  <div className="space-y-3">
                    {project.location && (
                      <div className="flex items-center text-slate-600 text-sm">
                        <span className="mr-2">📍</span>
                        <span className="font-medium">{project.location}</span>
                      </div>
                    )}

                    {project.area && (
                      <div className="flex items-center text-slate-600 text-sm">
                        <span className="mr-2">📐</span>
                        <span className="font-medium">{project.area}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="text-slate-800 font-bold text-lg">
                        {formatPrice(project.priceList)}
                      </div>
                      <div className="text-slate-500 text-xs font-medium">
                        Starting from
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-slate-700" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-slate-700" />
            </div>
          </div>
        </Swiper>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => Navigate("/properties")}
            className="bg-slate-800 text-white px-8 py-4 rounded-xl hover:bg-slate-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Properties
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturedProjects;