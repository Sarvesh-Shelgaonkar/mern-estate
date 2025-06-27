import React from "react";
import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaUsers, 
  FaAward, 
  FaHandshake, 
  FaChartLine, 
  FaHeart,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft
} from "react-icons/fa";

export default function About() {
  const stats = [
    { icon: FaHome, number: "500+", label: "Properties Sold" },
    { icon: FaUsers, number: "1000+", label: "Happy Clients" },
    { icon: FaAward, number: "5+", label: "Years Experience" },
    { icon: FaHandshake, number: "98%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Passion",
      description: "We're passionate about helping people find their perfect home and making their real estate dreams come true."
    },
    {
      icon: FaHandshake,
      title: "Trust",
      description: "Building lasting relationships through transparency, honesty, and reliable service is at the core of everything we do."
    },
    {
      icon: FaChartLine,
      title: "Excellence",
      description: "We strive for excellence in every transaction, ensuring our clients receive the best possible outcomes."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Buyer",
      content: "PrimeEstate Solutions made buying my first home an amazing experience. Their team was professional, knowledgeable, and always available to answer my questions.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Property Investor",
      content: "I've worked with many real estate agencies, but PrimeEstate stands out. Their market knowledge and attention to detail are exceptional.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Home Seller",
      content: "They sold my house in just 2 weeks! The marketing strategy and professional photography really made a difference.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <img
              src="https://res.cloudinary.com/dupythh95/image/upload/v1738876060/popzcnsoxhwmhjygqj1y.png"
              alt="PrimeEstate Solutions"
              className="w-32 h-32 rounded-full mx-auto mb-8 shadow-2xl animate-float"
            />
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              About PrimeEstate Solutions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in real estate, dedicated to making your property dreams a reality
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fadeInUp"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold gradient-text mb-2">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                At PrimeEstate Solutions, we believe that real estate is more than just transactions – 
                it's about building relationships and creating lasting memories. Our mission is to provide 
                exceptional service that goes beyond expectations.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                We combine cutting-edge technology with personalized service to ensure every client 
                receives the attention and expertise they deserve. Whether you're buying your first home, 
                selling a property, or looking for investment opportunities, we're here to guide you 
                every step of the way.
              </p>
              <div className="flex space-x-4">
                <Link to="/contact" className="btn-primary px-6 py-3 rounded-lg">
                  Contact Us
                </Link>
                <Link to="/search" className="btn-secondary px-6 py-3 rounded-lg">
                  View Properties
                </Link>
              </div>
            </div>
            <div className="animate-slideInRight">
              <div className="glass rounded-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Home"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold gradient-text mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl p-8 text-center animate-fadeInUp"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold gradient-text mb-8">Meet Our Founder</h2>
            <div className="glass rounded-2xl p-8 md:p-12">
              <img
                src="https://res.cloudinary.com/dupythh95/image/upload/v1739053821/x4yvjg4cx63ary0glndq.jpg"
                alt="Sarvesh Shelgaonkar"
                className="w-40 h-40 rounded-full mx-auto mb-6 shadow-2xl object-cover ring-4 ring-blue-500/20"
              />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Sarvesh Shelgaonkar
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">
                Founder & CEO
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                With over 5 years of experience in real estate and technology, Sarvesh founded 
                PrimeEstate Solutions with a vision to revolutionize the property market through 
                innovation and exceptional customer service. His passion for helping people find 
                their dream homes drives the company's commitment to excellence.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://www.linkedin.com/in/sarvesh-shelgaonkar-04a1b8248/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110"
                  title="Connect on LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="mailto:sarveshshelgaonkar864@gmail.com" 
                  className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:scale-110"
                  title="Send Email"
                >
                  <FaEnvelope className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="tel:+918698858512" 
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all hover:scale-110"
                  title="Call Us"
                >
                  <FaPhone className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold gradient-text mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real stories from real people
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl p-6 animate-fadeInUp"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <FaQuoteLeft className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's work together to find your perfect property or sell your current one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+918698858512"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <FaPhone className="w-5 h-5" />
              <span>Call Us Today</span>
            </a>
            <a 
              href="mailto:sarveshshelgaonkar864@gmail.com"
              className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>Send Message</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
