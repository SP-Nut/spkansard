"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaPhone, FaCalculator, FaArrowUp, FaFacebook } from "react-icons/fa";
import { SiLine } from "react-icons/si";

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  // หน้า Home โผล่เมื่อเลื่อนเกิน 80% ของ viewport
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      
      if (pathname === "/") {
        const vh = window.innerHeight || 0;
        setIsVisible(y > vh * 0.8);
      } else {
        setIsVisible(true);
      }
      
      // แสดงปุ่ม scroll top เมื่อเลื่อนลงมาเกิน 300px
      setShowScrollTop(y > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = () => {
    // ไม่ต้องทำอะไร เพราะไม่มีเมนูให้ปิดแล้ว
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (!isVisible) return null;

  const items = [
    {
      key: "line",
      href: "https://line.me/R/ti/p/@spkansard",
      label: "LINE @spkansard",
      bg: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      icon: <SiLine className="w-4 h-4 sm:w-5 sm:h-5" />,
      rel: "noopener nofollow",
      target: "_blank",
      aria: "ติดต่อผ่าน LINE @spkansard (เปิดแท็บใหม่)",
    },
    {
      key: "facebook",
      href: "https://www.facebook.com/spkansard",
      label: "Facebook",
      bg: "bg-blue-600",
      hoverBg: "hover:bg-blue-700",
      icon: <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />,
      rel: "noopener nofollow",
      target: "_blank",
      aria: "ติดต่อผ่าน Facebook (เปิดแท็บใหม่)",
    },
    {
      key: "phone",
      href: "tel:02-936-8841",
      label: "โทร 02-936-8841",
      bg: "bg-[var(--brand-600)]",
      hoverBg: "hover:bg-[var(--brand-700)]",
      icon: <FaPhone className="w-4 h-4 sm:w-5 sm:h-5" />,
      rel: undefined,
      target: undefined,
      aria: "โทร 02-936-8841",
    },
    {
      key: "calculator",
      href: "https://cal-customer.vercel.app/",
      label: "ประเมินราคา",
      bg: "bg-[var(--brand-500)]",
      hoverBg: "hover:bg-[var(--brand-600)]",
      icon: <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5" />,
      rel: "noopener nofollow",
      target: "_blank",
      aria: "ประเมินราคากันสาด (เปิดแท็บใหม่)",
    },
  ];

  return (
    <>


      {/* ปุ่ม Scroll to Top อยู่เหนือปุ่มหลัก */}
      {showScrollTop && (
        <div className="fixed bottom-16 right-2 sm:bottom-18 sm:right-3 z-50">
          <button
            onClick={scrollToTop}
            aria-label="เลื่อนกลับขึ้นบนสุด"
            className={[
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center",
              "bg-gray-600 hover:bg-gray-700",
              "ring-1 ring-white/30 hover:ring-white/50",
              "transition-all duration-300 ease-out transform",
              "hover:scale-110 active:scale-95 hover:shadow-xl",
              "focus:outline-none focus:ring-2 focus:ring-gray-300/50"
            ].join(" ")}
          >
            <FaArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* ปุ่มเมนูล่างกึ่งกลาง */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {items.map((it) => (
            <a
              key={it.key}
              href={it.href}
              rel={it.rel}
              target={it.target}
              onClick={handleLinkClick}
              aria-label={it.aria}
              className={[
                "floating-contact-item group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center",
                "ring-2 ring-white/40 hover:ring-white/60",
                it.bg,
                it.hoverBg,
                "transition-all duration-300 ease-out transform",
                "hover:scale-110 active:scale-95 hover:shadow-xl",
              ].join(" ")}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 text-white flex items-center justify-center">
                {it.icon}
              </div>
              {/* Tooltip (เดสก์ท็อปเท่านั้น) */}
              <span
                className={[
                  "hidden lg:block absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10",
                  "px-2 py-1 rounded-md text-xs font-medium shadow-lg",
                  "bg-gray-800 text-white border border-gray-600",
                  "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
                  "transition-all duration-200 pointer-events-none",
                  // Arrow pointing down to button
                  "after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2",
                  "after:w-0 after:h-0 after:border-3 after:border-transparent after:border-t-gray-800"
                ].join(" ")}
              >
                {it.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
