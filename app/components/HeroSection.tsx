"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // ข้อความสำหรับแต่ละสไลด์
  const slideContent = [
    {
      title: "เอสพี กันสาด",
      subtitle: "ผู้เชี่ยวชาญกันสาดและโรงจอดรถ\nคุณภาพระดับพรีเมียม มาตรฐานสากล",
      buttons: [
        { text: "ดูแกลเลอรี่", href: "/gallery", primary: true, external: false }
      ]
    },
    {
      title: "กันสาดบ้านหรูหรา",
      subtitle: "ออกแบบเฉพาะ สวยงาม ทนทาน\nเพิ่มมูลค่าให้บ้านคุณ",
      buttons: [
        { text: "ดูผลงาน", href: "/portfolio", primary: true, external: false }
      ]
    },
    {
      title: "โรงจอดรถสำเร็จรูป",
      subtitle: "โครงสร้างเหล็กแข็งแรง\nติดตั้งเร็ว ราคาประหยัด",
      buttons: [
        { text: "ประเมินราคา", href: "https://cal-customer.vercel.app/", primary: true, external: true }
      ]
    },
    {
      title: "วัสดุอลูมิเนียมคุณภาพ",
      subtitle: "นำเข้าจากต่างประเทศ\nไม่เป็นสนิม ใช้ได้นาน 20+ ปี",
      buttons: [
        { text: "ดูวัสดุ", href: "/materials", primary: true, external: false }
      ]
    },
    {
      title: "บริการติดตั้งมืออาชีพ",
      subtitle: "ทีมช่างผู้เชี่ยวชาญ 15+ ปี\nรับประกันผลงาน 5 ปี",
      buttons: [
        { text: "นัดหมาย", href: "https://cal-customer.vercel.app/", primary: true, external: true }
      ]
    }
  ];

  // Removed auto-slide for better user control

  // Handle touch/mouse drag events
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaX = currentX - startX;
    const threshold = 50; // minimum distance to trigger slide change
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Dragged right - go to previous slide
        setCurrentSlide((s) => (s <= 1 ? totalSlides : s - 1));
      } else {
        // Dragged left - go to next slide
        setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1));
      }
    }
  };

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
            className="carousel-slides flex w-[500%] h-full transition-transform duration-500 ease-in-out select-none"
            style={{ transform: `translateX(${translatePercentage}%)` }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/กันสาดหรู โมเดิร์น.webp"
                alt="SP Kansard กันสาดโรงจอดรถหรู"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-center"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR"
              />
              {/* Content overlay for slide 1 */}
              <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto pb-12 sm:pb-16 lg:pb-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight" 
                      style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                    {slideContent[0]?.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto" 
                     style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                    {slideContent[0]?.subtitle?.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < slideContent[0]?.subtitle?.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={slideContent[0]?.buttons[0]?.href}
                      className="inline-flex items-center text-white font-medium py-3 px-6 rounded-md transition-all duration-300 text-base transform hover:scale-105 shadow-lg bg-brand hover:bg-brand-dark"
                    >
                      {slideContent[0]?.buttons[0]?.text}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/กันสาดเรียบๆ ทันสมัย.webp"
                alt="SP Kansard กันสาดบ้านสไตล์โมเดิร์น"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-center"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR"
              />
              {/* Content overlay for slide 2 */}
              <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto pb-12 sm:pb-16 lg:pb-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight" 
                      style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                    {slideContent[1]?.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto" 
                     style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                    {slideContent[1]?.subtitle?.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < slideContent[1]?.subtitle?.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={slideContent[1]?.buttons[0]?.href}
                      className="inline-flex items-center text-white font-medium py-3 px-6 rounded-md transition-all duration-300 text-base transform hover:scale-105 shadow-lg bg-brand hover:bg-brand-dark"
                    >
                      {slideContent[1]?.buttons[0]?.text}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/กันสาด บ้านสไตล์โมเดิร์น.webp"
                alt="SP Kansard กันสาดเรียบทันสมัย"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-center"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR"
                loading="lazy"
              />
              {/* Content overlay for slide 3 */}
              <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto pb-12 sm:pb-16 lg:pb-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight" 
                      style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                    {slideContent[2]?.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto" 
                     style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                    {slideContent[2]?.subtitle?.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < slideContent[2]?.subtitle?.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={slideContent[2]?.buttons[0]?.href}
                      target={slideContent[2]?.buttons[0]?.external ? "_blank" : undefined}
                      rel={slideContent[2]?.buttons[0]?.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center text-white font-medium py-3 px-6 rounded-md transition-all duration-300 text-base transform hover:scale-105 shadow-lg bg-brand hover:bg-brand-dark"
                    >
                      {slideContent[2]?.buttons[0]?.text}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/กันสาด มินิมอล.webp"
                alt="SP Kansard กันสาดมินิมอล"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-center"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR"
              />
              {/* Content overlay for slide 4 */}
              <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto pb-12 sm:pb-16 lg:pb-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight" 
                      style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                    {slideContent[3]?.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto" 
                     style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                    {slideContent[3]?.subtitle?.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < slideContent[3]?.subtitle?.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={slideContent[3]?.buttons[0]?.href}
                      className="inline-flex items-center text-white font-medium py-3 px-6 rounded-md transition-all duration-300 text-base transform hover:scale-105 shadow-lg bg-brand hover:bg-brand-dark"
                    >
                      {slideContent[3]?.buttons[0]?.text}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide w-1/5 h-full relative flex-shrink-0">
              <Image
                src="/herosection/กันสาด มูจิ.webp"
                alt="SP Kansard กันสาดสไตล์มูจิ"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-center"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR"
              />
              {/* Content overlay for slide 5 */}
              <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto pb-12 sm:pb-16 lg:pb-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight" 
                      style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                    {slideContent[4]?.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto" 
                     style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                    {slideContent[4]?.subtitle?.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < slideContent[4]?.subtitle?.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href={slideContent[4]?.buttons[0]?.href}
                      target={slideContent[4]?.buttons[0]?.external ? "_blank" : undefined}
                      rel={slideContent[4]?.buttons[0]?.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center text-white font-medium py-3 px-6 rounded-md transition-all duration-300 text-base transform hover:scale-105 shadow-lg bg-brand hover:bg-brand-dark"
                    >
                      {slideContent[4]?.buttons[0]?.text}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* removed injected script; carousel is controlled via React state */}
      </div>

      {/* Centered side arrows for navigation - Hidden on mobile */}
      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          aria-label="Previous slide"
          onClick={() => setCurrentSlide((s) => (s <= 1 ? totalSlides : s - 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/60"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          aria-label="Next slide"
          onClick={() => setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/60"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
