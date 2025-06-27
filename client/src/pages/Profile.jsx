import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaHome, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSignOutAlt,
  FaUserCog,
  FaChartBar,
  FaHeart,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // ✅ Function to upload image to Cloudinary and update backend
  const handleFileUpload = async (file) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern-estate"); // Replace with your Cloudinary preset
    data.append("cloud_name", "dupythh95"); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dupythh95/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await res.json();

      if (uploadedImage.secure_url) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: uploadedImage.secure_url,
        }));
        setFilePerc(100); // Set progress to 100%

        // ✅ Auto-update profile picture in database after upload
        await updateProfilePicture(uploadedImage.secure_url);
      } else {
        setFileUploadError(true);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setFileUploadError(true);
    }
  };

  // ✅ Function to update avatar in backend
  const updateProfilePicture = async (avatarUrl) => {
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data)); // ✅ Update Redux store with new avatar
      localStorage.setItem("currentUser", JSON.stringify(data)); // ✅ Persist user in local storage
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log("Error deleting listing", data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error("Error deleting listing", error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            My Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your profile and properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-8 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
                <FaUserCog className="w-6 h-6 text-blue-500" />
                <span>Profile Settings</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Upload */}
                <div className="text-center">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                  <div className="relative inline-block">
                    <img
                      onClick={() => fileRef.current.click()}
                      src={
                        formData.avatar ||
                        currentUser.avatar ||
                        "https://via.placeholder.com/150/667eea/ffffff?text=User"
                      }
                      alt="profile"
                      className="w-32 h-32 rounded-full object-cover cursor-pointer ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all"
                    />
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                      <FaCamera className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Upload Status */}
                  <div className="mt-4">
                    {fileUploadError ? (
                      <p className="text-red-500 text-sm flex items-center justify-center space-x-2">
                        <FaTimesCircle className="w-4 h-4" />
                        <span>Error: Image must be less than 2MB</span>
                      </p>
                    ) : filePerc > 0 && filePerc < 100 ? (
                      <div className="space-y-2">
                        <p className="text-blue-600 text-sm">Uploading {filePerc}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{width: `${filePerc}%`}}
                          ></div>
                        </div>
                      </div>
                    ) : filePerc === 100 ? (
                      <p className="text-green-500 text-sm flex items-center justify-center space-x-2">
                        <FaCheckCircle className="w-4 h-4" />
                        <span>Image uploaded successfully!</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Username"
                        defaultValue={currentUser.username}
                        id="username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        defaultValue={currentUser.email}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        placeholder="New password (leave blank to keep current)"
                        onChange={handleChange}
                        id="password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    disabled={loading}
                    className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent"></div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Update Profile"
                    )}
                  </button>

                  <Link
                    to="/create-listing"
                    className="w-full btn-secondary py-3 rounded-lg font-semibold text-center inline-flex items-center justify-center space-x-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Create New Listing</span>
                  </Link>
                </div>

                {/* Status Messages */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2">
                      <FaTimesCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </p>
                  </div>
                )}

                {updateSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <p className="text-green-600 dark:text-green-400 text-sm flex items-center space-x-2">
                      <FaCheckCircle className="w-4 h-4" />
                      <span>Profile updated successfully!</span>
                    </p>
                  </div>
                )}
              </form>

              {/* Account Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2"
                  >
                    <FaTrash className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Section */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                  <FaHome className="w-6 h-6 text-blue-500" />
                  <span>My Properties</span>
                </h2>
                <button
                  onClick={handleShowListings}
                  className="btn-primary px-4 py-2 rounded-lg text-sm"
                >
                  Refresh Listings
                </button>
              </div>

              {showListingsError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    Error loading listings. Please try again.
                  </p>
                </div>
              )}

              {userListings && userListings.length > 0 ? (
                <div className="space-y-4">
                  {userListings.map((listing, index) => (
                    <div
                      key={listing._id}
                      className="glass rounded-xl p-4 hover:shadow-lg transition-all animate-fadeInUp"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Property Image */}
                        <Link to={`/listing/${listing._id}`}>
                          <img
                            src={listing.imageUrls[0]}
                            alt={listing.name}
                            className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform"
                          />
                        </Link>

                        {/* Property Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/listing/${listing._id}`}
                            className="block hover:text-blue-600 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {listing.name}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <FaMapMarkerAlt className="w-3 h-3" />
                              <span className="truncate">{listing.address}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FaDollarSign className="w-3 h-3" />
                              <span>${listing.regularPrice?.toLocaleString()}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              listing.type === 'rent' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            }`}>
                              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </span>
                            {listing.offer && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                Special Offer
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2">
                          <Link
                            to={`/listing/${listing._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View Property"
                          >
                            <FaEye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/update-listing/${listing._id}`}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Edit Property"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleListingDelete(listing._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Property"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaHome className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Properties Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start building your real estate portfolio by creating your first listing.
                  </p>
                  <Link
                    to="/create-listing"
                    className="btn-primary px-6 py-3 rounded-lg inline-flex items-center space-x-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Create Your First Listing</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            {userListings && userListings.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="glass rounded-xl p-4 text-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                  <FaHome className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userListings.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
                </div>
                <div className="glass rounded-xl p-4 text-center animate-fadeInUp" style={{animationDelay: '0.5s'}}>
                  <FaDollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {userListings.filter(l => l.type === 'sale').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For Sale</p>
                </div>
                <div className="glass rounded-xl p-4 text-center animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                  <FaCalendarAlt className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {userListings.filter(l => l.type === 'rent').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For Rent</p>
                </div>
                <div className="glass rounded-xl p-4 text-center animate-fadeInUp" style={{animationDelay: '0.7s'}}>
                  <FaHeart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {userListings.filter(l => l.offer).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Special Offers</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
