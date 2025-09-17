"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const translatePercentage = -((currentSlide - 1) * 20);

  return (
    <section id="hero" className="relative min-h-[100dvh] sm:min-h-[100dvh] mt-[-4rem] sm:mt-[-5rem] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="carousel-container relative w-full h-full">
          <input type="radio" name="carousel" id="carousel1" className="hidden" checked={currentSlide === 1} onChange={() => setCurrentSlide(1)} />
          <input type="radio" name="carousel" id="carousel2" className="hidden" checked={currentSlide === 2} onChange={() => setCurrentSlide(2)} />
          <input type="radio" name="carousel" id="carousel3" className="hidden" checked={currentSlide === 3} onChange={() => setCurrentSlide(3)} />
          <input type="radio" name="carousel" id="carousel4" className="hidden" checked={currentSlide === 4} onChange={() => setCurrentSlide(4)} />
          <input type="radio" name="carousel" id="carousel5" className="hidden" checked={currentSlide === 5} onChange={() => setCurrentSlide(5)} />

          <div
            className="carousel-slides flex w-[500%] h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translatePercentage}%)` }}
          >
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/01.jpg"
                alt="SP Kansard กันสาดโรงจอดรถ"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/02.jpg"
                alt="SP Kansard กันสาดบ้าน"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/03.jpg"
                alt="SP Kansard โรงจอดรถสำเร็จรูป"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/04.jpg"
                alt="SP Kansard กันสาดอลูมิเนียม"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/05.jpg"
                alt="SP Kansard งานติดตั้งกันสาด"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* removed injected script; carousel is controlled via React state */}
      </div>

      {/* Centered side arrows for navigation */}
      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20">
        <button
          aria-label="Previous slide"
          onClick={() => setCurrentSlide((s) => (s <= 1 ? totalSlides : s - 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20">
        <button
          aria-label="Next slide"
          onClick={() => setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
