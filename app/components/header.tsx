"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Product', 
      href: '/product',
      hasDropdown: true 
    },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },

  ];

  return (
    <header className="shadow-sm animate-fade-in w-full overflow-x-hidden" style={{backgroundColor: '#00447c'}}>
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{maxWidth: '1800px'}}>
        <div className="flex justify-between items-center h-18 sm:h-20 w-full min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 sm:h-10 lg:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 px-3 py-2 text-base font-medium flex items-center transition-colors duration-200"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                {/* Dropdown placeholder - can be expanded later */}
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        href={`${item.href}/option1`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Option 1
                      </Link>
                      <Link
                        href={`${item.href}/option2`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Option 2
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Free Service Button */}
          <div className="hidden lg:flex flex-shrink-0">
            <Link
              href="/free-service"
              className="bg-blue-300 text-blue-900 hover:bg-blue-200 font-medium py-2 px-6 rounded-full transition-colors duration-200 text-base"
            >
              คำนวณราคาฟรี
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 p-2"
            >
              <svg
                className="h-8 w-8 sm:h-8 sm:w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden w-full overflow-x-hidden">
            <div className="px-4 pt-2 pb-3 space-y-1 border-t border-blue-400 w-full" style={{backgroundColor: '#00447c'}}>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/free-service"
                className="bg-blue-300 text-blue-900 hover:bg-blue-200 font-medium py-2 px-4 rounded-full transition-colors duration-200 text-base inline-block mt-3"
                onClick={() => setIsMenuOpen(false)}
              >
                คำนวนราคาฟรี

              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
