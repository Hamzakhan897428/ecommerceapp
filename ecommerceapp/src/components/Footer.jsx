import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold">
            Hamza Khan
          </h1>
          <p className="text-gray-400 mt-3 text-sm">
            Best ecommerce store with secure payments and fast delivery.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Follow Us
          </h2>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm">
            © 2026 Hamza Khan. All rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 text-3xl text-gray-300">

            <FaCcVisa className="hover:text-blue-500 transition" />
            <FaCcMastercard className="hover:text-orange-500 transition" />
            <FaCcPaypal className="hover:text-blue-400 transition" />
            <FaCcAmex className="hover:text-green-400 transition" />

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;