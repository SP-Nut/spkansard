"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaPhone, FaTimes, FaHeadset, FaCalculator } from "react-icons/fa";
import { SiLine } from "react-icons/si";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // หน้า Home โผล่เมื่อเลื่อนเกิน 80% ของ viewport
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const y = window.scrollY;
        const vh = window.innerHeight || 0;
        setIsVisible(y > vh * 0.8);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // ปิดเมนูเมื่อเปลี่ยนหน้า
  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ปิดเมนูเมื่อคลิกนอกพื้นที่
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(event.target as Node)) {
        const target = event.target as Element;
        if (!target.closest('[data-floating-menu]')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ปิดด้วย ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const toggleMenu = () => {
    // Haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    setIsOpen((v) => !v);
  };
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  if (!isVisible) return null;

  const items = [
    {
      key: "line",
      href: "https://line.me/R/ti/p/@spkansard",
      label: "LINE @spkansard",
      bg: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      icon: <SiLine className="w-5 h-5 text-white" />,
      rel: "noopener nofollow",
      target: "_blank",
      aria: "ติดต่อผ่าน LINE @spkansard (เปิดแท็บใหม่)",
    },
    {
      key: "phone",
      href: "tel:084-909-7777",
      label: "โทร 084-909-7777",
      bg: "bg-[var(--brand-600)]",
      hoverBg: "hover:bg-[var(--brand-700)]",
      icon: <FaPhone className="w-5 h-5 text-white" />,
      rel: undefined,
      target: undefined,
      aria: "โทร 084-909-7777",
    },
    {
      key: "calculator",
      href: "https://cal-customer.vercel.app/",
      label: "ประเมินราคา",
      bg: "bg-[var(--brand-500)]",
      hoverBg: "hover:bg-[var(--brand-600)]",
      icon: <FaCalculator className="w-5 h-5 text-white" />,
      rel: "noopener nofollow",
      target: "_blank",
      aria: "ประเมินราคากันสาด (เปิดแท็บใหม่)",
    },
  ];

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {isOpen ? "เมนูติดต่อเปิดแล้ว" : ""}
      </div>

      {/* Backdrop (มือถือ) */}
      {isOpen && (
        <button
          aria-label="ปิดเมนูติดต่อ"
          className="fixed inset-0 bg-black/20 z-[49] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* กล่องมุมขวาล่าง */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50">
        {/* Speed-Dial: ไอคอนสไลด์ขึ้นทีละปุ่ม */}
        <div className="absolute bottom-16 sm:bottom-18 right-0 flex flex-col items-end space-y-2 sm:space-y-3" data-floating-menu>
          {items.map((it, idx) => (
            <a
              key={it.key}
              href={it.href}
              rel={it.rel}
              target={it.target}
              onClick={handleLinkClick}
              aria-label={it.aria}
              className={[
                "group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg flex items-center justify-center",
                "ring-2 ring-white/20 hover:ring-white/40",
                it.bg,
                it.hoverBg,
                "transition-all duration-300 ease-out transform",
                // สถานะเปิด/ปิด + สไลด์ขึ้น + หน่วงเวลาแบบสเต็ป
                isOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
                  : "opacity-0 translate-y-4 pointer-events-none scale-90",
                // Responsive hover effects
                "hover:scale-110 active:scale-95 hover:shadow-xl",
              ].join(" ")}
              style={{ 
                transitionDelay: isOpen ? `${idx * 80}ms` : "0ms",
                minWidth: "3rem",
                minHeight: "3rem"
              }}
            >
              {it.icon}
              {/* Tooltip (เดสก์ท็อป) */}
              <span
                className={[
                  "hidden md:block absolute right-full mr-3 whitespace-nowrap z-10",
                  "px-3 py-2 rounded-lg text-sm font-medium shadow-lg",
                  "bg-gray-900 text-white border border-gray-700",
                  "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
                  "transition-all duration-200 pointer-events-none",
                  // Arrow pointing to button
                  "after:absolute after:left-full after:top-1/2 after:-translate-y-1/2",
                  "after:w-0 after:h-0 after:border-4 after:border-transparent after:border-l-gray-900"
                ].join(" ")}
              >
                {it.label}
              </span>
            </a>
          ))}
        </div>

        {/* ปุ่มหลัก (FAB) */}
        <button
          ref={btnRef}
          onClick={toggleMenu}
          className={[
            "relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full shadow-xl flex items-center justify-center",
            "bg-gradient-to-br from-[var(--brand-600)] via-[var(--brand-700)] to-[var(--brand-800)]",
            "ring-2 ring-white/30 hover:ring-white/50",
            "transition-all duration-300 ease-out transform",
            "focus:outline-none focus:ring-4 focus:ring-[var(--brand-300)]/50",
            'hover:scale-110 hover:shadow-2xl active:scale-95 hover:-translate-y-1'
          ].join(" ")}
          style={{
            minWidth: "3.5rem",
            minHeight: "3.5rem",
            boxShadow: "0 8px 32px rgba(0, 68, 124, 0.3)"
          }}
          aria-expanded={isOpen}
          aria-label={isOpen ? "ปิดเมนูติดต่อ" : "เปิดเมนูติดต่อ"}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6 text-white transition-transform duration-300 rotate-0 hover:rotate-90" />
          ) : (
            <FaHeadset className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
          )}
          
          {!isOpen && (
            <>
              <span 
                className="absolute inset-0 rounded-full bg-[var(--brand-400)] animate-ping opacity-40" 
                style={{ animationDuration: "2s" }}
              />
              <span 
                className="absolute inset-0 rounded-full bg-[var(--brand-300)] animate-pulse opacity-20" 
                style={{ 
                  animationDelay: '1s',
                  animationDuration: "3s"
                }}
              />
            </>
          )}
        </button>
      </div>
    </>
  );
}
