import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaCalendarAlt,
  FaRulerCombined,
  FaHome,
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Property Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary px-6 py-3 rounded-lg inline-flex items-center space-x-2">
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  return (
    <main className="min-h-screen">
      {/* Image Gallery */}
      <div className="relative">
        <Swiper
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
          className="h-[60vh] md:h-[70vh]"
        >
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={url}>
              <div
                className="h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${url})`,
                }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <FaArrowLeft className="w-5 h-5 text-white" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <FaArrowLeft className="w-5 h-5 text-white rotate-180" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex space-x-3">
          <button
            onClick={handleShare}
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <FaShare className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={toggleFavorite}
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isFavorite ? (
              <FaHeart className="w-5 h-5 text-red-500" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <FaArrowLeft className="w-5 h-5 text-white" />
        </Link>

        {/* Image Counter */}
        <div className="absolute bottom-6 left-6 z-20 glass rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">
            {activeImageIndex + 1} / {listing.imageUrls.length}
          </span>
        </div>

        {/* Copy Notification */}
        {copied && (
          <div className="fixed top-24 right-6 z-50 glass rounded-lg p-3 animate-fadeInUp">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-white font-medium">Link copied to clipboard!</span>
            </div>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="animate-fadeInUp">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  listing.type === "rent" 
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                }`}>
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </span>
                {listing.offer && (
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                    ${(+listing.regularPrice - +listing.discountPrice).toLocaleString()} OFF
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {listing.name}
              </h1>
              
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-6">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                <span className="text-lg">{listing.address}</span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold gradient-text">
                  ${listing.offer
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.regularPrice.toLocaleString("en-US")}
                </span>
                {listing.type === "rent" && (
                  <span className="text-xl text-gray-500 dark:text-gray-400">/month</span>
                )}
                {listing.offer && (
                  <span className="text-xl text-gray-500 line-through ml-4">
                    ${listing.regularPrice.toLocaleString("en-US")}
                  </span>
                )}
              </div>
            </div>

            {/* Property Features */}
            <div className="glass rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaBed className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{listing.bedrooms}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaBath className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{listing.bathrooms}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {listing.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaParking className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {listing.parking ? <FaCheckCircle className="w-6 h-6 text-green-500 mx-auto" /> : <FaTimesCircle className="w-6 h-6 text-red-500 mx-auto" />}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Parking</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaChair className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {listing.furnished ? <FaCheckCircle className="w-6 h-6 text-green-500 mx-auto" /> : <FaTimesCircle className="w-6 h-6 text-red-500 mx-auto" />}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Furnished</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            {currentUser && listing.userRef !== currentUser._id && (
              <div className="glass rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Interested in this property?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Contact the landlord for more information or to schedule a viewing.
                </p>
                
                {!contact ? (
                  <button
                    onClick={() => setContact(true)}
                    className="w-full btn-primary py-3 px-6 rounded-lg font-semibold inline-flex items-center justify-center space-x-2"
                  >
                    <FaEnvelope className="w-5 h-5" />
                    <span>Contact Landlord</span>
                  </button>
                ) : (
                  <Contact listing={listing} />
                )}
              </div>
            )}

            {/* Property Summary */}
            <div className="glass rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '0.8s'}}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Property Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Property Type</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {listing.type === "rent" ? "Rental" : "Sale"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Bedrooms</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{listing.bedrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Bathrooms</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{listing.bathrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Parking</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {listing.parking ? "Available" : "Not Available"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Furnished</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {listing.furnished ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '1s'}}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaShare className="w-4 h-4" />
                  <span>Share Property</span>
                </button>
                <button
                  onClick={toggleFavorite}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isFavorite ? <FaHeart className="w-4 h-4 text-red-500" /> : <FaRegHeart className="w-4 h-4" />}
                  <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
