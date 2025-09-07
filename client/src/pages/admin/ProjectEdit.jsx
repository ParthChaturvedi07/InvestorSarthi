import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectById,
  updateProject,
  uploadProjectImages,
  removeProjectImage,
} from "../../api/projectApi";

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
const EditSkeleton = () => (
  <div className="max-w-5xl mx-auto p-6 space-y-8 animate-pulse">
    {/* Header */}
    <div className="space-y-4">
      <div className="h-10 bg-slate-200 rounded w-24"></div>
      <div className="h-8 bg-slate-200 rounded w-48"></div>
    </div>

    {/* Form Fields */}
    <div className="space-y-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          <div className="h-12 bg-slate-200 rounded w-full"></div>
        </div>
      ))}
    </div>

    {/* Gallery */}
    <div className="space-y-4">
      <div className="h-6 bg-slate-200 rounded w-32"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

// Delete Confirmation Modal
const DeleteImageModal = ({ isOpen, onClose, onConfirm, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Delete Image
          </h3>
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete this image? This action cannot be
            undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Field Component
const FormField = ({
  label,
  children,
  required = false,
  description = null,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {description && <p className="text-xs text-slate-500">{description}</p>}
    {children}
  </div>
);

export const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    overview: "",
    description: "",
    area: "",
    location: "",
  });

  const [gallery, setGallery] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    imageUrl: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Fetch project on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data } = await getProjectById(id);
        setFormData({
          title: data.title || "",
          type: data.type || "",
          overview: data.overview || "",
          description: data.description || "",
          area: data.area || "",
          location: data.location || "",
        });
        setGallery(data.gallery || []);
        showToast("Project loaded successfully", "success");
      } catch (err) {
        console.error(err);
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

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save basic details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProject(id, formData);
      showToast("Project updated successfully!", "success");
      setTimeout(() => navigate(`/@dmin-panel/projects/${id}`), 2000);
    } catch (err) {
      console.error(err);
      showToast("Failed to update project. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Handle image selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 4 - gallery.length;

    if (files.length > maxImages) {
      showToast(
        `You can only upload ${maxImages} more images (max 4 total)`,
        "error"
      );
      return;
    }

    setNewImages(files);
  };

  // Upload new images
  const handleUpload = async () => {
    if (newImages.length === 0) return;
    setUploading(true);

    try {
      const formDataUpload = new FormData();
      newImages.forEach((file) => formDataUpload.append("images", file));

      const { data } = await uploadProjectImages(id, formDataUpload);
      setGallery(data.gallery);
      setNewImages([]);
      showToast(
        `${newImages.length} image(s) uploaded successfully!`,
        "success"
      );

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      showToast(
        "Failed to upload images. Check limits (max 4 total).",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  // Open delete modal
  const openDeleteModal = (imageUrl) => {
    setDeleteModal({ isOpen: true, imageUrl });
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, imageUrl: null });
  };

  // Delete image from gallery
  const handleDeleteImage = async () => {
    try {
      const { data } = await removeProjectImage(id, {
        imageUrl: deleteModal.imageUrl,
      });
      setGallery(data.gallery);
      showToast("Image removed successfully!", "success");
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete image.", "error");
    }
  };

  if (loading) {
    return <EditSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Delete Image Modal */}
      <DeleteImageModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteImage}
        imageUrl={deleteModal.imageUrl}
      />

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
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
                <span>Back</span>
              </div>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Edit Project
                </h1>
                <p className="text-slate-500">
                  Update project details and manage gallery
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Changes are saved automatically</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("basic")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "basic"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Basic Details</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "gallery"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Gallery</span>
                {gallery.length > 0 && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {gallery.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Basic Details Tab */}
        {activeTab === "basic" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg
                  className="w-6 h-6"
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
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Project Information
                </h2>
                <p className="text-slate-500">
                  Update the basic details of your project
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Project Title" required>
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

                <FormField label="Project Type" required>
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
                    <svg
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </FormField>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Total Area"
                  description="e.g., 1500 sq ft, 2 acres"
                >
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="Enter total area"
                  />
                </FormField>

                <FormField
                  label="Location"
                  description="City, state or full address"
                >
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
                    placeholder="Enter project location"
                  />
                </FormField>
              </div>

              <FormField
                label="Project Overview"
                description="Brief summary of the project (1-2 sentences)"
              >
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="Provide a brief overview of the project..."
                />
              </FormField>

              <FormField
                label="Detailed Description"
                description="Comprehensive description with all project details"
              >
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="Provide detailed description including features, amenities, specifications..."
                />
              </FormField>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg font-medium"
                >
                  {saving ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving Changes...</span>
                    </div>
                  ) : (
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
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span>Save Changes</span>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/@dmin-panel/projects/${id}`)}
                  className="bg-white/80 backdrop-blur-sm text-slate-700 py-4 px-6 rounded-xl hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium border border-white/20"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Preview Project</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Current Gallery */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Current Gallery
                    </h2>
                    <p className="text-slate-500">
                      {gallery.length} of 4 images • Click on image to delete
                    </p>
                  </div>
                </div>

                <div className="bg-slate-100/50 px-4 py-2 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">
                    {gallery.length}/4 images
                  </span>
                </div>
              </div>

              {gallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => openDeleteModal(img)}
                          className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-200 transform hover:scale-110 shadow-lg"
                        >
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-slate-400"
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
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    No images in gallery
                  </h3>
                  <p className="text-slate-500">
                    Add some images to showcase your project
                  </p>
                </div>
              )}
            </div>

            {/* Upload new images */}
            <div className="space-y-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500"
              />

              {/* Preview */}
              {newImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newImages.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-28 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                disabled={uploading || newImages.length === 0}
                onClick={handleUpload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
