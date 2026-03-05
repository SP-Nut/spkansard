import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Inline SVG icons to avoid client-side react-icons bundle
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 320 512" aria-hidden="true"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 576 512" aria-hidden="true"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
);
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
);
const LineIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1.1 0 2.1.6 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.2C448 50.8 347.4 0 224 0S0 50.8 0 113.2c0 55.8 49.7 102.5 116.8 111.5 4.5 1 10.7 3 12.3 6.9 1.4 3.5.9 9.1.5 12.7 0 0-1.6 9.8-2 11.8-2.4 10.4 4.9 10.4 18.3 6 31.5-12.6 59.7-27.6 79.1-51.8h62c67.1 0 121.5-50.7 161-111.1z"/></svg>
);

const Footer = () => {
  const productLinks = [
    { label: 'กันสาด', href: '/materials' },
    { label: 'โรงจอดรถ', href: '/materials' },
    { label: 'งานฝ้า', href: '/materials' },
    { label: 'งานระแนง', href: '/materials' },
    { label: 'งานเหล็ก', href: '/materials' },
  ];

  const aboutLinks = [
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'ผลงาน', href: '/gallery' },
    { label: 'วัสดุ', href: '/materials' },
  ];

  const helpLinks = [
    { label: 'คำถามที่พบบ่อย', href: '/faq' },
    { label: 'ติดต่อเรา', href: '/contact' },
    { label: 'ประเมินราคา', href: 'https://cal-customer.vercel.app/' },
  ];

  const socials = [
    { label: 'Line', href: 'https://line.me/R/ti/p/@spkansard', Icon: LineIcon },
    { label: 'Facebook', href: 'https://www.facebook.com/spkansard/', Icon: FacebookIcon },
    { label: 'YouTube', href: 'https://www.youtube.com/@spkansard', Icon: YoutubeIcon },
    { label: 'TikTok', href: 'https://www.tiktok.com/@spkansard?is_from_webapp=1&sender_device=pc', Icon: TiktokIcon },
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
                        {l.href.startsWith('http') ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                          >
                            {l.label}
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                          >
                            {l.label}
                          </Link>
                        )}
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
                    alt="SP Kansard - เอสพี กันสาด Logo"
                    width={200}
                    height={62}
                    className="h-16 w-auto brightness-0 invert"
                    loading="lazy"
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
                      {l.href.startsWith('http') ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-gray-200 hover:text-white transition-colors duration-200 text-sm sm:text-sm"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Company - Hidden on mobile grid, shown separately below */}
            <div className="hidden lg:block lg:order-4">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                บริษัท เอสพี กันสาด จำกัด
              </h3>

              <p className="text-gray-200 text-sm leading-relaxed mb-3">
                ผู้เชี่ยวชาญด้านกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร<br className="hidden sm:block" />
                มีประสบการณ์กว่า 38 ปี ลูกค้ามากกว่า 50,000 ราย การรับประกัน 10 ปี
              </p>

              <div className="space-y-1 text-sm">
                <p className="text-white/90 mb-1">
                  28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม<br />
                  เขตบึงกุ่ม กรุงเทพมหานคร 10230
                </p>
                <a
                  href="tel:02-936-8841"
                  className="text-white/90 hover:text-white transition-colors block"
                >
                  โทร. 02-936-8841
                </a>
                <p className="text-white/90">
                  แฟกซ์. 02-936-8843
                </p>
                <a
                  href="mailto:spkansards@gmail.com"
                  className="text-white/90 hover:text-white transition-colors block"
                >
                  อีเมล: spkansards@gmail.com
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
                alt="SP Kansard - เอสพี กันสาด Logo"
                width={240}
                height={75}
                className="h-20 w-auto brightness-0 invert"
                loading="lazy"
              />
            </div>

          </div>

          {/* Company section - Full width on mobile, shown below the grid */}
          <div className="lg:hidden">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">
              บริษัท เอสพี กันสาด จำกัด
            </h3>

            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              ผู้เชี่ยวชาญด้านกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร<br className="hidden sm:block" />
              มีประสบการณ์กว่า 38 ปี ลูกค้ามากกว่า 50,000 ราย การรับประกัน 10 ปี
            </p>

            <div className="space-y-1 text-sm">
              <p className="text-white/90 mb-1">
                28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม<br />
                เขตบึงกุ่ม กรุงเทพมหานคร 10230
              </p>
              <a
                href="tel:02-936-8841"
                className="text-white/90 hover:text-white transition-colors block"
              >
                โทร. 02-936-8841
              </a>
              <p className="text-white/90">
                แฟกซ์. 02-936-8843
              </p>
              <a
                href="mailto:spkansards@gmail.com"
                className="text-white/90 hover:text-white transition-colors block"
              >
                อีเมล: spkansards@gmail.com
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
                href="tel:02-936-8841"
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
                <span className="text-lg sm:text-xl font-semibold">02-936-8841</span>
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
              © สงวนลิขสิทธิ์ บริษัท เอสพี กันสาด จำกัด
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
