import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../../api/projectApi";

// Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const ProjectDetailsSkeleton = () => (
  <div className="max-w-5xl mx-auto p-6 space-y-8 animate-pulse">
    {/* Back Button Skeleton */}
    <div className="h-10 bg-slate-200 rounded w-24"></div>

    {/* Title Skeleton */}
    <div className="space-y-2">
      <div className="h-8 bg-slate-200 rounded w-2/3"></div>
      <div className="h-6 bg-slate-200 rounded w-32"></div>
    </div>

    {/* Gallery Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-48 bg-slate-200 rounded-lg"></div>
      ))}
    </div>

    {/* Content Skeleton */}
    <div className="space-y-4">
      <div className="h-6 bg-slate-200 rounded w-32"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

// Image Modal Component
const ImageModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Gallery ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg"
        />

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} of {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, title, children, className = "" }) => (
  <div
    className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data } = await getProjectById(id);
        setProject(data);
        showToast("Project loaded successfully", "success");
      } catch (error) {
        console.error("Error fetching project:", error);
        showToast("Failed to load project details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const openImageModal = (index) => {
    setImageModal({ isOpen: true, currentIndex: index });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, currentIndex: 0 });
  };

  const nextImage = () => {
    setImageModal((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % project.gallery.length,
    }));
  };

  const prevImage = () => {
    setImageModal((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? project.gallery.length - 1
          : prev.currentIndex - 1,
    }));
  };

  const getProjectTypeIcon = (type) => {
    const icons = {
      Commercial: "🏢",
      Residential: "🏠",
      Plot: "📐",
    };
    return icons[type] || "🏗️";
  };

  const formatPrice = (price) => {
    if (!price || price === "N/A") return "Price on request";
    return price;
  };

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Project Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Image Modal */}
      {project.gallery?.length > 0 && (
        <ImageModal
          isOpen={imageModal.isOpen}
          onClose={closeImageModal}
          images={project.gallery}
          currentIndex={imageModal.currentIndex}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header with Back Button and Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/80 backdrop-blur-sm text-slate-700 px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium border border-white/20"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Projects</span>
            </div>
          </button>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigate(`/@dmin-panel/projects/${project._id}/edit`)
              }
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Edit Project</span>
              </div>
            </button>
          </div>
        </div>

        {/* Title & Type Section */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">
                  {getProjectTypeIcon(project.type)}
                </span>
                <div>
                  <h1 className="text-4xl font-bold text-slate-800">
                    {project.title}
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                    {project.location && (
                      <span className="text-slate-600 flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{project.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col md:flex-row gap-4">
              {project.area && (
                <div className="bg-slate-100/50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-slate-800">
                    {project.area}
                  </p>
                  <p className="text-sm text-slate-600">Total Area</p>
                </div>
              )}
              {project.priceList?.length > 0 && (
                <div className="bg-green-100/50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-700">
                    {formatPrice(project.priceList[0].price)}
                  </p>
                  <p className="text-sm text-green-600">Starting Price</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery?.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Gallery</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {project.gallery.length} photos
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => openImageModal(i)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview & Description */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Overview</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">{project.overview}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              <span>Description</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Key Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          {project.contact && (
            <InfoCard
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              title="Contact Information"
            >
              <div className="space-y-3">
                {project.contact.phone && (
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-slate-700">
                      {project.contact.phone}
                    </span>
                  </div>
                )}
                {project.contact.email && (
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-slate-700">
                      {project.contact.email}
                    </span>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Nearby Places */}
          {project.nearby?.length > 0 && (
            <InfoCard
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              title="Nearby Places"
            >
              <div className="space-y-2">
                {project.nearby.map((place, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">{place}</span>
                  </div>
                ))}
              </div>
            </InfoCard>
          )}

          {/* Project Stats */}
          <InfoCard
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            title="Project Details"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Type</span>
                <span className="text-slate-800 font-medium">
                  {project.type}
                </span>
              </div>
              {project.area && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Area</span>
                  <span className="text-slate-800 font-medium">
                    {project.area}
                  </span>
                </div>
              )}
              {project.amenities && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Amenities</span>
                  <span className="text-slate-800 font-medium">
                    {project.amenities.length}
                  </span>
                </div>
              )}
              {project.gallery && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Gallery</span>
                  <span className="text-slate-800 font-medium">
                    {project.gallery.length} photos
                  </span>
                </div>
              )}
            </div>
          </InfoCard>
        </div>

        {/* Price List */}
        {project.priceList?.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span>Price List</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                    <th className="py-4 px-6 text-left font-semibold text-slate-700 rounded-l-xl">
                      Unit Type
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-slate-700 rounded-r-xl">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {project.priceList.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        {item.unitType}
                      </td>
                      <td className="py-4 px-6 text-green-700 font-semibold">
                        {formatPrice(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Amenities */}
        {project.amenities?.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span>Amenities</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {project.amenities.length} amenities
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                  <span className="text-slate-700 font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Map */}
        {project.locationMap && (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span>Location Map</span>
            </h2>

            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={project.locationMap}
                title="Location Map"
                className="w-full h-96 border-0"
                allowFullScreen
                loading="lazy"
                style={{ filter: "contrast(1.1) saturate(1.1)" }}
              ></iframe>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              navigate(`/@dmin-panel/projects/${project._id}/edit`)
            }
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit This Project</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/@dmin-panel/projects")}
            className="bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium border border-white/20"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>View All Projects</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
