

export default function WebsiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SP Kansard - เอสพี กันสาด",
    "alternateName": "เอสพี กันสาด",
    "url": "https://spkansard.com",
    "description": "ผู้นำด้านกันสาดและโรงจอดรถอันดับ 1 ในกรุงเทพฯและปริมณฑล มากกว่า 38 ปี",
    "publisher": {
      "@type": "Organization",
      "name": "SP Kansard Co., Ltd.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://spkansard.com/images/logo.png"
      }
    }
  };

  return (
    <script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}
