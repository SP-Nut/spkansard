'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useMemo, useEffect } from 'react';
import { FaSearch, FaEye, FaShoppingCart, FaPhone, FaHome, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface Material {
  id: string;
  name: string;
  description: string;
  image_url: string;
  features: string[];
  price_range?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export default function MaterialsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const materialsRef = useRef<HTMLElement | null>(null);

  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<string[]>(['ทั้งหมด']);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('name')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        
        const categoryNames = data?.map((cat) => cat.name) || [];
        setCategories(['ทั้งหมด', ...categoryNames]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch materials from Supabase
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data, error } = await supabase
          .from('materials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMaterials(data || []);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const filteredMaterials = useMemo<Material[]>(() => {
    return materials.filter((material: Material) => {
      const categoryMatch = selectedCategory === 'ทั้งหมด' || material.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const searchMatch =
        material.name.toLowerCase().includes(term) ||
        material.description.toLowerCase().includes(term) ||
        material.features.some((feature: string) => feature.toLowerCase().includes(term));
      return categoryMatch && searchMatch;
    });
  }, [materials, selectedCategory, searchTerm]);

  const openMaterialDetail = (material: Material) => {
    setSelectedMaterial(material);
    setShowDetail(true);
  };

  const calculatePrice = () => {
    window.open('https://cal-customer.vercel.app/', '_blank');
  };

  return (
    <div className="min-h-screen font-prompt bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Breadcrumb (match product) */}
      <section ref={heroRef} className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-8 sm:py-12 lg:py-16">
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
              ดู<Link href="/gallery" className="underline hover:text-white transition-colors mx-1">ภาพการใช้งานจริง</Link>และ<Link href="/contact" className="underline hover:text-white transition-colors mx-1">ปรึกษาฟรี</Link>
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
          {/* Category Tabs */}
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
              {/* Grid Layout - Card Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material: Material) => (
                  <div key={material.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    {/* Large Image */}
                    <div className="relative aspect-[4/3] bg-gray-100">
                      {material.image_url ? (
                        <Image
                          src={material.image_url}
                          alt={material.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400 text-sm">ไม่มีรูปภาพ</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      {/* Category Badge */}
                      <div className="text-xs text-[#314874] font-medium bg-[#eaf4ff] px-2 py-1 rounded-md w-fit">
                        {material.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                        {material.name}
                      </h3>

                      {/* Price */}
                      <div className="text-xl font-bold text-[#314874]">
                        {material.price_range || 'สอบถามราคา'}
                      </div>

                      {/* Actions */}
                      <div className="pt-2">
                        <button
                          onClick={() => openMaterialDetail(material)}
                          className="w-full bg-[#314874] hover:bg-[#1E2E4F] text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <FaEye className="h-4 w-4" />
                          ดูรายละเอียด
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
                onClick={() => { setShowDetail(false); setSelectedMaterial(null); }}
                className="flex items-center text-[#314874] hover:text-[#1E2E4F] mb-6 font-medium"
              >
                <FaChevronRight className="w-4 h-4 mr-2 rotate-180" />
                กลับไปยังรายการวัสดุ
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Images */}
                <div className="space-y-4">
                  {selectedMaterial?.image_url ? (
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                      <Image
                        src={selectedMaterial.image_url}
                        alt={selectedMaterial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400">ไม่มีรูปภาพ</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-6">
                  {selectedMaterial && (
                    <>
                      <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{color:'var(--brand-900)'}}>
                          {selectedMaterial.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">{selectedMaterial.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{color:'var(--brand-900)'}}>
                          ราคา
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-[#314874]">
                            {selectedMaterial.price_range || 'สอบถามราคา'}
                          </div>
                          <div className="text-sm text-gray-500 mt-2">
                            *ราคาอาจแตกต่างตามโครงสร้าง<br />
                            ***ราคาเฉพาะ กรุงเทพและปริมณฑล
                          </div>
                        </div>
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

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={calculatePrice}
                          className="bg-[#314874] hover:bg-[#1E2E4F] text-white px-6 py-3 rounded-lg font-semibold"
                        >
                          สอบถามราคาและรายละเอียด
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

    </div>
  );
}
