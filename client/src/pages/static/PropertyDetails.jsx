import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../../api/projectApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Building2,
  Home,
  Ruler,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Calendar,
  Shield,
  CheckCircle2,
  Image as ImageIcon,
  Maximize2,
  DollarSign,
  Info,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const PropertyDetailSkeleton = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 space-y-8 animate-pulse">
      <div className="h-12 bg-slate-200 rounded-xl w-48"></div>
      <div className="aspect-[21/9] bg-slate-200 rounded-2xl"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
);

const ImageGalleryModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center z-50"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-6 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-6 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </>
        )}

        <motion.img
          key={currentIndex}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={images[currentIndex]}
          alt={`Gallery ${currentIndex + 1}`}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        <div className="absolute bottom-8 bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-xl border border-white/20">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const StatCard = ({ icon: Icon, label, value, gradient = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${
      gradient
        ? "bg-gradient-to-br from-slate-800 to-slate-900 text-white"
        : "bg-white border border-slate-200"
    } p-6 rounded-xl shadow-sm hover:shadow-md transition-all`}
  >
    <Icon
      className={`w-6 h-6 mb-3 ${
        gradient ? "text-slate-300" : "text-slate-600"
      }`}
    />
    <div
      className={`text-sm font-medium mb-1 ${
        gradient ? "text-slate-300" : "text-slate-600"
      }`}
    >
      {label}
    </div>
    <div
      className={`text-xl font-bold ${
        gradient ? "text-white" : "text-slate-900"
      }`}
    >
      {value}
    </div>
  </motion.div>
);

const SectionCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
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
        setForm((prev) => ({ ...prev, propertyTitle: data?.title || "" }));
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
          location: "",
          lookingFor: "",
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
        return Building2;
      case "Residential":
        return Home;
      default:
        return Building2;
    }
  };

  if (loading) return <PropertyDetailSkeleton />;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f8f6] ">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-2xl shadow-lg border border-slate-200 max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Property Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            This property doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all font-semibold"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const TypeIcon = getProjectTypeIcon(property.type);

  return (
    <>
      <div className="min-h-screen bg-[#f9f8f6]">
        {property.gallery?.length > 0 && (
          <ImageGalleryModal
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

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 space-y-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Properties
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {property.gallery?.[0] && (
              <div
                className="relative aspect-[21/9] overflow-hidden cursor-pointer group"
                onClick={() => setImageModal({ isOpen: true, currentIndex: 0 })}
              >
                <img
                  src={property.gallery[0]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                      <TypeIcon className="w-5 h-5 inline mr-2" />
                      <span className="font-semibold">{property.type}</span>
                    </div>
                    {property.location && (
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{property.location}</span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold drop-shadow-lg">
                    {property.title}
                  </h1>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {property.area && (
              <StatCard icon={Ruler} label="Total Area" value={property.area} />
            )}
            {property.priceList?.[0] && (
              <StatCard
                icon={DollarSign}
                label="Starting Price"
                value={formatPrice(property.priceList[0].price)}
                gradient
              />
            )}
            {property.possessionStatus && (
              <StatCard
                icon={Calendar}
                label="Possession"
                value={property.possessionStatus}
              />
            )}
            {property.reraNumber && (
              <StatCard
                icon={Shield}
                label="RERA Approved"
                value={property.reraNumber}
              />
            )}
          </div>

          {property.gallery?.length > 1 && (
            <SectionCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-slate-700" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {property.gallery.slice(1, 9).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() =>
                      setImageModal({ isOpen: true, currentIndex: i + 1 })
                    }
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all"></div>
                  </motion.div>
                ))}
                {property.gallery.length > 9 && (
                  <div
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-slate-800 flex items-center justify-center text-white"
                    onClick={() =>
                      setImageModal({ isOpen: true, currentIndex: 9 })
                    }
                  >
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-xl font-bold">
                        +{property.gallery.length - 9}
                      </p>
                      <p className="text-sm">More</p>
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {property.overview && (
                <SectionCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Info className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Overview
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {property.overview}
                  </p>
                </SectionCard>
              )}

              {property.description && (
                <SectionCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Description
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {property.description}
                  </p>
                </SectionCard>
              )}

              {property.priceList?.length > 0 && (
                <SectionCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Pricing
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {property.priceList.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                      >
                        <span className="font-semibold text-slate-900">
                          {item.unitType}
                        </span>
                        <span className="text-lg font-bold text-slate-900">
                          {formatPrice(item.price)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {property.amenities?.length > 0 && (
                <SectionCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Amenities
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">
                          {amenity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {property.nearby?.length > 0 && (
                <SectionCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Nearby Landmarks
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {property.nearby.map((place, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">
                          {place}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {property.location && (
                <SectionCard>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Location
                    </h2>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                      }&q=${encodeURIComponent(property.location)}`}
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-80"
                      title="Location Map"
                    ></iframe>
                  </div>
                </SectionCard>
              )}
            </div>

            <div className="space-y-8">
              <SectionCard className="sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Contact Us
                  </h2>
                </div>

                {formSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl"
                  >
                    {formSuccess}
                  </motion.div>
                )}

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl"
                  >
                    {formError}
                  </motion.div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleFormChange}
                      placeholder="City / Area looking for "
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                  {/* Looking For */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Looking For
                    </label>
                    <select
                      name="lookingFor"
                      value={form.lookingFor}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Plot">Plot</option>
                      <option value="Investment">Investment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your requirements..."
                      rows="4"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {formLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                  {property.contact?.phone && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <Phone className="w-5 h-5 text-slate-600" />
                      <span className="font-medium">
                        {property.contact.phone}
                      </span>
                    </div>
                  )}
                  {property.contact?.email && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <span className="font-medium">
                        {property.contact.email}
                      </span>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetail;
