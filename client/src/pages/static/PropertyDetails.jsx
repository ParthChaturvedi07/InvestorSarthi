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
} from "lucide-react";

// Skeleton Loader
const PropertyDetailSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-8 animate-pulse">
      <div className="h-12 bg-slate-200 rounded-2xl w-40 mb-6"></div>
      <div className="h-48 bg-white rounded-3xl shadow-md"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 bg-slate-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  </div>
);

// InfoCard
const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`bg-white/95 backdrop-blur p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 text-base leading-relaxed font-medium">
      {children}
    </div>
  </motion.div>
);

// Image Modal
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
      className="fixed inset-0 bg-slate-900/95 backdrop-blur flex items-center justify-center z-50 p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-6 w-16 h-16 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-6 w-16 h-16 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <motion.img
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl"
      />

      <div className="absolute bottom-6 bg-slate-900/80 text-white px-6 py-2 rounded-full font-medium">
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data } = await getProjectById(id);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

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
          className="text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-200"
        >
          <Home className="w-16 h-16 text-slate-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Property Not Found
          </h2>
          <p className="text-lg text-slate-600 mb-8 font-medium">
            This property doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-800 text-white px-8 py-3 rounded-xl hover:bg-slate-900 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

        <div className="max-w-7xl mx-auto py-18 px-8 md:py-28 space-y-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 flex items-center space-x-3 font-medium text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Properties</span>
          </motion.button>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 p-10 rounded-3xl shadow-xl border border-slate-200 backdrop-blur"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Title */}
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center rounded-2xl shadow-lg">
                    {getProjectTypeIcon(property.type)}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                      {property.title}
                    </h1>
                    <div className="flex flex-wrap gap-3 mt-4 items-center">
                      <span className="bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md">
                        {property.type}
                      </span>
                      {property.location && (
                        <span className="flex items-center text-slate-600 font-medium gap-2">
                          <MapPin className="w-4 h-4" />
                          {property.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {property.area && (
                  <div className="bg-slate-100 p-6 rounded-2xl text-center border border-slate-200">
                    <p className="text-2xl font-bold text-slate-800">
                      {property.area}
                    </p>
                    <p className="text-slate-600 font-medium">Total Area</p>
                  </div>
                )}
                {property.priceList?.length > 0 && (
                  <div className="bg-slate-800 p-6 rounded-2xl text-center shadow-lg">
                    <p className="text-2xl font-bold text-white">
                      {formatPrice(property.priceList[0].price)}
                    </p>
                    <p className="text-slate-300 font-medium">Starting Price</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Gallery */}
          {property.gallery?.length > 0 && (
            <InfoCard title="Gallery" icon={Images}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {property.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer rounded-xl overflow-hidden shadow-md border border-slate-200"
                    onClick={() =>
                      setImageModal({ isOpen: true, currentIndex: i })
                    }
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          )}

          {/* Overview & Description */}
          <div className="grid lg:grid-cols-2 gap-8">
            <InfoCard title="Overview" icon={Info}>
              <p className="text-slate-600 font-medium leading-relaxed">
                {property.overview}
              </p>
            </InfoCard>
            <InfoCard title="Description" icon={NotepadText}>
              <p className="text-slate-600 font-medium leading-relaxed">
                {property.description}
              </p>
            </InfoCard>
          </div>

          <InfoCard icon={ProjectDetailsIcon} title="Project Details">
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Type</span>
                <span className="text-slate-800 font-semibold">
                  {property.type}
                </span>
              </div>
              {property.area && (
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Area</span>
                  <span className="text-slate-800 font-semibold">
                    {property.area}
                  </span>
                </div>
              )}
              {property.amenities && (
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Amenities</span>
                  <span className="text-slate-800 font-semibold">
                    {property.amenities.length}
                  </span>
                </div>
              )}
              {property.gallery && (
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Gallery</span>
                  <span className="text-slate-800 font-semibold">
                    {property.gallery.length} photos
                  </span>
                </div>
              )}
              {property.reraNumber && (
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Rera No.</span>
                  <span className="text-slate-800 font-semibold">
                    {property.reraNumber}
                  </span>
                </div>
              )}
              {property.possessionStatus && (
                <div className="flex justify-between py-3">
                  <span className="text-slate-600 font-medium">
                    Possession Status
                  </span>
                  <span className="text-slate-800 font-semibold">
                    {property.possessionStatus}
                  </span>
                </div>
              )}
            </div>
          </InfoCard>

          {/* Price List */}
          {property.priceList?.length > 0 && (
            <InfoCard title="Price List" icon={Wallet}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border border-slate-200">
                      <th className="py-4 px-6 text-left font-semibold text-slate-800">
                        Unit Type
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-slate-800">
                        Price
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
                        className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-6 text-slate-700 font-medium">
                          {item.unitType}
                        </td>
                        <td className="py-4 px-6 text-slate-800 font-bold">
                          {formatPrice(item.price)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfoCard>
          )}

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <InfoCard title="Amenities" icon={CheckCircle}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 hover:shadow-md transition-all font-medium text-slate-700"
                  >
                    {amenity}
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          )}

          {/* Nearby & Contact */}
          <div className="grid lg:grid-cols-2 gap-8">
            {property.nearby?.length > 0 && (
              <InfoCard title="Nearby Places" icon={MapPin}>
                <div className="space-y-3">
                  {property.nearby.map((place, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 font-medium text-slate-700"
                    >
                      {place}
                    </motion.div>
                  ))}
                </div>
              </InfoCard>
            )}

            {property.contact && (
              <InfoCard title="Contact Information" icon={Phone}>
                <div className="space-y-4">
                  {property.contact.phone && (
                    <div className="bg-slate-50 px-4 py-3 rounded-lg flex items-center gap-3 border border-slate-200">
                      <Phone className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-700">
                        {property.contact.phone}
                      </span>
                    </div>
                  )}
                  {property.contact.email && (
                    <div className="bg-slate-50 px-4 py-3 rounded-lg flex items-center gap-3 border border-slate-200">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-700">
                        {property.contact.email}
                      </span>
                    </div>
                  )}
                </div>
              </InfoCard>
            )}
          </div>

          {/* Map */}
          {property.location && (
            <InfoCard title="Location Map" icon={Map}>
              <div className="rounded-xl overflow-hidden border border-slate-200">
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-lg border border-slate-200"
          >
            {/* Contact Info Header */}
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Want to get more Info?
              </h2>
              <div className="space-y-3 text-slate-600">
                <p className="font-medium flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold text-slate-800">
                    Email:
                  </span>{" "}
                  contact@investorsaarthi.com
                </p>
                <p className="font-medium flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold text-slate-800">
                    Phone:
                  </span>{" "}
                  +91 85878 97666, +91 74176 20619
                </p>
                <p className="font-medium flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold text-slate-800">
                    Office:
                  </span>{" "}
                  Investor Saarthi, D Mall, 2nd floor, Indirapuram
                </p>
              </div>
            </div>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone No.
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City / Area looking for"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700"
                />
              </div>

              {/* Looking For */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Looking For
                </label>
                <select className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700">
                  <option value="">Select an option</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none transition-all font-medium text-slate-700 resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetail;
