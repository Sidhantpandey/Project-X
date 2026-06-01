import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                L
              </div>

              <div>
                <h2 className="font-bold text-xl text-gray-900">
                  LogInsight
                </h2>

                <p className="text-sm text-gray-500">
                  AI Log Analytics
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-gray-600 leading-relaxed">
              Transform raw logs into meaningful insights using
              Retrieval-Augmented Generation (RAG) and GPT-powered
              intelligence.
            </p>
            </div>
          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-5">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link to="/">Features</Link>
              <Link to="/">Dashboard</Link>
              <Link to="/">Pricing</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-5">
              Resources
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link to="/">Documentation</Link>
              <Link to="/">API Reference</Link>
              <Link to="/">Blog</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;