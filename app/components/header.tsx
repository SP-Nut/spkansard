"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Materials', href: '/materials' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(false);

  // ปิด scroll เวลาเมนูเปิด
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  // ทำพื้นหลังโปร่งใสเมื่อ hero แสดงอยู่ในหน้าจอ
  useEffect(() => {                                                                                               
    if (typeof window === 'undefined') return;
    const hero = document.getElementById('hero');
    if (!hero) {
      setOverHero(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setOverHero(entry.isIntersecting && entry.intersectionRatio > 0);
      },
      { threshold: 0.2 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="w-full fixed top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: overHero && !isMenuOpen ? 'transparent' : '#1E2E4F' }}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: '1800px' }}>
        <div className="flex justify-between items-center h-16 sm:h-20 w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 px-3 py-2 text-base font-medium flex items-center transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex flex-shrink-0">
            <a
              href="https://cal-customer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#eaf4ff] text-[#1E2E4F] hover:bg-white font-medium py-2 px-6 rounded-full transition-colors duration-200 text-base"
            >
              คำนวณราคาฟรี
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 p-2"
            >
              <svg className="h-8 w-8 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-16 sm:top-20 left-0 w-full h-full bg-[#1E2E4F] z-40 overflow-y-auto">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-gray-200 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://cal-customer.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eaf4ff] text-[#1E2E4F] hover:bg-white font-medium py-2 px-4 rounded-full transition-colors duration-200 text-base inline-block mt-3"
                onClick={() => setIsMenuOpen(false)}
              >
                คำนวนราคาฟรี
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
