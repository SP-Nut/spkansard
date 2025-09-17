"use client";

import { useState } from "react";
import { FaPhone, FaTimes, FaHeadset } from "react-icons/fa";
import { SiLine } from "react-icons/si";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Contact Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Contact Options Menu */}
        <div
          className={`absolute bottom-14 right-0 sm:bottom-16 transition-all duration-300 ease-in-out transform ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 min-w-[200px] sm:min-w-[220px] border border-gray-100 backdrop-blur-sm"
               style={{
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)'
               }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-800 text-sm">ติดต่อเรา</h3>
              <p className="text-xs text-gray-500 mt-1">เลือกช่องทางที่สะดวก</p>
            </div>

            {/* Contact Options */}
            <div className="space-y-3">
              {/* LINE Option */}
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-xl hover:bg-green-50 active:bg-green-100 transition-all duration-200 group cursor-pointer select-none"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  // รอให้ animation เสร็จก่อนเปิด LINE
                  setTimeout(() => {
                    window.open("https://line.me/R/ti/p/@spkansard", "_blank");
                  }, 150);
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform duration-200 shadow-md">
                  <SiLine className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-semibold text-gray-800 text-sm">LINE</div>
                  <div className="text-xs text-gray-500">@spkansard</div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Phone Option */}
              <a
                href="tel:02-136-8899"
                className="flex items-center p-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group cursor-pointer select-none"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  // รอให้ animation เสร็จก่อนโทร
                  setTimeout(() => {
                    window.location.href = "tel:02-136-8899";
                  }, 150);
                }}
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform duration-200 shadow-md"
                  style={{backgroundColor: 'var(--brand-600)'}}
                >
                  <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-semibold text-gray-800 text-sm">โทรศัพท์</div>
                  <div className="text-xs text-gray-500">02-136-8899</div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Main Floating Button */}
        <button
          onClick={toggleMenu}
          className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300/50`}
          style={{
            background: isOpen 
              ? "linear-gradient(135deg, #ef4444, #dc2626)" 
              : "linear-gradient(135deg, var(--brand-600), var(--brand-700))",
          }}
          aria-label={isOpen ? "ปิดเมนูติดต่อ" : "เปิดเมนูติดต่อ"}
        >
          <div className="relative z-10">
            {isOpen ? (
              <FaTimes className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            ) : (
              <FaHeadset className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            )}
          </div>
        </button>

        {/* Pulsing Ring Animation */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-full ping-animation pointer-events-none"
            style={{
              background: "linear-gradient(135deg, var(--brand-600), var(--brand-700))",
              opacity: 0.4,
            }}
          />
        )}
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes pingAnimation {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          75% {
            transform: scale(1.3);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        
        .ping-animation {
          animation: pingAnimation 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}