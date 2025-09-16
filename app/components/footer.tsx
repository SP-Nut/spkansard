'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    {
      label: 'Line',
      href: '#',
      path: 'M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zM24 7.465V16.536C24 20.583 20.583 24 16.537 24H7.465C3.417 24 0 20.583 0 16.537V7.465C0 3.417 3.417 0 7.465 0h9.072C20.583 0 24 3.417 24 7.465',
    },
    {
      label: 'Facebook',
      href: '#',
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      label: 'Instagram',
      href: '#',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 8.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm6.406-1.683c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      label: 'YouTube',
      href: '#',
      path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      label: 'TikTok',
      href: '#',
      path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    },
    {
      label: 'Pinterest',
      href: '#',
      path: 'M12 0C5.374 0 0 5.372 0 12.017 0 16.4 2.331 20.027 5.686 21.6c-.076-.664-.145-1.685.03-2.409.157-.652 1.005-4.238 1.005-4.238s-.257-.513-.257-1.27c0-1.191.692-2.078 1.553-2.078.732 0 1.085.549 1.085 1.207 0 .735-.468 1.834-.708 2.853-.202.855.428 1.552 1.27 1.552 1.524 0 2.693-1.608 2.693-3.929 0-2.055-1.476-3.489-3.585-3.489-2.442 0-3.877 1.833-3.877 3.727 0 .738.284 1.529.639 1.955.07.085.081.16.06.246-.067.282-.215.865-.245.986-.039.155-.127.188-.293.113-1.076-.499-1.748-2.066-1.748-3.327 0-2.704 1.965-5.187 5.661-5.187 2.971 0 5.28 2.118 5.28 4.948 0 2.952-1.86 5.324-4.442 5.324-.867 0-1.684-.451-1.963-.992l-.534 2.035c-.193.753-.715 1.699-1.065 2.277C9.645 23.812 10.8 24 12 24c6.624 0 12-5.372 12-12.017C24 5.372 18.626.001 12.001.001z',
    },
  ];

  return (
    <footer className="mt-auto w-full overflow-x-hidden" style={{ backgroundColor: '#00447c' }}>
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
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 ring-1 ring-white/15 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={s.path} />
                    </svg>
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
