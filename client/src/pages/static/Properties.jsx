import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Properties = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (filter !== "All") {
      filtered = filtered.filter((p) => p.type === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [filter, searchTerm, projects]);

  const formatPrice = (price) => {
    if (!price || price === "N/A") return "Price on request";
    return price;
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <section id="properties" className="py-32 bg-[#f6f5f2]">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            {filter === "All"
              ? "All Properties"
              : filter === "Residential"
              ? "Residential Spaces"
              : filter === "Commercial"
              ? "Commercial Spaces"
              : "Plots"}
          </h2>
          <p className="text-gray-500 mt-2">
            {filter === "All"
              ? "Browse all our curated real estate listings."
              : filter === "Residential"
              ? "Find elegant homes and apartments for comfortable living."
              : filter === "Commercial"
              ? "Discover premium commercial spaces for your business needs."
              : "Explore prime plots to build your dream project."}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 px-4 max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {["All", "Residential", "Commercial", "Plot"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  filter === type
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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

        {/* Properties Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No properties found.
            </div>
          ) : (
            filteredProjects.map((property) => {
              const firstPrice = property.priceList?.[0]?.price || "N/A";
              return (
                <div
                  key={property._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  {property.gallery?.length > 0 ? (
                    <img
                      src={property.gallery[0]}
                      alt={property.title}
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                      {property.title}
                    </h3>

                    {/* Details */}
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <span className="font-medium text-gray-800">
                          • Location:{" "}
                        </span>
                        {property.location || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          • Overview:{" "}
                        </span>
                        {property.overview
                          ? property.overview.length > 80
                            ? property.overview.slice(0, 80) + "..."
                            : property.overview
                          : "Not available"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          • Area:{" "}
                        </span>
                        {property.area || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          • Price:{" "}
                        </span>
                        {formatPrice(firstPrice)}
                      </p>
                    </div>

                    {/* View Button */}
                    <button
                      onClick={() => navigate(`/projects/${property._id}`)}
                      className="mt-4 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Properties;
