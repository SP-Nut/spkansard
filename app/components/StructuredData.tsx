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
          "@type": "LocalBusiness",
          "name": "เอสพี กันสาด",
          "image": "https://www.spkansard.co/images/logo.png",
          "telephone": "+66-2-936-8841",
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
          "url": "https://www.spkansard.co",
          "openingHours": [
            "Mo-Fr 08:00-17:00",
            "Sa 08:00-16:00"
          ],
          "priceRange": "฿฿฿",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
          },
          "servedCuisine": [],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "บริการกันสาดและโรงจอดรถ",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "กันสาดบ้าน"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "โรงจอดรถ"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "งานระแนง"
                }
              }
            ]
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data?.name || "บริการกันสาดและโรงจอดรถ",
          "description": data?.description || "บริการออกแบบ ผลิต และติดตั้งกันสาด โรงจอดรถ งานระแนง คุณภาพสูง",
          "provider": {
            "@type": "Organization",
            "name": "เอสพี กันสาด"
          },
          "areaServed": {
            "@type": "Place",
            "name": "ประเทศไทย"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "บริการทั้งหมด",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "กันสาดหน้าบ้าน",
                  "description": "ออกแบบและติดตั้งกันสาดหน้าบ้านทุกประเภท"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "โรงจอดรถสำเร็จรูป",
                  "description": "โรงจอดรถคุณภาพสูง ทนทาน สวยงาม"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "งานระแนงและฝ้า",
                  "description": "งานระแนงและฝ้าเพดานสำหรับอาคารและบ้าน"
                }
              }
            ]
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqs || [
            {
              "@type": "Question",
              "name": "กันสาดมีกี่ประเภท?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "เรามีกันสาดหลายประเภท ได้แก่ กันสาดผ้าใบ กันสาดโพลีคาร์บอเนต กันสาดเหล็ก และกันสาดอลูมิเนียม แต่ละประเภทมีข้อดีและการใช้งานที่แตกต่างกัน"
              }
            },
            {
              "@type": "Question", 
              "name": "มีการรับประกันงานไหม?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "มีครับ เรารับประกันคุณภาพงานติดตั้ง 1 ปี และวัสดุตามเงื่อนไขของผู้ผลิต พร้อมบริการหลังการขายและซ่อมบำรุง"
              }
            },
            {
              "@type": "Question",
              "name": "มีบริการสำรวจหน้างานฟรีไหม?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "ใช่ครับ เรามีบริการสำรวจหน้างานและประเมินราคาฟรี โดยทีมช่างผู้เชี่ยวชาญจะไปตรวจสอบพื้นที่และให้คำแนะนำ"
              }
            }
          ]
        };

      default:
        return {};
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}