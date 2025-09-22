'use client';

import Script from 'next/script';

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'service' | 'faq';
  data?: {
    name?: string;
    description?: string;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "เอสพี กันสาด (SP Kansard)",
          "alternateName": "SP Kansard",
          "url": "https://www.spkansard.co",
          "logo": "https://www.spkansard.co/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+66-2-936-8841",
            "contactType": "customer service",
            "areaServed": "TH",
            "availableLanguage": ["Thai"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "28/101 ถ.รัชดา-รามอินทรา",
            "addressLocality": "บึงกุ่ม",
            "addressRegion": "กรุงเทพมหานคร",
            "postalCode": "10230",
            "addressCountry": "TH"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "13.7563",
            "longitude": "100.5018"
          },
          "sameAs": [
            "https://www.facebook.com/spkansard/",
            "https://line.me/R/ti/p/@spkansard",
            "https://www.youtube.com/@spkansard"
          ],
          "foundingDate": "1988",
          "numberOfEmployees": "50-100",
          "description": "ผู้นำด้านกันสาดและโรงจอดรถมากกว่า 35 ปี ให้บริการครบวงจร ออกแบบติดตั้งกันสาดคุณภาพ"
        };

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Contractor"],
          "name": "เอสพี กันสาด (SP Kansard)",
          "alternateName": ["SP Kansard", "บริษัท เอสพี กันสาด จำกัด"],
          "description": "ผู้เชี่ยวชาญด้านกันสาด โรงจอดรถ งานเหล็ก มากกว่า 35 ปี ให้บริการครบวงจร ติดตั้งกันสาดเมทัลชีท ไวนิล อลูมิเนียม โพลีคาร์บอเนต รับประกัน 5 ปี",
          "image": [
            "https://www.spkansard.co/images/logo.png",
            "https://www.spkansard.co/herosection/01.jpg",
            "https://www.spkansard.co/herosection/02.jpg"
          ],
          "logo": "https://www.spkansard.co/images/logo.png",
          "url": "https://www.spkansard.co",
          "telephone": "+66-2-936-8841",
          "email": "info@spkansard.co",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม",
            "addressLocality": "บึงกุ่ม",
            "addressRegion": "กรุงเทพมหานคร",
            "postalCode": "10230",
            "addressCountry": "TH"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.7563,
            "longitude": 100.5018
          },
          "openingHours": [
            "Mo-Fr 08:00-17:00",
            "Sa 08:00-16:00"
          ],
          "priceRange": "฿฿-฿฿฿",
          "currenciesAccepted": "THB",
          "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
          "foundingDate": "1988",
          "yearsInOperation": "35+",
          "numberOfEmployees": "50-100",
          "slogan": "สร้างได้ไว สร้างได้จริง มั่นใจไปกับครอบครัว SP",
          "knowsAbout": [
            "กันสาด", "โรงจอดรถ", "งานเหล็ก", "งานฝ้า", "งานระแนง",
            "เมทัลชีท", "ไวนิล", "อลูมิเนียม", "โพลีคาร์บอเนต", "ชินโคไลท์"
          ],
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 13.7563,
              "longitude": 100.5018
            },
            "geoRadius": "100000"
          },
          "areaServed": [
            "กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", 
            "สมุทรสาคร", "นครปธม", "ภูเก็ต"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2847",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "คุณกิตติศักดิ์"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "reviewBody": "คุณภาพเยี่ยม ทีมงานมืออาชีพ ราคาเป็นธรรม แนะนำเลย"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "บริการกันสาดและโรงจอดรถครบวงจร",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "กันสาดบ้าน",
                  "description": "ติดตั้งกันสาดหน้าบ้าน ข้างบ้าน หลังบ้าน ทุกประเภท"
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "priceCurrency": "THB",
                  "valueAddedTaxIncluded": true
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "โรงจอดรถ",
                  "description": "โรงจอดรถสำเร็จรูป 1-4 คัน ทุกขนาด"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "งานเหล็ก",
                  "description": "งานเหล็กทุกประเภท ประตูรั้ว บันไดเหล็ก"
                }
              }
            ]
          },
          "makesOffer": [
            {
              "@type": "Offer",
              "name": "รับประกันงาน 5 ปี",
              "description": "รับประกันคุณภาพงานติดตั้ง วัสดุ และบริการหลังการขาย",
              "validFor": "P5Y"
            },
            {
              "@type": "Offer", 
              "name": "ประเมินราคาฟรี",
              "description": "บริการประเมินราคาและสำรวจหน้างานฟรี",
              "price": "0",
              "priceCurrency": "THB"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/spkansard/",
            "https://line.me/R/ti/p/@spkansard",
            "https://www.youtube.com/@spkansard"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+66-2-936-8841",
              "contactType": "customer service",
              "areaServed": "TH",
              "availableLanguage": ["Thai"],
              "servicePhone": "+66-2-936-8841"
            }
          ]
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data?.name || "บริการกันสาดและโรงจอดรถ",
          "description": data?.description || "บริการติดตั้งกันสาดและโรงจอดรถครบวงจร",
          "provider": {
            "@type": "LocalBusiness",
            "name": "เอสพี กันสาด",
            "telephone": "+66-2-936-8841",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "บึงกุ่ม",
              "addressRegion": "กรุงเทพมหานคร",
              "addressCountry": "TH"
            }
          },
          "areaServed": {
            "@type": "State",
            "name": "กรุงเทพมหานคร"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "บริการกันสาด",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "กันสาดเมทัลชีท"
                }
              }
            ]
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqs?.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || []
        };

      default:
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "เอสพี กันสาด"
        };
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}