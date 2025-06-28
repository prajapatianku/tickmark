import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaHome,
  FaBook,
  FaChartBar,
  FaClipboardList,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-200 to-blue-100 text-black px-6 py-12 font-sans mt-20 border-t border-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Left section */}
        <div className="lg:w-2/3">
          <div className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-6 font-bold text-lg">
            CONTACT US
          </div>
          <h2 className="text-5xl font-black mb-4">GET IN TOUCH.</h2>
          <hr className="border-black border-dashed mb-4" />
          <p className="max-w-md">
            TickMark helps you track your trades, analyze your portfolio, and
            grow your financial skills with clarity and confidence.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:opacity-75">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:opacity-75">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:opacity-75">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col gap-10 lg:items-end text-sm">
          <div>
            <p>
              <strong>BASED IN</strong>
              <br />
              India
            </p>
            <p className="mt-2">
              <strong>PHONE NO.</strong>
              <br />
              +91 98765 43210
            </p>
            <p className="mt-2">
              <strong>CONTACT</strong>
              <br />
              contact@tickmark.in
            </p>
            <p className="mt-2">
              <strong>SUPPORT</strong>
              <br />
              support@tickmark.in
            </p>
            <p className="mt-2">
              <strong>STATUS</strong>
              <br />
              All Systems Operational
            </p>
          </div>
        </div>
      </div>

      <hr className="border-black border-dashed my-6" />
      <div className="flex justify-between items-center text-xs flex-wrap">
        <p className="font-bold">
          © {new Date().getFullYear()} TickMark. All rights reserved.
        </p>
        <a
          href="#"
          className="font-bold hover:underline flex items-center gap-1"
        >
          <FaArrowUp /> BACK TO TOP
        </a>
      </div>
    </footer>
  );
};

export default Footer;
