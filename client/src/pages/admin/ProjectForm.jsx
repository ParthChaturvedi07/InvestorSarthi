import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject, uploadProjectImages } from "../../api/projectApi";

// ✅ Enhanced Toast component with better styling and animations
const Toast = ({ message, type = "success", onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "error":
        return "bg-gradient-to-r from-red-500 to-red-600 border-red-400";
      case "warning":
        return "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400";
      case "info":
        return "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400";
      default:
        return "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return "⚠️";
      case "warning":
        return "⚡";
      case "info":
        return "ℹ️";
      default:
        return "✅";
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full mx-4 sm:mx-0 transform transition-all duration-300 ease-in-out animate-slide-in`}>
      <div className={`${getToastStyles()} text-white p-4 rounded-xl shadow-2xl border backdrop-blur-sm`}>
        <div className="flex items-start gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5">{getIcon()}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-relaxed break-words">{message}</p>
          </div>
          <button 
            onClick={onClose} 
            className="flex-shrink-0 ml-2 text-white/80 hover:text-white transition-colors duration-200 text-lg font-semibold"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
        {/* Progress bar */}
        <div className="mt-2 w-full bg-white/20 rounded-full h-1">
          <div className="bg-white/60 h-1 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

// ✅ Enhanced Form field wrapper with better error states
const FormField = ({ label, children, required = false, error = null }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-xs font-medium flex items-center gap-1">
        <span>⚠️</span>
        {error}
      </p>
    )}
  </div>
);

// ✅ Reusable input component with enhanced styling
const Input = ({ className = "", error = false, ...props }) => (
  <input
    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
      error 
        ? "border-red-300 bg-red-50 focus:border-red-500" 
        : "border-slate-200 bg-white focus:border-blue-500 hover:border-slate-300"
    } ${className}`}
    {...props}
  />
);

// ✅ Reusable textarea component
const TextArea = ({ className = "", error = false, ...props }) => (
  <textarea
    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 resize-vertical ${
      error 
        ? "border-red-300 bg-red-50 focus:border-red-500" 
        : "border-slate-200 bg-white focus:border-blue-500 hover:border-slate-300"
    } ${className}`}
    {...props}
  />
);

// ✅ Reusable select component
const Select = ({ className = "", error = false, children, ...props }) => (
  <select
    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
      error 
        ? "border-red-300 bg-red-50 focus:border-red-500" 
        : "border-slate-200 bg-white focus:border-blue-500 hover:border-slate-300"
    } ${className}`}
    {...props}
  >
    {children}
  </select>
);

// ✅ Enhanced button component
const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false, 
  className = "", 
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";
      case "danger":
        return "bg-red-500 text-white hover:bg-red-600 border-red-500";
      default:
        return "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-transparent shadow-lg";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm";
      case "lg":
        return "px-6 py-4 text-lg";
      default:
        return "px-4 py-3";
    }
  };

  return (
    <button
      className={`${getSizeStyles()} ${getVariantStyles()} rounded-xl font-medium border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

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
  });

  const [priceInput, setPriceInput] = useState({ unitType: "", price: "" });
  const [amenityInput, setAmenityInput] = useState("");
  const [nearbyInput, setNearbyInput] = useState("");
  const [errors, setErrors] = useState({});

  const [gallery, setGallery] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
  };
  
  const hideToast = () => setToast(null);

  // ✅ Enhanced validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }
    
    if (!formData.type) {
      newErrors.type = "Project type is required";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (formData.contact.email && !/\S+@\S+\.\S+/.test(formData.contact.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.contact.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.contact.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Enhanced change handler with error clearing
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    if (name.includes("contact.")) {
      const field = name.split(".")[1];
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: null }));
      }
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Enhanced price list management
  const addPrice = () => {
    if (!priceInput.unitType.trim() || !priceInput.price.trim()) {
      showToast("Please fill both unit type and price", "error");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      priceList: [...prev.priceList, { ...priceInput }],
    }));
    setPriceInput({ unitType: "", price: "" });
    showToast("Price added successfully", "success");
  };

  const removePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      priceList: prev.priceList.filter((_, i) => i !== index),
    }));
    showToast("Price removed", "info");
  };

  // ✅ Enhanced amenities management
  const addAmenity = () => {
    if (!amenityInput.trim()) {
      showToast("Please enter an amenity", "error");
      return;
    }
    if (formData.amenities.includes(amenityInput.trim())) {
      showToast("This amenity already exists", "warning");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, amenityInput.trim()],
    }));
    setAmenityInput("");
    showToast("Amenity added successfully", "success");
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
    showToast("Amenity removed", "info");
  };

  // ✅ Enhanced nearby management
  const addNearby = () => {
    if (!nearbyInput.trim()) {
      showToast("Please enter a nearby location", "error");
      return;
    }
    if (formData.nearby.includes(nearbyInput.trim())) {
      showToast("This location already exists", "warning");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      nearby: [...prev.nearby, nearbyInput.trim()],
    }));
    setNearbyInput("");
    showToast("Nearby location added successfully", "success");
  };

  const removeNearby = (index) => {
    setFormData((prev) => ({
      ...prev,
      nearby: prev.nearby.filter((_, i) => i !== index),
    }));
    showToast("Nearby location removed", "info");
  };

  // ✅ Enhanced file handling
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 4;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        showToast(`${file.name} is not a supported image format`, "error");
        return false;
      }
      if (file.size > maxSize) {
        showToast(`${file.name} is too large (max 5MB)`, "error");
        return false;
      }
      return true;
    });

    const currentCount = gallery.length + newImages.length;
    const remaining = maxFiles - currentCount;
    
    if (validFiles.length > remaining) {
      showToast(`You can only upload ${remaining} more images (max ${maxFiles})`, "error");
      setNewImages(validFiles.slice(0, remaining));
    } else {
      setNewImages(validFiles);
    }
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  // ✅ Enhanced form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast("Please fix the errors before submitting", "error");
      return;
    }
    
    setSaving(true);
    
    try {
      const { data } = await createProject(formData);
      
      // Upload images if selected
      if (newImages.length > 0) {
        try {
          const fd = new FormData();
          newImages.forEach((f) => fd.append("images", f));
          await uploadProjectImages(data._id, fd);
          showToast("Project created with images successfully!", "success");
        } catch (imageError) {
          console.error("Image upload error:", imageError);
          showToast("Project created but some images failed to upload", "warning");
        }
      } else {
        showToast("Project created successfully!", "success");
      }
      
      setTimeout(() => navigate(`/@dmin-panel/projects/${data._id}`), 2000);
    } catch (err) {
      console.error("Project creation error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to create project";
      showToast(errorMessage, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast notifications */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Create New Project</h1>
            <p className="text-blue-100 mt-2">Fill in the details to create a new project</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField label="Project Title" required error={errors.title}>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    placeholder="Enter project title"
                    required
                  />
                </FormField>
                
                <FormField label="Project Type" required error={errors.type}>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    error={!!errors.type}
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Plot">Plot</option>
                  </Select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField label="Total Area">
                  <Input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g., 1000 sq ft"
                  />
                </FormField>
                
                <FormField label="Location" required error={errors.location}>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    error={!!errors.location}
                    placeholder="Enter project location"
                    required
                  />
                </FormField>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Description
              </h2>
              
              <FormField label="Overview">
                <TextArea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Brief overview of the project"
                  rows="3"
                />
              </FormField>
              
              <FormField label="Detailed Description" required error={errors.description}>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  placeholder="Detailed description of the project"
                  rows="5"
                  required
                />
              </FormField>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Pricing Information
              </h2>
              
              <FormField label="Price List">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Unit Type (e.g., 1 BHK)"
                    value={priceInput.unitType}
                    onChange={(e) =>
                      setPriceInput({ ...priceInput, unitType: e.target.value })
                    }
                    className="flex-1"
                  />
                  <Input
                    type="text"
                    placeholder="Price (e.g., ₹50 Lakhs)"
                    value={priceInput.price}
                    onChange={(e) =>
                      setPriceInput({ ...priceInput, price: e.target.value })
                    }
                    className="flex-1"
                  />
                  <Button type="button" onClick={addPrice} className="sm:w-auto w-full">
                    Add Price
                  </Button>
                </div>
                
                {formData.priceList.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.priceList.map((p, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <span className="text-sm font-medium text-slate-700">
                          <strong>{p.unitType}:</strong> {p.price}
                        </span>
                        <Button 
                          type="button" 
                          variant="danger" 
                          size="sm"
                          onClick={() => removePrice(i)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </FormField>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Features & Location
              </h2>
              
              <FormField label="Amenities">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Enter amenity (e.g., Swimming Pool)"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addAmenity} className="sm:w-auto w-full">
                    Add Amenity
                  </Button>
                </div>
                
                {formData.amenities.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.amenities.map((a, i) => (
                      <span key={i} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {a}
                        <button 
                          type="button" 
                          onClick={() => removeAmenity(i)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </FormField>

              <FormField label="Nearby Locations">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    value={nearbyInput}
                    onChange={(e) => setNearbyInput(e.target.value)}
                    placeholder="Enter nearby location (e.g., Metro Station)"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addNearby} className="sm:w-auto w-full">
                    Add Location
                  </Button>
                </div>
                
                {formData.nearby.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.nearby.map((n, i) => (
                      <span key={i} className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {n}
                        <button 
                          type="button" 
                          onClick={() => removeNearby(i)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </FormField>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField label="Phone Number" error={errors.phone}>
                  <Input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    placeholder="+91 9876543210"
                  />
                </FormField>
                
                <FormField label="Email Address" error={errors.email}>
                  <Input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    placeholder="contact@example.com"
                  />
                </FormField>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Project Gallery
              </h2>
              
              <FormField label={`Upload Images (${newImages.length}/4)`}>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supported formats: JPEG, PNG, WebP. Max size: 5MB per image.
                </p>
                
                {newImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {newImages.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormField>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200">
              <Button
                type="submit"
                disabled={saving}
                size="lg"
                className="w-full"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                      <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Project...
                  </span>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
    </div>
  );
};