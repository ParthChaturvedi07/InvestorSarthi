import React, { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";

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
const ProjectSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-slate-200"></div>
    <div className="p-6 space-y-3">
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-slate-200 rounded w-16"></div>
        <div className="h-8 bg-slate-200 rounded w-16"></div>
        <div className="h-8 bg-slate-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, projectTitle }) => {
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
            Delete Project
          </h3>
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete "
            <span className="font-medium text-slate-800">{projectTitle}</span>"?
            This action cannot be undone.
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

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    project: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
        showToast(`Loaded ${data.length} projects successfully`, "success");
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        showToast("Failed to load projects. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and search handler
  useEffect(() => {
    let filtered = projects;

    // Apply type filter
    if (filter !== "All") {
      filtered = filtered.filter((p) => p.type === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [filter, searchTerm, projects]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const openDeleteModal = (project) => {
    setDeleteModal({ isOpen: true, project });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, project: null });
  };

  const handleDelete = async () => {
    try {
      const projectId = deleteModal.project._id;
      const projectTitle = deleteModal.project.title;

      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      setFilteredProjects((prev) => prev.filter((p) => p._id !== projectId));

      showToast(`"${projectTitle}" deleted successfully`, "success");
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete project:", error);
      showToast("Failed to delete project. Please try again.", "error");
    }
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
    return (
      <div className="space-y-8">
        {/* Loading Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-64 animate-pulse"></div>
        </div>

        {/* Loading Filters */}
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 bg-slate-200 rounded w-20 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Loading Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        projectTitle={deleteModal.project?.title}
      />

      {/* Header with Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
            <p className="text-sm text-slate-500">
              {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
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
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {["All", "Commercial", "Residential", "Plot"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={`px-6 py-3 rounded-xl border-2 transition-all duration-200 font-medium transform hover:scale-105 ${
              filter === type
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg"
                : "bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <div className="flex items-center space-x-2">
              {type !== "All" && <span>{getProjectTypeIcon(type)}</span>}
              <span>{type}</span>
              {filter === type && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {type === "All"
                    ? projects.length
                    : projects.filter((p) => p.type === type).length}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Add New Project Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/@dmin-panel/projects/create")}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add New Project</span>
          </div>
        </button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No projects found
          </h3>
          <p className="text-slate-500 mb-6">
            {searchTerm || filter !== "All"
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first project"}
          </p>
          {!searchTerm && filter === "All" && (
            <button
              onClick={() => navigate("/@dmin-panel/projects/new")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
            >
              Add Your First Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const firstPrice = project.priceList?.[0]?.price || "N/A";
            return (
              <div
                key={project._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                {/* Image with Overlay */}
                <div className="relative">
                  {project.gallery?.length > 0 ? (
                    <img
                      src={project.gallery[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <div className="text-center text-slate-500">
                        <svg
                          className="w-16 h-16 mx-auto mb-2"
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
                        <p className="text-sm">No Image</p>
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <span>{getProjectTypeIcon(project.type)}</span>
                    <span>{project.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                      {project.title}
                    </h3>

                    {/* Location */}
                    {project.location && (
                      <div className="flex items-center text-slate-600">
                        <svg
                          className="w-4 h-4 mr-2 text-slate-400"
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
                        <span className="text-sm">{project.location}</span>
                      </div>
                    )}

                    {/* Area */}
                    {project.area && (
                      <div className="flex items-center text-slate-600">
                        <svg
                          className="w-4 h-4 mr-2 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                        <span className="text-sm">{project.area}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center text-green-700">
                      <svg
                        className="w-4 h-4 mr-2 text-green-600"
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
                      <span className="text-sm font-semibold">
                        {formatPrice(firstPrice)}
                      </span>
                    </div>

                    {/* Short overview */}
                    {project.overview && (
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {project.overview}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/@dmin-panel/projects/${project._id}`)
                      }
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg"
                    >
                      <div className="flex items-center justify-center space-x-1">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>View</span>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/@dmin-panel/projects/${project._id}/edit`)
                      }
                      className="bg-amber-500 text-white py-2 px-4 rounded-xl hover:bg-amber-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => openDeleteModal(project)}
                      className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
