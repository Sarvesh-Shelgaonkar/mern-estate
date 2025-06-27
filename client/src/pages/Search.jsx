import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaFilter, 
  FaHome, 
  FaParking, 
  FaChair, 
  FaTags, 
  FaSortAmountDown,
  FaMapMarkerAlt,
  FaThLarge,
  FaList,
  FaTimes,
  FaCog
} from "react-icons/fa";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Search Section */}
      <div className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 animate-fadeInUp">
            Find Your Perfect Home
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Discover amazing properties that match your lifestyle
          </p>
          
          {/* Main Search Bar */}
          <div className="glass rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search by location, property name..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2"
              >
                <FaSearch className="w-5 h-5" />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full glass rounded-xl p-4 flex items-center justify-center space-x-2"
            >
              <FaFilter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters ? <FaTimes className="w-4 h-4" /> : <FaCog className="w-4 h-4" />}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="glass rounded-2xl p-6 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <FaFilter className="w-5 h-5 text-blue-500" />
                <span>Filters</span>
              </h3>

              {/* Property Type */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
                  <FaHome className="w-4 h-4 text-blue-500" />
                  <span>Property Type</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Properties' },
                    { id: 'rent', label: 'For Rent' },
                    { id: 'sale', label: 'For Sale' }
                  ].map((type) => (
                    <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        id={type.id}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        onChange={handleChange}
                        checked={sidebardata.type === type.id}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Amenities</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="parking"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                      onChange={handleChange}
                      checked={sidebardata.parking}
                    />
                    <FaParking className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Parking Available</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="furnished"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                      onChange={handleChange}
                      checked={sidebardata.furnished}
                    />
                    <FaChair className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">Furnished</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="offer"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                      onChange={handleChange}
                      checked={sidebardata.offer}
                    />
                    <FaTags className="w-4 h-4 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Special Offers</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
                  <FaSortAmountDown className="w-4 h-4 text-blue-500" />
                  <span>Sort By</span>
                </h4>
                <select
                  onChange={handleChange}
                  value={`${sidebardata.sort}_${sidebardata.order}`}
                  id="sort_order"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="regularPrice_desc">Price: High to Low</option>
                  <option value="regularPrice_asc">Price: Low to High</option>
                  <option value="createdAt_desc">Newest First</option>
                  <option value="createdAt_asc">Oldest First</option>
                </select>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={handleSubmit}
                className="w-full btn-primary py-3 rounded-lg font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Search Results
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {loading ? 'Searching...' : `${listings.length} properties found`}
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FaThLarge className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FaList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-xl text-gray-600 dark:text-gray-300">Searching properties...</p>
                </div>
              </div>
            ) : listings.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <FaMapMarkerAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search criteria or filters to find more properties.
                </p>
                <button
                  onClick={() => {
                    setSidebardata({
                      searchTerm: "",
                      type: "all",
                      parking: false,
                      furnished: false,
                      offer: false,
                      sort: "created_at",
                      order: "desc",
                    });
                    navigate('/search');
                  }}
                  className="btn-secondary px-6 py-3 rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {listings.map((listing, index) => (
                    <div 
                      key={listing._id} 
                      className="animate-fadeInUp"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {showMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={onShowMoreClick}
                      className="btn-primary px-8 py-4 rounded-lg font-semibold inline-flex items-center space-x-2 hover:scale-105 transition-transform"
                    >
                      <span>Load More Properties</span>
                      <FaSearch className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
