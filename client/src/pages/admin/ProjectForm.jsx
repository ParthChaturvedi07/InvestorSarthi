import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject, uploadProjectImages } from "../../api/projectApi";

// Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Form Field Component
const FormField = ({ label, children, required = false, description = null }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {description && (
      <p className="text-xs text-slate-500">{description}</p>
    )}
    {children}
  </div>
);

// Section Card Component
const SectionCard = ({ icon, title, description, children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8 ${className}`}>
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {description && <p className="text-slate-500">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

// List Item Component
const ListItem = ({ children, onRemove, index }) => (
  <div className="flex items-center justify-between bg-slate-50/50 px-4 py-2 rounded-xl border border-slate-200/50">
    <span className="text-slate-700 text-sm">{children}</span>
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export const ProjectForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    overview: "",
    description: "",
    area: "",
    location: "",
    priceList: [],
    amenities: [],
    nearby: [],
    contact: { phone: "", email: "" },
    locationMap: ""
  });

  const [priceInput, setPriceInput] = useState({ unitType: "", price: "" });
  const [amenityInput, setAmenityInput] = useState("");
  const [nearbyInput, setNearbyInput] = useState("");

  const [newImages, setNewImages] = useState([]);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const showToast = (msg, type = "success") => setToast({ message: msg, type });
  const hideToast = () => setToast(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Price list management
  const addPrice = () => {
    if (!priceInput.unitType.trim() || !priceInput.price.trim()) {
      showToast("Please fill in both unit type and price", "error");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      priceList: [...prev.priceList, { ...priceInput, _id: Date.now() }],
    }));
    setPriceInput({ unitType: "", price: "" });
    showToast("Price added successfully");
  };

  const removePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      priceList: prev.priceList.filter((_, i) => i !== index),
    }));
    showToast("Price removed");
  };

  // Amenities management
  const addAmenity = () => {
    if (!amenityInput.trim()) {
      showToast("Please enter an amenity", "error");
      return;
    }
    if (formData.amenities.includes(amenityInput.trim())) {
      showToast("This amenity is already added", "error");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, amenityInput.trim()],
    }));
    setAmenityInput("");
    showToast("Amenity added successfully");
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
    showToast("Amenity removed");
  };

  // Nearby places management
  const addNearby = () => {
    if (!nearbyInput.trim()) {
      showToast("Please enter a nearby place", "error");
      return;
    }
    if (formData.nearby.includes(nearbyInput.trim())) {
      showToast("This place is already added", "error");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      nearby: [...prev.nearby, nearbyInput.trim()],
    }));
    setNearbyInput("");
    showToast("Nearby place added successfully");
  };

  const removeNearby = (index) => {
    setFormData((prev) => ({
      ...prev,
      nearby: prev.nearby.filter((_, i) => i !== index),
    }));
    showToast("Nearby place removed");
  };

  // Handle gallery files
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 4;
    
    if (files.length > maxImages) {
      showToast(`You can only upload ${maxImages} images maximum`, "error");
      return;
    }
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      showToast("Only JPG, PNG, and WebP files are allowed", "error");
      return;
    }
    
    // Validate file sizes (5MB max per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      showToast("Each image must be smaller than 5MB", "error");
      return;
    }
    
    setNewImages(files);
    showToast(`${files.length} image(s) selected for upload`);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      showToast("Project title is required", "error");
      setActiveSection("basic");
      return;
    }
    if (!formData.type) {
      showToast("Project type is required", "error");
      setActiveSection("basic");
      return;
    }
    if (!formData.location.trim()) {
      showToast("Location is required", "error");
      setActiveSection("basic");
      return;
    }
    if (!formData.description.trim()) {
      showToast("Description is required", "error");
      setActiveSection("basic");
      return;
    }
    
    setSaving(true);
    
    try {
      const { data } = await createProject(formData);
      
      // Upload images if selected
      if (newImages.length > 0) {
        const fd = new FormData();
        newImages.forEach((file) => fd.append("images", file));
        await uploadProjectImages(data._id, fd);
        showToast(`Project created with ${newImages.length} images!`, "success");
      } else {
        showToast("Project created successfully!", "success");
      }
      
      setTimeout(() => navigate(`/@dmin-panel/projects/${data._id}`), 2000);
    } catch (err) {
      console.error(err);
      showToast("Failed to create project. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const getProjectTypeIcon = (type) => {
    const icons = {
      Commercial: "🏢",
      Residential: "🏠", 
      Plot: "📐"
    };
    return icons[type] || "🏗️";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/80 backdrop-blur-sm text-slate-700 px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium border border-white/20"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </div>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Create New Project</h1>
                <p className="text-slate-500">Add a new real estate project to your portfolio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="font-medium text-slate-800">Basic Info</span>
              </div>
              <div className="w-8 h-0.5 bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-slate-300 text-slate-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-slate-600">Details</span>
              </div>
              <div className="w-8 h-0.5 bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-slate-300 text-slate-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-slate-600">Review</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <SectionCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Basic Information"
            description="Essential project details and overview"
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Project Title" required description="A clear, descriptive name for your project">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="Enter project title"
                    required
                  />
                </FormField>

                <FormField label="Project Type" required description="Select the category that best describes your project">
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none"
                      required
                    >
                      <option value="">Select project type</option>
                      <option value="Commercial">🏢 Commercial</option>
                      <option value="Residential">🏠 Residential</option>
                      <option value="Plot">📐 Plot</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </FormField>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Total Area" description="e.g., 1500 sq ft, 2 acres, 500 sq meters">
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="Enter total area"
                  />
                </FormField>

                <FormField label="Location" required description="City, state, or complete address">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="Enter project location"
                    required
                  />
                </FormField>
              </div>

              <FormField label="Project Overview" description="A brief, compelling summary (1-2 sentences)">
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="Provide a brief overview that captures the essence of your project..."
                />
              </FormField>

              <FormField label="Detailed Description" required description="Comprehensive description with all important details">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="Provide detailed description including features, specifications, unique selling points..."
                  required
                />
              </FormField>
            </div>
          </SectionCard>

          {/* Pricing Section */}
          <SectionCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            title="Pricing Information"
            description="Add pricing for different unit types"
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Unit Type (e.g., 1 BHK, 2 BHK, Studio)"
                  value={priceInput.unitType}
                  onChange={(e) => setPriceInput({ ...priceInput, unitType: e.target.value })}
                  className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 placeholder-slate-400"
                />
                <input
                  type="text"
                  placeholder="Price (e.g., ₹50 Lakhs, $200,000)"
                  value={priceInput.price}
                  onChange={(e) => setPriceInput({ ...priceInput, price: e.target.value })}
                  className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={addPrice}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add</span>
                  </div>
                </button>
              </div>

              {formData.priceList.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Price List ({formData.priceList.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {formData.priceList.map((price, i) => (
                      <ListItem key={i} onRemove={removePrice} index={i}>
                        <strong>{price.unitType}:</strong> {price.price}
                      </ListItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Amenities Section */}
          <SectionCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
            title="Amenities & Features"
            description="List the amenities and features available"
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter amenity (e.g., Swimming Pool, Gym, Parking)"
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add</span>
                  </div>
                </button>
              </div>

              {formData.amenities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Amenities ({formData.amenities.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {formData.amenities.map((amenity, i) => (
                      <ListItem key={i} onRemove={removeAmenity} index={i}>
                        {amenity}
                      </ListItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Location & Nearby Section */}
          <SectionCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Location Details"
            description="Add nearby places and location map"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nearby place (e.g., Metro Station, Hospital, School)"
                    value={nearbyInput}
                    onChange={(e) => setNearbyInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={addNearby}
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add</span>
                    </div>
                  </button>
                </div>

                {formData.nearby.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-700 flex items-center space-x-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Nearby Places ({formData.nearby.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {formData.nearby.map((place, i) => (
                        <ListItem key={i} onRemove={removeNearby} index={i}>
                          {place}
                        </ListItem>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <FormField label="Location Map (Optional)" description="Google Maps embed URL or iframe src">
                <input
                  type="url"
                  name="locationMap"
                  value={formData.locationMap}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                  placeholder="Paste Google Maps embed URL"
                />
              </FormField>
            </div>
          </SectionCard>

          {/* Contact Information Section */}
          <SectionCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            title="Contact Information"
            description="Add contact details for inquiries"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Phone Number" description="Primary contact number for inquiries">
                <div className="relative">
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="+1 (555) 123-4567"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </FormField>

              <FormField label="Email Address" description="Email for project inquiries">
                <div className="relative">
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="contact@example.com"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </FormField>
            </div>
          </SectionCard>

          {/* Gallery Section */}
          <SectionCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title="Project Gallery"
            description="Upload images to showcase your project (max 4 images)"
          >
            <div className="space-y-6">
              {/* File Upload Area */}
              <div className="relative">
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-slate-50/50">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">
                        Drop your images here
                      </h3>
                      <p className="text-slate-500 text-sm mb-4">
                        or click to browse from your computer
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {newImages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Selected Images ({newImages.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {newImages.map((file, idx) => (
                      <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/90 p-2 rounded-lg max-w-24">
                            <p className="text-xs text-slate-700 font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {(file.size / 1024 / 1024).toFixed(1)}MB
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNewImages([]);
                      const fileInput = document.querySelector('input[type="file"]');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="bg-slate-100 text-slate-700 py-2 px-4 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
              )}

              {/* Upload Guidelines */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Upload Guidelines:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Maximum 4 images per project</li>
                      <li>• Supported formats: JPG, PNG, WebP</li>
                      <li>• Recommended size: 1200x800px or higher</li>
                      <li>• Maximum file size: 5MB per image</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Submit Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-slate-800">Ready to Create Your Project?</h3>
              <p className="text-slate-600">Review your information and create your project listing.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg font-medium"
                >
                  {saving ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Project...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Create Project</span>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/@dmin-panel/projects")}
                  className="bg-slate-100 text-slate-700 py-4 px-8 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{formData.priceList.length}</div>
                  <div className="text-sm text-slate-500">Price Options</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{formData.amenities.length}</div>
                  <div className="text-sm text-slate-500">Amenities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{formData.nearby.length}</div>
                  <div className="text-sm text-slate-500">Nearby Places</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{newImages.length}</div>
                  <div className="text-sm text-slate-500">Images Selected</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};