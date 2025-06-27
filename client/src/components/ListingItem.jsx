import { Link } from "react-router-dom";
import { MdLocationOn, MdBed, MdBathtub, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaHeart, FaRegHeart, FaShare, FaEye } from "react-icons/fa";
import { useState } from "react";

export default function ListingItem({ listing }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/listing/${listing._id}`);
    // You could add a toast notification here
  };

  return (
    <div className="group glass card-hover rounded-2xl overflow-hidden w-full sm:w-[350px] animate-fadeInUp">
      <Link to={`/listing/${listing._id}`}>
        <div className="relative overflow-hidden">
          {/* Property Image */}
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="listing cover"
            className={`h-[250px] w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="loading-spinner"></div>
            </div>
          )}

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={toggleFavorite}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 w-4 h-4" />
                ) : (
                  <FaRegHeart className="text-white w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <FaShare className="text-white w-4 h-4" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {listing.offer && (
                  <span className="px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    Special Offer
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6 space-y-4">
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold gradient-text">
                ${listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && <span className="text-sm text-gray-500 dark:text-gray-400"> /month</span>}
              </p>
              {listing.offer && (
                <p className="text-sm text-gray-500 line-through">
                  ${listing.regularPrice.toLocaleString("en-US")}
                </p>
              )}
            </div>
          </div>

          {/* Property Name */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {listing.name}
          </h3>

          {/* Location */}
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <MdLocationOn className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm truncate">{listing.address}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Property Features */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <MdBed className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">
                  {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <MdBathtub className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">
                  {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
              <FaEye className="w-4 h-4" />
              <span className="text-sm font-medium">View Details</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
