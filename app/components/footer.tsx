'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { SiLine } from 'react-icons/si';

const Footer = () => {
  const productLinks = [
    { label: 'กันสาด', href: '/products/awning' },
    { label: 'ประตูรั้ว', href: '/products/gate' },
    { label: 'ระแนง–ฟาซาด', href: '/products/facade' },
    { label: 'โรงจอดรถ–ซุ้มศาลา', href: '/products/carport' },
    { label: 'ราวกันตก', href: '/products/railing' },
  ];

  const aboutLinks = [
    { label: 'เกี่ยวกับเรา', href: '/about/company' },
    { label: 'ผลงาน', href: '/about/portfolio' },
    { label: 'ทีมงาน', href: '/about/team' },
  ];

  const helpLinks = [
    { label: 'ประเมินราคา', href: '/support/quote' },
    { label: 'สอบถาม', href: '/support/inquiry' },
    { label: 'ติดต่อเรา', href: '/support/contact' },
  ];

  const socials = [
    { label: 'Line', href: '#', Icon: SiLine },
    { label: 'Facebook', href: '#', Icon: FaFacebookF },
    { label: 'Instagram', href: '#', Icon: FaInstagram },
    { label: 'YouTube', href: '#', Icon: FaYoutube },
    { label: 'TikTok', href: '#', Icon: FaTiktok },
    { label: 'Pinterest', href: '#', Icon: FaPinterestP },
  ];

  return (
    <footer className="mt-auto w-full overflow-x-hidden" style={{ backgroundColor: '#1E2E4F' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full" style={{ maxWidth: '1800px' }}>
        {/* Mobile: Company first, then 2 columns layout */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Mobile: 2 columns layout */}
          <div className="space-y-6 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-8 lg:space-y-0">
            
            {/* 2 columns on mobile; become contents on lg */}
            <div className="grid grid-cols-2 gap-x-4 lg:contents">
              
              {/* LEFT: Products (level 1) + About (level 2) + Help (level 2.5) */}
              <div className="flex flex-col lg:contents">
                {/* Products */}
                <div className="min-h-12 flex items-start lg:contents mb-6">
                  <nav aria-label="สินค้า" className="lg:order-1 w-full">
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">สินค้า</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {productLinks.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* About */}
                <nav aria-label="เกี่ยวกับเรา" className="lg:order-2">
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">เกี่ยวกับเรา</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {aboutLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Help — ย้ายมาอยู่คอลัมน์เดียวกับ "เกี่ยวกับเรา" */}
                <nav aria-label="บริการ" className="lg:hidden mt-6">
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">บริการ</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {helpLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* RIGHT: Logo on mobile; no Help hereแล้ว */}
              <div className="flex flex-col lg:contents">
                {/* Logo - mobile only */}
                <div className="lg:hidden min-h-12 mb-6 flex justify-center items-center">
                  <Image
                    src="/images/logo.png"
                    alt="SPK Ansard Logo"
                    width={200}
                    height={62}
                    className="h-16 w-auto brightness-0 invert"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Help/Services Column - Large screens only */}
            <div className="hidden lg:block lg:order-3">
              <nav aria-label="บริการ">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">บริการ</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {helpLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Company - Hidden on mobile grid, shown separately below */}
            <div className="hidden lg:block lg:order-4">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                บริษัท เอสพีเค แอนซาร์ด จำกัด
              </h3>

              <p className="text-gray-200 text-sm leading-relaxed mb-3">
                ผู้เชี่ยวชาญด้านกันสาด ประตูรั้ว และงานเหล็กครบวงจร<br className="hidden sm:block" />
                ออกแบบและติดตั้งด้วยคุณภาพมาตรฐานสูง
              </p>

              <div className="space-y-1 text-sm">
                <a
                  href="tel:021368899"
                  className="text-white/90 hover:text-white transition-colors block"
                >
                  โทร. 02-136-8899
                </a>
                <a
                  href="https://line.me/R/ti/p/@spkansard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors block"
                >
                  LINE @spkansard
                </a>
              </div>
            </div>

            {/* Logo Column - Large screens only */}
            <div className="hidden lg:flex lg:justify-center lg:items-start lg:order-5">
              <Image
                src="/images/logo.png"
                alt="SPK Ansard Logo"
                width={240}
                height={75}
                className="h-20 w-auto brightness-0 invert"
                priority
              />
            </div>

          </div>

          {/* Company section - Full width on mobile, shown below the grid */}
          <div className="lg:hidden">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">
              บริษัท เอสพีเค แอนซาร์ด จำกัด
            </h3>

            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              ผู้เชี่ยวชาญด้านกันสาด ประตูรั้ว และงานเหล็กครบวงจร<br className="hidden sm:block" />
              ออกแบบและติดตั้งด้วยคุณภาพมาตรฐานสูง
            </p>

            <div className="space-y-1 text-sm">
              <a
                href="tel:021368899"
                className="text-white/90 hover:text-white transition-colors block"
              >
                โทร. 02-136-8899
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors block"
              >
                LINE @spkansard
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 border-t border-white/15 pt-4 sm:pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Phone + Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
              <a
                href="tel:021368899"
                className="flex items-center text-white hover:text-white/90 transition-colors"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-lg sm:text-xl font-semibold">02-136-8899</span>
              </a>

              <div className="flex items-center gap-2 sm:gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 ring-1 ring-white/15 transition-colors"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-gray-200 text-xs sm:text-sm text-center lg:text-right">
              © สงวนลิขสิทธิ์ บริษัท เอสพีเค แอนซาร์ด จำกัด
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
