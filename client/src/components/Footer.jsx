import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                PrimeEstate Solutions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted partner in finding the perfect home. We provide premium real estate 
                services with unmatched expertise and personalized attention.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/sarvesh-shelgaonkar-04a1b8248/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="LinkedIn Profile"
                  title="Connect on LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="mailto:sarveshshelgaonkar864@gmail.com" 
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Send Email"
                  title="Send Email"
                >
                  <FaEnvelope className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="tel:+918698858512" 
                  className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Call Us"
                  title="Call Us"
                >
                  <FaPhone className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/search" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Search Properties
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link 
                  to="/create-listing" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  List Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Property Types</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/search?type=sale" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Houses for Sale
                </Link>
              </li>
              <li>
                <Link 
                  to="/search?type=rent" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Houses for Rent
                </Link>
              </li>
              <li>
                <Link 
                  to="/search?offer=true" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Special Offers
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Luxury Homes
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Commercial Properties
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Pune Institute of Computer Technology, PICT, Pune
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+918698858512" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 8698858512
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a 
                  href="mailto:sarveshshelgaonkar864@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  sarveshshelgaonkar864@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-md font-semibold mb-3">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} PrimeEstate Solutions. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for your dream home</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;