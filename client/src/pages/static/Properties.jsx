import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Home, 
  Ruler, 
  IndianRupee, 
  Building2, 
  LandPlot, 
  Eye,
  Filter
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Properties = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
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

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case "Commercial":
        return <Building2 className="w-4 h-4" />;
      case "Residential":
        return <Home className="w-4 h-4" />;
      case "Plot":
        return <LandPlot className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const getFilterDescription = (filterType) => {
    const descriptions = {
      All: "Browse all our curated real estate listings.",
      Residential: "Find elegant homes and apartments for comfortable living.",
      Commercial: "Discover premium commercial spaces for your business needs.",
      Plot: "Explore prime plots to build your dream project."
    };
    return descriptions[filterType];
  };

  const getFilterTitle = (filterType) => {
    const titles = {
      All: "All Properties",
      Residential: "Residential Spaces",
      Commercial: "Commercial Spaces",
      Plot: "Plots"
    };
    return titles[filterType];
  };

  if (loading) {
    return (
      <div className="overflow-x-hidden">
        <Navbar />
        <section className="py-32 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-52 bg-slate-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden ">
      <Navbar />
      <section id="properties" className="py-32 bg-[#f9f8f6]">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-800 mb-6">
            {getFilterTitle(filter)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            {getFilterDescription(filter)}
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 px-4 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <div className="flex flex-wrap gap-3">
              {["All", "Residential", "Commercial", "Plot"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    filter === type
                      ? "bg-slate-800 text-white shadow-lg"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:shadow-md"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:outline-none text-sm font-medium text-slate-700 bg-white"
            />
          </div>
        </motion.div>

        {/* Properties Grid */}
        <div className="max-w-6xl mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 max-w-md mx-auto">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-800 mb-4">No properties found</h3>
                <p className="text-slate-600 font-medium">Try adjusting your search or filter criteria.</p>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((property, index) => {
                const firstPrice = property.priceList?.[0]?.price || "N/A";
                return (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/95 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group border border-slate-200 hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      {property.gallery?.length > 0 ? (
                        <img
                          src={property.gallery[0]}
                          alt={property.title}
                          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-52 bg-slate-200 flex items-center justify-center">
                          <Building2 className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                      
                      {/* Property Type Badge */}
                      {property.type && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                            {getPropertyTypeIcon(property.type)}
                            {property.type}
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center group-hover:text-slate-900 transition-colors">
                        {property.title}
                      </h3>

                      {/* Details */}
                      <div className="text-sm text-slate-600 space-y-3 flex-1">
                        {property.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="font-medium text-slate-800">Location:</span>
                            <span className="font-medium">{property.location}</span>
                          </div>
                        )}
                        
                        {property.overview && (
                          <div className="flex items-start gap-2">
                            <Eye className="w-4 h-4 text-slate-500 mt-0.5" />
                            <div>
                              <span className="font-medium text-slate-800">Overview:</span>
                              <p className="font-medium text-slate-600 mt-1 leading-relaxed">
                                {property.overview.length > 80
                                  ? property.overview.slice(0, 80) + "..."
                                  : property.overview}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {property.area && (
                          <div className="flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-slate-500" />
                            <span className="font-medium text-slate-800">Area:</span>
                            <span className="font-medium">{property.area}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <IndianRupee className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-800">Price:</span>
                          <span className="font-bold text-slate-800">{formatPrice(firstPrice)}</span>
                        </div>
                      </div>

                      {/* View Button */}
                      <button
                        onClick={() => navigate(`/property-details/${property._id}`)}
                        className="mt-6 bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group-hover:bg-slate-900"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Properties;