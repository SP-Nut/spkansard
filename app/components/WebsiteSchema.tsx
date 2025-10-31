'use client';

import Script from 'next/script';

export default function WebsiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SP Kansard - เอสพี กันสาด",
    "alternateName": "เอสพี กันสาด",
    "url": "https://www.spkansard.co",
    "description": "ผู้นำด้านกันสาดและโรงจอดรถอันดับ 1 ในกรุงเทพฯและปริมณฑล มากกว่า 35 ปี",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.spkansard.co/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SP Kansard Co., Ltd.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.spkansard.co/images/logo.png"
      }
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}
