import { FaSearch, FaHome, FaInfoCircle, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
          {/* Logo */}
          <Link to="/" className="animate-slideInLeft">
            <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap items-center">
              <span className="gradient-text">PrimeEstate</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">Solutions</span>
            </h1>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex glass rounded-full px-6 py-3 items-center min-w-[300px] animate-fadeInUp"
          >
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent focus:outline-none flex-1 text-gray-700 dark:text-gray-200 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="ml-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaSearch className="text-gray-600 dark:text-gray-300" />
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 animate-slideInRight">
            <Link to="/" className="nav-link group">
              <FaHome className="inline mr-2 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-500 transition-colors">Home</span>
            </Link>
            <Link to="/about" className="nav-link group">
              <FaInfoCircle className="inline mr-2 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-500 transition-colors">About</span>
            </Link>
            <Link to="/profile" className="nav-link group">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500 hover:ring-4 transition-all"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
                    {currentUser.username}
                  </span>
                </div>
              ) : (
                <>
                  <FaUser className="inline mr-2 group-hover:text-blue-500 transition-colors" />
                  <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-500 transition-colors">Sign In</span>
                </>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg glass hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-gray-700 dark:text-gray-200" />
            ) : (
              <FaBars className="text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSubmit} className="glass rounded-full px-4 py-3 flex items-center">
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent focus:outline-none flex-1 text-gray-700 dark:text-gray-200 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="ml-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaSearch className="text-gray-600 dark:text-gray-300" />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
          <div className="fixed top-0 right-0 h-full w-64 glass backdrop-blur-md p-6 animate-slideInRight">
            <nav className="flex flex-col space-y-6 mt-16">
              <Link 
                to="/" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleMobileMenu}
              >
                <FaHome className="text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Home</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleMobileMenu}
              >
                <FaInfoCircle className="text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">About</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleMobileMenu}
              >
                {currentUser ? (
                  <>
                    <img
                      className="w-6 h-6 rounded-full object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-200">{currentUser.username}</span>
                  </>
                ) : (
                  <>
                    <FaUser className="text-blue-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Sign In</span>
                  </>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
}
