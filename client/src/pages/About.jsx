import React from "react";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 via-blue-100 to-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-slate-900 text-center">
        About PrimeEstate Solutions
      </h1>
      <div className="flex justify-center items-center mb-8">
        <img
          src="https://res.cloudinary.com/dupythh95/image/upload/v1738876060/popzcnsoxhwmhjygqj1y.png"
          alt="PrimeEstate Solutions"
          className="rounded-full w-32 h-32 shadow-lg"
        />
      </div>
      <p className="mb-6 text-lg text-slate-700 leading-relaxed">
        PrimeEstate Solutions is your trusted partner in the world of real
        estate. Whether you’re buying, selling, or renting, we’re here to guide
        you through the process with ease. Our goal is to turn your real estate
        journey into a smooth, rewarding experience. With a passion for helping
        clients find the perfect property, our expert team is dedicated to
        delivering personalized service at every step.
      </p>
      <p className="mb-6 text-lg text-slate-700 leading-relaxed">
        <strong>Our Mission</strong>: At PrimeEstate Solutions, we believe that
        real estate is more than just transactions – it’s about building
        relationships. Our mission is to offer tailored advice and support,
        ensuring our clients make informed decisions with confidence. Our
        comprehensive knowledge of local markets and the ever-evolving trends
        help us provide exceptional results.
      </p>
      <p className="mb-6 text-lg text-slate-700 leading-relaxed">
        <strong>What Sets Us Apart</strong>: What truly sets us apart from other
        agencies is our unwavering commitment to you. We believe in going above
        and beyond to meet your needs and exceed your expectations. Whether you
        are buying your first home, selling a property, or looking for your
        dream rental, we offer solutions that are aligned with your unique
        goals.
      </p>

      {/* Founder Section */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Meet Our Founder
        </h2>
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dupythh95/image/upload/v1738924976/WhatsApp_Image_2025-02-07_at_4.10.18_PM_woiy7a.jpg"
            alt="Sarvesh Shelgaonkar"
             className="w-40 h-40 rounded-full mb-2 shadow-lg object-cover"
          />
          <p className="text-xl font-semibold text-slate-800">
            Sarvesh Shelgaonkar
          </p>
          <p className="text-sm text-slate-500">Founder & CEO</p>
        </div>
      </div>
    </div>
  );
}
