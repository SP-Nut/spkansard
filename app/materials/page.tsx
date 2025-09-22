'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useMemo } from 'react';
import { FaSearch, FaEye, FaShoppingCart, FaPhone, FaCompressArrowsAlt, FaHome, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { materialsData, Material } from './data';

export default function MaterialsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const materialsRef = useRef<HTMLElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const categories = ['ทั้งหมด', 'โปร่งแสง', 'ทึบแสง', 'ระแนง', 'ฝ้า', 'รางน้ำ'];

  const filteredMaterials = useMemo<Material[]>(() => {
    return materialsData.filter((material: Material) => {
      const categoryMatch = selectedCategory === 'ทั้งหมด' || material.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const searchMatch =
        material.name.toLowerCase().includes(term) ||
        material.description.toLowerCase().includes(term) ||
        material.features.some((feature: string) => feature.toLowerCase().includes(term));
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  const toggleMaterialSelection = (materialId: string) => {
    setSelectedMaterials((prev: string[]) => {
      if (prev.includes(materialId)) {
        return prev.filter((id: string) => id !== materialId);
      } else if (prev.length < 3) {
        return [...prev, materialId];
      } else {
        return prev;
      }
    });
  };

  const openMaterialDetail = (material: Material) => {
    setSelectedMaterial(material);
    setShowDetail(true);
    setCurrentImageIndex(0);
  };

  const calculatePrice = () => {
    window.open('https://cal-customer.vercel.app/', '_blank');
  };

  return (
    <div className="min-h-screen font-prompt bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Breadcrumb (match product) */}
  <section ref={heroRef} className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              <FaHome className="w-4 h-4" />
            </Link>
            <FaChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-white/80">วัสดุหลังคา</span>
          </nav>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">วัสดุหลังคาคุณภาพ</h1>
            <p className="text-lg sm:text-xl text-[#eaf4ff] max-w-3xl mx-auto">
              เลือกวัสดุหลังคาที่เหมาะกับงานของคุณ ทั้งโปร่งแสงและทึบแสง พร้อมราคายุติธรรม 
              <br className="hidden sm:block" />
              ดู<Link href="/portfolio" className="underline hover:text-white transition-colors mx-1">ผลงานการใช้งาน</Link>และ<Link href="/gallery" className="underline hover:text-white transition-colors mx-1">ภาพจริง</Link>
            </p>

            {/* Optional CTAs (keep functions) */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={calculatePrice}
                className="bg-white text-[#1E2E4F] hover:bg-gray-100 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FaShoppingCart className="h-4 w-4" />
                คำนวณราคาวัสดุ
              </button>
              <button
                onClick={() => materialsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white text-white hover:bg-white hover:text-[#1E2E4F] px-6 py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors"
              >
                ดูรายการวัสดุ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs (match product style) */}
          <div className="flex items-center justify-between py-2 gap-4">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-1 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? 'border-[#314874] text-[#314874] bg-[#eaf4ff]'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {/* Compare Button (if any) */}
            {selectedMaterials.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="shrink-0 bg-[#314874] hover:bg-[#1E2E4F] text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaCompressArrowsAlt className="h-4 w-4" />
                เปรียบเทียบ ({selectedMaterials.length})
              </button>
            )}
          </div>

          {/* Search Row */}
          <div className="pb-3">
            <div className="relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="ค้นหาวัสดุ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-transparent"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">พบวัสดุ {filteredMaterials.length} รายการ</div>
          </div>
        </div>
      </section>

      {/* Materials List (Compact) */}
      <section ref={materialsRef} className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title like product */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{color:'var(--brand-900)'}}>
              {selectedCategory === 'ทั้งหมด' ? 'วัสดุทั้งหมด' : selectedCategory}
            </h2>
          </div>
          {!(showDetail && selectedMaterial) ? (
            <>
              {/* Table Header (md+) */}
              <div className="hidden md:grid grid-cols-12 gap-3 text-xs uppercase text-gray-500 px-2">
                <div className="col-span-1">เลือก</div>
                <div className="col-span-1">รูป</div>
                <div className="col-span-5">วัสดุ</div>
                <div className="col-span-2">ราคาเริ่มต้น (S)</div>
                <div className="col-span-1">ราคา M+</div>
                <div className="col-span-2 text-right">การทำงาน</div>
              </div>
              <div className="hidden md:block h-px bg-gray-200 my-2" />

              {/* Rows */}
              <div className="divide-y divide-gray-200">
                {filteredMaterials.map((material: Material) => (
                  <div key={material.id} className="py-3">
                    <div className="grid grid-cols-12 items-start gap-3 gap-y-2">
                      {/* Checkbox */}
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material.id)}
                          onChange={() => toggleMaterialSelection(material.id)}
                          className="h-5 w-5 text-[#314874] focus:ring-[#314874] border-gray-300 rounded"
                          disabled={!selectedMaterials.includes(material.id) && selectedMaterials.length >= 3}
                        />
                      </div>

                      {/* Thumbnail */}
                      <div className="col-span-3 sm:col-span-2 md:col-span-1">
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={material.images[0]}
                            alt={material.name}
                            width={80}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="col-span-8 sm:col-span-9 md:col-span-5 min-w-0">
                        <div className="flex items-start flex-wrap gap-2 min-w-0">
                          <h3 className="text-base md:text-sm font-semibold text-gray-900 break-words truncate sm:whitespace-normal sm:truncate-none">
                            {material.name}
                          </h3>
                          {material.isPopular && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#eaf4ff] text-[#1E2E4F]">ยอดนิยม</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 break-words">
                          หมวดหมู่: {material.category}
                          {material.thickness || material.specifications['หนา'] ? (
                            <>
                              {' '}• หนา: {material.thickness || material.specifications['หนา']}
                            </>
                          ) : null}
                        </div>
                        <div className="hidden md:flex flex-wrap gap-1 mt-2">
                          {material.features.slice(0, 2).map((feature: string, idx: number) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{feature}</span>
                          ))}
                        </div>
                      </div>

                      {/* Price S + Mobile actions in one column */}
                      <div className="col-span-12 md:col-span-2 min-w-0">
                        <div className="text-sm text-gray-500 md:hidden">เริ่มต้น (S)</div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg md:text-base font-semibold text-[#314874] flex-shrink-0">฿{material.pricePerSqm.S.toLocaleString()}</div>
                          <div className="ml-auto md:hidden flex items-center gap-2">
                            <button
                              onClick={() => openMaterialDetail(material)}
                              className="inline-flex items-center gap-1 bg-[#314874] hover:bg-[#1E2E4F] text-white py-2 px-4 rounded-md text-sm font-semibold min-w-[90px]"
                            >
                              <FaEye className="h-4 w-4" />
                              ดูเพิ่มเติม
                            </button>
                            <button
                              onClick={calculatePrice}
                              className="inline-flex items-center justify-center border border-[#314874] text-[#314874] hover:bg-[#314874] hover:text-white py-2 px-4 rounded-md text-sm font-semibold min-w-[90px]"
                              aria-label="ติดต่อทีมงาน"
                            >
                          
                               โทร
                            </button>
                          </div>
                        </div>
                        <div className="hidden md:block text-xs text-gray-500">ต่อตารางเมตร</div>
                      </div>

                      {/* Price M+ */}
                      <div className="hidden md:block col-span-1 text-gray-900 font-medium">
                        {material.pricePerSqm.M_Plus ? `฿${material.pricePerSqm.M_Plus.toLocaleString()}` : '-'}
                      </div>

                      {/* Actions (desktop only) */}
                      <div className="hidden md:flex md:col-span-2 flex-row flex-wrap justify-end gap-2 mt-2 md:mt-0">
                        <button
                          onClick={() => openMaterialDetail(material)}
                          className="inline-flex items-center gap-1 bg-[#314874] hover:bg-[#1E2E4F] text-white py-2 px-4 md:py-1.5 md:px-2.5 rounded-md text-sm md:text-xs font-semibold md:font-medium min-w-[90px] md:min-w-0"
                        >
                          <FaEye className="h-4 w-4 md:h-3 md:w-3" />
                          <span className="">ดูเพิ่มเติม</span>
                        </button>
                        <button
                          onClick={calculatePrice}
                          className="inline-flex items-center justify-center border border-[#314874] text-[#314874] hover:bg-[#314874] hover:text-white py-2 px-4 md:py-1.5 md:px-2.5 rounded-md text-sm md:text-xs font-semibold md:font-medium min-w-[90px] md:min-w-0"
                          aria-label="ติดต่อทีมงาน"
                        >
                     
                           โทร
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMaterials.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">ไม่พบวัสดุที่ตรงกับการค้นหา</div>
                  <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</p>
                </div>
              )}
            </>
          ) : (
            /* Detail View like product */
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => { setShowDetail(false); setSelectedMaterial(null); setCurrentImageIndex(0); }}
                className="flex items-center text-[#314874] hover:text-[#1E2E4F] mb-6 font-medium"
              >
                <FaChevronRight className="w-4 h-4 mr-2 rotate-180" />
                กลับไปยังรายการวัสดุ
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Images */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                    {selectedMaterial && (
                      <Image
                        src={selectedMaterial.images[currentImageIndex]}
                        alt={selectedMaterial.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  {selectedMaterial && (
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                      {selectedMaterial.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            currentImageIndex === index ? 'border-[#314874]' : 'border-gray-200'
                          }`}
                        >
                          <Image src={image} alt={`${selectedMaterial.name} ${index + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-6">
                  {selectedMaterial && (
                    <>
                      <div>
                        {selectedMaterial.isPopular && (
                          <span className="bg-[#eaf4ff] text-[#1E2E4F] px-2 py-1 text-xs font-medium rounded mr-2">ยอดนิยม</span>
                        )}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{color:'var(--brand-900)'}}>
                          {selectedMaterial.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">{selectedMaterial.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{color:'var(--brand-900)'}}>
                          ราคาต่อตารางเมตร
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-600">ขนาด S:</div>
                          <div className="text-[#314874] font-semibold">฿{selectedMaterial.pricePerSqm.S.toLocaleString()}</div>
                          <div className="text-gray-600">ขนาด M:</div>
                          <div className="text-[#314874] font-semibold">฿{selectedMaterial.pricePerSqm.M.toLocaleString()}</div>
                          <div className="text-gray-600">ขนาด L:</div>
                          <div className="text-[#314874] font-semibold">฿{selectedMaterial.pricePerSqm.L.toLocaleString()}</div>
                          <div className="text-gray-600">ขนาด XL:</div>
                          <div className="text-[#314874] font-semibold">฿{selectedMaterial.pricePerSqm.XL.toLocaleString()}</div>
                          {selectedMaterial.pricePerSqm.XXL && (
                            <>
                              <div className="text-gray-600">ขนาด XXL:</div>
                              <div className="text-[#314874] font-semibold">฿{selectedMaterial.pricePerSqm.XXL.toLocaleString()}</div>
                            </>
                          )}
                          {selectedMaterial.pricePerSqm.M_Plus && (
                            <>
                              <div className="text-gray-600">ขนาด M+:</div>
                              <div className="text-[#314874] font-semibold">฿{selectedMaterial.pricePerSqm.M_Plus.toLocaleString()}</div>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">*ราคาไม่รวมภาษีมูลค่าเพิ่ม</div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{color:'var(--brand-900)'}}>
                          คุณสมบัติเด่น
                        </h3>
                        <div className="space-y-2">
                          {selectedMaterial.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <FaCheckCircle className="w-5 h-5 text-[#314874] mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{color:'var(--brand-900)'}}>
                          ข้อมูลเชิงเทคนิค
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          {Object.entries(selectedMaterial.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600">{key}:</span>
                              <span className="font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{color:'var(--brand-900)'}}>
                          สีที่มีจำหน่าย
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMaterial.colors.map((color, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={calculatePrice}
                          className="bg-[#314874] hover:bg-[#1E2E4F] text-white px-6 py-3 rounded-lg font-semibold"
                        >
                          คำนวณราคาสำหรับวัสดุนี้
                        </button>
                        <button
                          onClick={() => {
                            if (selectedMaterial) {
                              toggleMaterialSelection(selectedMaterial.id);
                            }
                          }}
                          className="border-2 border-[#314874] text-[#314874] hover:bg-[#314874] hover:text-white px-6 py-3 rounded-lg font-semibold"
                        >
                          เพิ่มในตารางเปรียบเทียบ
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reviews removed per request */}

      {/* Call-to-Action Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#314874] to-[#1E2E4F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            พร้อมเริ่มโครงการหลังคาของคุณแล้วหรือยัง?
          </h2>
          <p className="text-xl text-[#eaf4ff] mb-8 max-w-2xl mx-auto">
            ติดต่อทีมงานผู้เชี่ยวชาญของเราเพื่อคำปรึกษาฟรี และรับใบเสนอราคาที่เหมาะสมกับงบประมาณของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={calculatePrice}
              className="bg-white text-[#1E2E4F] hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold 
                       transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                       flex items-center justify-center gap-2"
            >
              <FaShoppingCart className="h-5 w-5" />
              คำนวณราคาทันที
            </button>
            <button 
              onClick={() => window.open('/contact', '_blank')}
              className="border-2 border-white text-white hover:bg-white hover:text-[#1E2E4F] 
                       px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 
                       transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaPhone className="h-5 w-5" />
              ติดต่อทีมงาน
            </button>
          </div>
        </div>
      </section>

      {/* Material Detail Modal removed in favor of inline details */}

      {/* Comparison Modal */}
      {showComparison && selectedMaterials.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">เปรียบเทียบวัสดุ</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-semibold">รายการ</th>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <th key={materialId} className="text-center py-4 px-2 font-semibold min-w-[180px]">
                          <div className="space-y-2">
                            <div className="relative h-24 rounded-lg overflow-hidden">
                              <Image
                                src={material?.images[0] || '/herosection/01.jpg'}
                                alt={material?.name || ''}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-sm break-words">{material?.name}</div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">หมวดหมู่</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 text-center break-words">
                          {material?.category}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">ราคาเริ่มต้น (S)</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 text-center text-[#314874] font-semibold break-words">
                          ฿{material?.pricePerSqm.S.toLocaleString()}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">ราคา M+</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 text-center text-[#314874] font-semibold break-words">
                          {material?.pricePerSqm.M_Plus ? `฿${material.pricePerSqm.M_Plus.toLocaleString()}` : '-'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">หนา</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 text-center break-words">
                          {material?.thickness || material?.specifications['หนา'] || '-'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">น้ำหนัก</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 text-center break-words">
                          {material?.specifications['น้ำหนัก'] || '-'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">คุณสมบัติหลัก</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 break-words">
                          <ul className="text-sm space-y-1">
                            {material?.features.slice(0, 3).map((feature: string, index: number) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">สี</td>
                    {selectedMaterials.map((materialId: string) => {
                      const material = materialsData.find((m: Material) => m.id === materialId);
                      return (
                        <td key={materialId} className="py-3 px-2 text-center break-words">
                          <div className="text-sm break-words">
                            {material?.colors.slice(0, 3).join(', ')}
                            {material && material.colors.length > 3 && '...'}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={calculatePrice}
                  className="bg-[#314874] hover:bg-[#1E2E4F] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  คำนวณราคาสำหรับวัสดุที่เลือก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
