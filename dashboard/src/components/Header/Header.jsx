import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
              L
            </div>

            <div>
              <h2 className="font-bold text-xl text-gray-900">
                LogInsight
              </h2>

              <p className="text-xs text-gray-500">
                AI Powered Log Analytics
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Workflow
            </a>

            <a
              href="#analytics"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Analytics
            </a>

            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Pricing
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="px-5 py-2.5 text-gray-700 hover:text-gray-900">
              Login
            </button>

            <button className="px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="lg:hidden"
          >
            {expanded ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {expanded && (
          <div className="lg:hidden border-t border-gray-100 py-6">
            <div className="flex flex-col gap-5">
              <a href="#features" className="text-gray-700">
                Features
              </a>

              <a href="#workflow" className="text-gray-700">
                Workflow
              </a>

              <a href="#analytics" className="text-gray-700">
                Analytics
              </a>

              <a href="#pricing" className="text-gray-700">
                Pricing
              </a>

              <hr />

              <button className="text-left text-gray-700">
                Login
              </button>

              <button className="bg-gray-900 text-white py-3 rounded-xl">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;