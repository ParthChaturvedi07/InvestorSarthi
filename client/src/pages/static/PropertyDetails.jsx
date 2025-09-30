import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../../api/projectApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  NotepadText,
  Images,
  Info,
  Landmark,
  Home,
  Building2,
  Ruler,
  Wallet,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Map,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Eye,
  Calendar,
  Shield,
} from "lucide-react";

// Skeleton Loader
const PropertyDetailSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-8 animate-pulse">
      <div className="h-12 bg-slate-200 rounded-2xl w-40 mb-6"></div>
      <div className="h-64 bg-white rounded-3xl shadow-md"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  </div>
);

// InfoCard with enhanced design
const InfoCard = ({ icon: Icon, title, children, className = "", gradient = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`${
      gradient 
        ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white' 
        : 'bg-white/95 backdrop-blur'
    } p-8 rounded-3xl shadow-lg border ${
      gradient ? 'border-slate-700' : 'border-slate-200'
    } hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${className}`}
  >
    <div className="flex items-center space-x-4 mb-8">
      <div className={`w-14 h-14 ${
        gradient 
          ? 'bg-white/20 text-white' 
          : 'bg-gradient-to-br from-slate-700 to-slate-900 text-white'
      } rounded-2xl flex items-center justify-center shadow-lg`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className={`text-2xl font-bold ${
        gradient ? 'text-white' : 'text-slate-800'
      }`}>{title}</h3>
    </div>
    <div className={`${
      gradient ? 'text-slate-200' : 'text-slate-600'
    } text-base leading-relaxed font-medium`}>
      {children}
    </div>
  </motion.div>
);

// Enhanced Image Modal
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/98 backdrop-blur-xl flex items-center justify-center z-50 p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-14 h-14 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all flex items-center justify-center backdrop-blur-sm"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-8 w-16 h-16 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-8 w-16 h-16 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <motion.img
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="max-w-[90vw] max-h-[80vh] object-contain rounded-3xl shadow-2xl"
      />

      <div className="absolute bottom-8 bg-slate-900/90 text-white px-8 py-3 rounded-2xl font-semibold backdrop-blur-sm border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

const ProjectDetailsIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  // Contact form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    propertyId: id,
    propertyTitle: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data } = await getProjectById(id);
        setProperty(data);
        setForm((prev) => ({
          ...prev,
          propertyTitle: data?.title || "",
        }));
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess("");
    setFormError("");
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/contact`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFormSuccess(data.message || "Form submitted successfully.");
        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
          propertyId: id,
          propertyTitle: property?.title || "",
        });
      } else {
        setFormError(data.error || "Failed to submit form.");
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const formatPrice = (price) =>
    !price || price === "N/A" ? "Price on request" : price;

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case "Commercial":
        return <Building2 className="w-8 h-8" />;
      case "Residential":
        return <Home className="w-8 h-8" />;
      case "Plot":
        return <Ruler className="w-8 h-8" />;
      default:
        return <Landmark className="w-8 h-8" />;
    }
  };

  if (loading) return <PropertyDetailSkeleton />;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-16 rounded-3xl shadow-2xl border border-slate-200 max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Home className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Property Not Found
          </h2>
          <p className="text-lg text-slate-600 mb-10 font-medium">
            This property doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-800 text-white px-10 py-4 rounded-2xl hover:bg-slate-900 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f9f8f6">
        {property.gallery?.length > 0 && (
          <ImageModal
            isOpen={imageModal.isOpen}
            onClose={() => setImageModal({ isOpen: false, currentIndex: 0 })}
            images={property.gallery}
            currentIndex={imageModal.currentIndex}
            onNext={() =>
              setImageModal((prev) => ({
                ...prev,
                currentIndex: (prev.currentIndex + 1) % property.gallery.length,
              }))
            }
            onPrev={() =>
              setImageModal((prev) => ({
                ...prev,
                currentIndex:
                  prev.currentIndex === 0
                    ? property.gallery.length - 1
                    : prev.currentIndex - 1,
              }))
            }
          />
        )}

        <Navbar />

        <div className="max-w-7xl mx-auto py-20 px-6 md:py-32 md:px-8 space-y-16">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="bg-white/90 backdrop-blur px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center space-x-3 font-semibold text-slate-700 hover:text-slate-900 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Properties</span>
          </motion.button>

          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur p-12 md:p-16 rounded-3xl shadow-2xl border border-slate-200"
          >
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-12">
              {/* Title Section */}
              <div className="flex-1 space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center rounded-3xl shadow-xl">
                    {getProjectTypeIcon(property.type)}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
                      {property.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center">
                      <span className="bg-slate-800 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg">
                        {property.type}
                      </span>
                      {property.location && (
                        <span className="flex items-center text-slate-600 font-semibold gap-3 bg-slate-100 px-6 py-3 rounded-2xl">
                          <MapPin className="w-5 h-5" />
                          {property.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-[300px]">
                {property.area && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-3xl text-center border border-slate-300 shadow-lg"
                  >
                    <Ruler className="w-8 h-8 text-slate-700 mx-auto mb-4" />
                    <p className="text-2xl font-bold text-slate-800 mb-2">
                      {property.area}
                    </p>
                    <p className="text-slate-600 font-semibold">Total Area</p>
                  </motion.div>
                )}
                {property.priceList?.length > 0 && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-center shadow-xl"
                  >
                    <Wallet className="w-8 h-8 text-white mx-auto mb-4" />
                    <p className="text-2xl font-bold text-white mb-2">
                      {formatPrice(property.priceList[0].price)}
                    </p>
                    <p className="text-slate-300 font-semibold">Starting Price</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Gallery with enhanced layout */}
          {property.gallery?.length > 0 && (
            <InfoCard title="Property Gallery" icon={Images}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {property.gallery.slice(0, 8).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-slate-200 group"
                    onClick={() =>
                      setImageModal({ isOpen: true, currentIndex: i })
                    }
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
                {property.gallery.length > 8 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-800 flex items-center justify-center"
                    onClick={() => setImageModal({ isOpen: true, currentIndex: 8 })}
                  >
                    <div className="text-center text-white p-8">
                      <Images className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-2xl font-bold mb-2">+{property.gallery.length - 8}</p>
                      <p className="font-semibold">More Photos</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Overview & Description with better layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            <InfoCard title="Project Overview" icon={Info}>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 font-medium leading-relaxed text-lg">
                  {property.overview}
                </p>
              </div>
            </InfoCard>
            <InfoCard title="Detailed Description" icon={NotepadText} gradient>
              <div className="prose prose-slate prose-invert max-w-none">
                <p className="text-slate-200 font-medium leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>
            </InfoCard>
          </div>

          {/* Enhanced Project Details */}
          <InfoCard icon={ProjectDetailsIcon} title="Project Specifications">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-slate-200">
                  <span className="flex items-center gap-3 text-slate-600 font-semibold">
                    <Building2 className="w-5 h-5" />
                    Property Type
                  </span>
                  <span className="text-slate-800 font-bold text-lg">
                    {property.type}
                  </span>
                </div>
                {property.area && (
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <span className="flex items-center gap-3 text-slate-600 font-semibold">
                      <Ruler className="w-5 h-5" />
                      Total Area
                    </span>
                    <span className="text-slate-800 font-bold text-lg">
                      {property.area}
                    </span>
                  </div>
                )}
                {property.reraNumber && (
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <span className="flex items-center gap-3 text-slate-600 font-semibold">
                      <Shield className="w-5 h-5" />
                      RERA Number
                    </span>
                    <span className="text-slate-800 font-bold text-lg">
                      {property.reraNumber}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                {property.possessionStatus && (
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <span className="flex items-center gap-3 text-slate-600 font-semibold">
                      <Calendar className="w-5 h-5" />
                      Possession Status
                    </span>
                    <span className="text-slate-800 font-bold text-lg">
                      {property.possessionStatus}
                    </span>
                  </div>
                )}
                {property.amenities && (
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <span className="flex items-center gap-3 text-slate-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      Amenities
                    </span>
                    <span className="text-slate-800 font-bold text-lg">
                      {property.amenities.length} Features
                    </span>
                  </div>
                )}
                {property.gallery && (
                  <div className="flex items-center justify-between py-4 border-b border-slate-200">
                    <span className="flex items-center gap-3 text-slate-600 font-semibold">
                      <Images className="w-5 h-5" />
                      Photo Gallery
                    </span>
                    <span className="text-slate-800 font-bold text-lg">
                      {property.gallery.length} Images
                    </span>
                  </div>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Enhanced Price List */}
          {property.priceList?.length > 0 && (
            <InfoCard title="Pricing Details" icon={Wallet} gradient>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/20 border border-slate-600 rounded-xl">
                      <th className="py-6 px-8 text-left font-bold text-white text-lg">
                        Unit Configuration
                      </th>
                      <th className="py-6 px-8 text-left font-bold text-white text-lg">
                        Price Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.priceList.map((item, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-b border-slate-600 hover:bg-white/10 transition-colors"
                      >
                        <td className="py-6 px-8 text-slate-200 font-semibold text-lg">
                          {item.unitType}
                        </td>
                        <td className="py-6 px-8 text-white font-bold text-lg">
                          {formatPrice(item.price)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfoCard>
          )}

          {/* Enhanced Amenities */}
          {property.amenities?.length > 0 && (
            <InfoCard title="Premium Amenities" icon={CheckCircle}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-4 rounded-2xl border border-slate-200 hover:shadow-lg transition-all font-semibold text-slate-700 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-slate-600" />
                    {amenity}
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          )}

          {/* Nearby & Contact with better spacing */}
          <div className="grid lg:grid-cols-2 gap-8">
            {property.nearby?.length > 0 && (
              <InfoCard title="Nearby Landmarks" icon={MapPin}>
                <div className="space-y-4">
                  {property.nearby.map((place, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 rounded-2xl border border-slate-200 font-semibold text-slate-700 flex items-center gap-3 hover:shadow-md transition-all"
                    >
                      <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      {place}
                    </motion.div>
                  ))}
                </div>
              </InfoCard>
            )}

            {property.contact && (
              <InfoCard title="Contact Information" icon={Phone} gradient>
                <div className="space-y-6">
                  {property.contact.phone && (
                    <div className="bg-white/20 px-6 py-4 rounded-2xl flex items-center gap-4 border border-slate-600">
                      <Phone className="w-6 h-6 text-slate-200" />
                      <span className="font-semibold text-white text-lg">
                        {property.contact.phone}
                      </span>
                    </div>
                  )}
                  {property.contact.email && (
                    <div className="bg-white/20 px-6 py-4 rounded-2xl flex items-center gap-4 border border-slate-600">
                      <Mail className="w-6 h-6 text-slate-200" />
                      <span className="font-semibold text-white text-lg">
                        {property.contact.email}
                      </span>
                    </div>
                  )}
                </div>
              </InfoCard>
            )}
          </div>

          {/* Enhanced Map */}
          {property.location && (
            <InfoCard title="Location Map" icon={Map}>
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                  }&q=${encodeURIComponent(property.location)}`}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-96"
                  title="Location Map"
                ></iframe>
              </div>
            </InfoCard>
          )}

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur p-12 rounded-3xl shadow-2xl border border-slate-200"
          >
            {/* Contact Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8">
                Get More Information
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <Mail className="w-6 h-6 text-slate-700 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 mb-2">Email</p>
                  <p className="text-slate-600 text-sm font-semibold">contact@investorsaarthi.com</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <Phone className="w-6 h-6 text-slate-700 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 mb-2">Phone</p>
                  <p className="text-slate-600 text-sm font-semibold">+91 85878 97666</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <MapPin className="w-6 h-6 text-slate-700 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 mb-2">Office</p>
                  <p className="text-slate-600 text-sm font-semibold">D Mall, 2nd floor, Indirapuram</p>
                </div>
              </div>
            </div>

            {/* Enhanced Form */}
            <form className="space-y-8 max-w-2xl mx-auto" onSubmit={handleFormSubmit}>
              {formSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl font-semibold text-center"
                >
                  {formSuccess}
                </motion.div>
              )}
              {formError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl font-semibold text-center"
                >
                  {formError}
                </motion.div>
              )}

              {/* Form Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 bg-slate-50 hover:bg-white"
                    required
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="+91 9876543210"
                    className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 bg-slate-50 hover:bg-white"
                    required
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 bg-slate-50 hover:bg-white"
                    required
                  />
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location || ""}
                    onChange={handleFormChange}
                    placeholder="City / Area you're looking for"
                    className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 bg-slate-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Looking For */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  What are you looking for?
                </label>
                <select
                  name="lookingFor"
                  value={form.lookingFor || ""}
                  onChange={handleFormChange}
                  className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 bg-slate-50 hover:bg-white"
                >
                  <option value="">Select property type</option>
                  <option value="Residential">Residential Property</option>
                  <option value="Commercial">Commercial Space</option>
                  <option value="Plot">Plot/Land</option>
                  <option value="Investment">Investment Opportunity</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Additional Message
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  placeholder="Tell us more about your requirements..."
                  className="w-full border-2 border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 resize-none bg-slate-50 hover:bg-white"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formLoading}
                whileHover={{ scale: formLoading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 rounded-2xl hover:from-slate-900 hover:to-slate-800 transition-all font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {formLoading ? "Sending Message..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetail;