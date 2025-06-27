import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
        setMessage(`Hi ${data.username}, I am interested in ${listing.name}. Could you please provide more details?`);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLandlord();
  }, [listing.userRef, listing.name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      {landlord && (
        <div className="space-y-4">
          {/* Landlord Info */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              {landlord.avatar ? (
                <img
                  src={landlord.avatar}
                  alt={landlord.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <FaUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {landlord.username}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Property Owner</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                value={message}
                onChange={onChange}
                placeholder="Enter your message here..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodeURIComponent(message)}`}
              className="w-full btn-primary py-3 px-6 rounded-lg font-semibold inline-flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
            >
              <FaPaperPlane className="w-4 h-4" />
              <span>Send Message</span>
            </Link>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This will open your default email client
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
